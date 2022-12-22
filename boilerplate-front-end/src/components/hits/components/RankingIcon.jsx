import { personaObjectSelectedAtom } from '@/config/personaConfig'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import '../SCSS/ranking.scss'

const RankingIcon = (props) => {
  const { hit } = props
  const persona = useRecoilValue(personaObjectSelectedAtom)

  const [icon, setIcon] = useState(null)

  useEffect(() => {
    const start = hit?._rankingInfo?.personalization?.initialPosition + 1
    const end = hit?.__position

    const diff = start - end

    if (diff > 0) {
      setIcon({
        url: '/static/images/arrowUp.svg',
        color: 'green',
        val: diff,
      })
    } else if (diff === 0) {
      setIcon({
        url: null,
        color: 'gray',
        val: null,
      })
    } else if (diff < 0) {
      setIcon({
        url: '/static/images/arrowDown.svg',
        color: 'red',
        val: diff * -1,
      })
    }
  }, [hit])

  if (!icon || persona.personalizationFilters.length < 1) return null

  return (
    <div className={`ranking-bg ${icon.color}`}>
      {icon?.url && <img src={icon.url} alt="" />}
      <p>{icon?.val ? icon?.val : '-'}</p>
    </div>
  )
}

export default RankingIcon
