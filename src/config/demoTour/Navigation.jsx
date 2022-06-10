import { useEffect, useState } from 'react';
import useSteps from './steps';

// Override navigation component of the popover
export default function Navigation({
  currentStep: currentStepIndex,
  setCurrentStep,
  steps,
  Arrow,
}) {
  // Get the chapters
  const chapters = useSteps(true);

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  // Parse the step index
  currentStepIndex = parseInt(currentStepIndex, 10);

  // Get the current chapter
  useEffect(() => {
    // Remembers the step index of the last visited chapter
    let lastChapterStepIndex = 0;

    // Loop through each step
    for (const { firstStepIndex } of Object.values(chapters)) {
      // If this chapter's step index is higher than our step's index, that means we have reached the chapter next to our own
      if (firstStepIndex > currentStepIndex) {
        setCurrentChapterIndex(lastChapterStepIndex);
        return;
      }

      lastChapterStepIndex = firstStepIndex;
    }

    // If we never found a chapter after the current one, that's because it was the last chapter
    setCurrentChapterIndex(lastChapterStepIndex);
  }, [currentStepIndex]);

  // Seek a chapter
  function handleChapterSelect(event) {
    setCurrentStep(event.target.value);
  }

  return (
    <div className="tour-navigation">
      {/* Return a step */}
      <span
        onClick={() => setCurrentStep((current) => Math.max(current - 1, 0))}
      >
        <Arrow />
      </span>

      {/* Current tour chapter */}
      <select
        value={currentChapterIndex}
        onChange={handleChapterSelect}
        placeholder="Chapter"
      >
        {chapters.map(({ chapter, firstStepIndex }) => (
          <option value={firstStepIndex} key={firstStepIndex}>
            {chapter}
          </option>
        ))}
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
