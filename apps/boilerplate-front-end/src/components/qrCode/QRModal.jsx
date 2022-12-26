import React, { useState, useEffect } from 'react'
import CustomModal from '@/components/modals/CustomModal'
import { openQR } from '@/config/qrCodeConfig'
import { useRecoilState, useRecoilValue } from 'recoil'
import QRCode from 'qrcode'

import { navigationStateAtom } from '@/config/navigationConfig'
import { personaObjectSelectedAtom } from '@/config/personaConfig'
import { segmentObjectSelectedAtom } from '@/config/segmentConfig'

const QRModal = () => {
  const [modalActive, setModalActive] = useRecoilState(openQR)
  const [qrCode, setQRCode] = useState('')
  const navigationState = useRecoilValue(navigationStateAtom)
  const persona = useRecoilValue(personaObjectSelectedAtom)
  const segment = useRecoilValue(segmentObjectSelectedAtom)

  useEffect(() => {
    const queryString = window.location.search
    const searchParams = new URLSearchParams(queryString)

    // Handle persona filters
    if (persona.value !== 'anon') {
      searchParams.append('persona', persona.value)
    }

    // Handle segment filters
    if (segment.value !== '') {
      searchParams.append('segment', segment.label)
    }

    if (navigationState.type === 'context') {
      searchParams.delete('context')
      searchParams.append('context', navigationState.value)
    }

    window.history.replaceState({}, '', `${location.pathname}?${searchParams}`)
    generateQRCode(window.location.href)

    return () => {
      searchParams.delete('persona')
      searchParams.delete('segment')
      searchParams.delete('context')
      window.history.replaceState(
        {},
        '',
        `${location.pathname}?${searchParams}`
      )
    }
  }, [])

  const generateQRCode = async (url) => {
    try {
      let dataUrl = await QRCode.toDataURL(url)
      setQRCode(dataUrl)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CustomModal isActive={modalActive} setActive={setModalActive}>
      <div className="qr-modal">
        <img src={qrCode} />
        <p>
          <span>Flash the code</span> to be redirected to your results
        </p>
      </div>
    </CustomModal>
  )
}

export default QRModal
