export default function passStepOnFedClick(
  searchbox,
  { setFederatedSearch, setTourStep }
) {
  setFederatedSearch(false);

  const input = searchbox.querySelector('input');

  // Remember the current step
  let stepCache = null;

  // Use setter to get access to the real current step
  setTourStep((currentStep) => (stepCache = currentStep));

  // Listen for user click
  function passStepOnClick() {
    console.log('ye boy');

    setTourStep((currentStep) => {
      // Avoid passing the step in a later step
      console.log(stepCache, currentStep);

      if (stepCache == currentStep) return currentStep + 1;
      else return currentStep;
    });

    // Also remove listener on trigger
    input.removeEventListener('click', passStepOnClick);
  }

  input.addEventListener('click', passStepOnClick);
}
