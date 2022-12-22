// SelectorOption receives an option and a function to set the selected value
// It renders a list item with the option's label and calls the function to set the selected value when clicked
function SelectorOption({ option, setSelectedValue }) {
  return (
    <li
      className="selectorsWrapper__listItem"
      onClick={() => {
        setSelectedValue(option)
      }}
    >
      {option.label}
    </li>
  )
}

export default SelectorOption
