import { openQR } from '@/config/qrCodeConfig'
import { useSetRecoilState } from 'recoil'
import { QrCodePicto } from '@/assets/svg/SvgIndex'
import './SCSS/qrcode.scss'
import { useState } from 'react'

const QRCodeOpener = () => {
  const setQROpen = useSetRecoilState(openQR)
  const [qrCodePictoClicked, setQrCodePictoClicked] = useState(false)
  return (
    <div
      className={`${
        qrCodePictoClicked ? 'qr-code-btn-active ' : ''
      }qr-code-btn`}
      onClick={(e) => {
        e.stopPropagation()
        setQrCodePictoClicked(true)
        setTimeout(() => setQrCodePictoClicked(false), 300)
        setQROpen(true)
      }}
    >
      <QrCodePicto />
    </div>
  )
}

export default QRCodeOpener
