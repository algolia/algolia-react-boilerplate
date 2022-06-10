// Override navigation component of the popover
export default function Navigation({
  currentStep,
  setCurrentStep,
  steps,
  Arrow,
}) {
  return (
    <div className="tour-navigation">
      {/* Return a step */}
      <span
        onClick={() => setCurrentStep((current) => Math.max(current - 1, 0))}
      >
        <Arrow />
      </span>

      {/* Current tour chapter */}
      <select placeholder="Chapter">
        <option value="0">Introduction</option>
        <option value="1">Homepage</option>
        <option value="2">Federated Search</option>
      </select>

      {/* Advance to next step */}
      <span
        className="flip"
        onClick={() =>
          setCurrentStep((current) => Math.min(current + 1, steps.length - 1))
        }
      >
        <Arrow />
      </span>
    </div>
  );
}
