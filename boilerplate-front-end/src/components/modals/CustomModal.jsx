// To close the modal simply click on the grey background
const CustomModal = (props) => {
  const {
    position = 'static',
    top = '0px',
    bottom,
    children,
    isActive,
    setActive,
  } = props

  // This function closes the modal when the
  // background is clicked - stopPropagation
  // needed to alow clicks on the modal body
  const closeModal = (event) => {
    event.cancelBubble = true
    if (event.stopPropagation) event.stopPropagation()
  }

  return (
    <div>
      {isActive && (
        <div className="Overlay" onClick={() => setActive(false)}>
          <div
            className="Modal"
            onClick={(e) => {
              closeModal(e)
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomModal
