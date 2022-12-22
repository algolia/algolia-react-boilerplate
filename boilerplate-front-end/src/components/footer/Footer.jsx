// This component renders a footer in Main.jsx, which can receive props if needed
// This footer is not designed to be interactive, but instead to perform better by not being an image

import {
  categoryPageFilterAttribute,
  linksHeader,
  navigationStateAtom,
} from '@/config/navigationConfig'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { useRecoilValue, useSetRecoilState } from 'recoil'

//Import scope SCSS
import './SCSS/footer.scss'

import { windowSize } from '@/hooks/useScreenSize'
import { AlgoliaLogo } from '@/assets/svg/SvgIndex'

const Footer = () => {
  const { isDesktop } = useRecoilValue(windowSize)

  // Import the navigation links, as defined in the config
  const links = useRecoilValue(linksHeader)

  let [searchParams, setSearchParams] = useSearchParams()

  const setNavigationState = useSetRecoilState(navigationStateAtom)

  const navigate = useNavigate()

  const handleLinkClick = (link) => {
    setNavigationState({
      type: link.type,
      name: link.name,
      value: link.value,
    })

    for (const key of searchParams.keys()) {
      searchParams.delete(key)
    }

    searchParams.set(link.type, link.value)

    setSearchParams(searchParams)

    const navigationParams = {
      pathname: '/search',
      search: `?${searchParams}`,
    }

    navigate(navigationParams)
  }

  return (
    <footer className={isDesktop ? 'footer' : 'footer footer-mobile'}>
      <div className="footer__container">
        <div className="footer__container-column col1">
          <div className="col1__infos">
            <div className="col1__imageWp">
              <AlgoliaLogo />
            </div>

            <ul>
              <li>
                <a href="#">+49 (899) 415-390-6031</a>
              </li>
              <li>
                <a href="#">support@algolia.com</a>
              </li>
              <li>14 New Street, London EC2M 4TR</li>
            </ul>
          </div>
          <a
            href="https://www.google.com/maps/place/Algolia/@51.5174005,-0.0801417,15z/data=!4m2!3m1!1s0x0:0x81e12e2683f53ffe?sa=X&ved=2ahUKEwilu9OHtcb6AhUDYcAKHaUnC0cQ_BJ6BAhUEAU"
            target="_blank"
          >
            Google maps
          </a>
        </div>
        <div className="footer__container-column">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>
        <div className="footer__container-column">
          <h3>Community</h3>
          <ul>
            <li>
              <a href="#">Facebook group</a>
            </li>
            <li>
              <a href="#">Forums</a>
            </li>
            <li>
              <a href="#">Meetups</a>
            </li>
          </ul>
        </div>
        <div className="footer__container-column">
          <h3>Categories</h3>
          <ul className="footer__column--nav-links">
            {links.map((link, i) => {
              return (
                <li
                  id={link.name}
                  tabIndex="0"
                  key={link.name}
                  onClick={() => {
                    handleLinkClick(link)
                  }}
                >
                  <p>{link.name}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="footer__container-column">
          <h3> Join our Newsletter</h3>
          <form className="" noValidate="">
            <div className="">
              <input
                className=""
                type="email"
                required=""
                placeholder="Enter your email address..."
                name="EMAIL"
              />
              <button
                type="submit"
                className="btn-submit"
                onClick={(e) => {
                  e.preventDefault()
                  alert(
                    '🎉 Thanks but we are not keeping your email address. This is just for demo purpose'
                  )
                }}
              >
                <p>Submit</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2022 ALGOLIA</p>
      </div>
    </footer>
  )
}

export default Footer
