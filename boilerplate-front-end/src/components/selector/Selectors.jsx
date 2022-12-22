// external libs
import { useRecoilValue } from 'recoil'
import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

// local hooks
import { windowSize } from '@/hooks/useScreenSize'
import useOutsideClick from '@/hooks/useOutsideClick'

// SVGs
import { ChevronDown } from '@/assets/svg/SvgIndex'

// local components
import SelectorOption from './SelectorOption'

// local styles
import './selectors.scss'

// Selectors takes an array of options and renders a list of SelectItems to choose from those options
// It also takes the currently selected value and a function to set the selected value
// Each option is expected to have a label and a value, but can have more
function Selectors({ options, selectedValue, setSelectedValue }) {
  // state to control the menu being open
  const [menuActive, setMenuActive] = useState(false)

  // checks if the screen is desktop size
  const { isDesktop } = useRecoilValue(windowSize)

  // ref for the button
  const selectorBtn = useRef()

  // close the menu when clicking outside of it
  useOutsideClick(selectorBtn.current, () => setMenuActive(false))

  return (
    <div
      className={
        isDesktop
          ? 'selectorsWrapper'
          : 'selectorsWrapper selectorsWrapper-mobile'
      }
    >
      {/* button to open/close the menu */}
      <button
        className="selectorsWrapper__btn"
        onClick={() => setMenuActive(!menuActive)}
        ref={selectorBtn}
      >
        <p>{selectedValue?.label}</p>
        <ChevronDown />
      </button>
      <ul
        className={
          menuActive
            ? 'selectorsWrapper__list active'
            : 'selectorsWrapper__list'
        }
      >
        {/* map through the options and render a SelectorOption for each one */}
        {options.map((option) => (
          <SelectorOption
            key={option.label}
            option={option}
            setSelectedValue={setSelectedValue}
          />
        ))}
      </ul>
    </div>
  )
}

const optionProps = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.array,
  ]),
})

Selectors.propTypes = {
  options: PropTypes.arrayOf(optionProps),
  selectedValue: optionProps,
  setSelectedValue: PropTypes.func,
}

export default Selectors
