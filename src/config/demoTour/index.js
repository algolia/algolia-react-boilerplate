import { atom } from 'recoil';

// Should we show the demo tour in this demo
export const shouldShowDemoTour = atom({
  key: 'shouldShowDemoTour',
  default: true,
});

// General styles to be applied
// Documentation here: https://github.com/elrumordelaluz/reactour/tree/master/packages/tour#styles-stylesobj--popoverstylesobj--maskstylesobj-1
export const styles = {};

// Atom for tour controller
export const tourStepAtom = atom({
  key: 'tourStep',
  default: 0,
  effects: [
    ({ onSet }) =>
      onSet((newValue, oldValue) => {
        for (const listener of stepListeners) listener(newValue, oldValue);
      }),
  ],
});

// Allows for listening to step changes
const stepListeners = [];

export function addListenerToStepChange(callback) {
  stepListeners.push(callback);
}

export function removeListenerToStepChange(callback) {
  const listenerIndex = stepListeners.indexOf(callback);

  stepListeners.splice(listenerIndex, 1);
}

// Allows for listening to tour opening and closing
const tourToggleListeners = [];

export function addListenerToTourToggle(callback) {
  tourToggleListeners.push(callback);
}

export function removeListenerToTourToggle(callback) {
  const listenerIndex = tourToggleListeners.indexOf(callback);

  tourToggleListeners.splice(listenerIndex, 1);
}

export function announceTourToggle(toggle) {
  for (const listener of tourToggleListeners) listener(toggle);
}
