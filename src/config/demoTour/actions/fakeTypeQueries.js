import {
  addListenerToStepChange,
  addListenerToTourToggle,
  removeListenerToStepChange,
  removeListenerToTourToggle,
} from '..';

export default function fakeTypeQueries(
  panel,
  { setTourStep, setFederatedSearch, getStepIndex }
) {
  // In the panel is not mounted, retrace to the fed open step
  if (panel == undefined) {
    setTourStep(getStepIndex('openFedSearch'));
    return;
  }

  setTimeout(() => {
    setFederatedSearch(true);

    // Scroll to the top
    setTimeout(() => window.scrollTo(0, 0), 200);
  }, 50);

  // === SEARCHBOX INPUT SETTER
  // Based on: https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js

  // Get the searchbox
  const searchInput = document.querySelector('input.searchbox__form__input');

  // Get an HTML element setter
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set;

  // Method for inputting some string to the searchbox
  const setSearchQuery = (query) => {
    // Call it in the input
    nativeInputValueSetter.call(searchInput, query);

    // Dispatch an input event
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  };

  // Method for "fake typing" a string, letter by letter
  // The interval is in milliseconds
  // Returns a promise that resolves when done
  const fakeType = (query, token, interval = 200) =>
    new Promise((resolve) => {
      // Separate first letter from rest
      const [first, ...rest] = query;

      // Type first letter
      setSearchQuery(searchInput.value + first);

      // If there are more letters (& not cancelled), keep going
      if (rest.length == 0 || token.cancelled) {
        resolve();
        return;
      }

      setTimeout(() => fakeType(rest, token, interval).then(resolve), interval);
    });

  // Method for erasing input after a delay
  // Delays in milliseconds
  // Returns a promise that resolves when done
  const eraseInputAfterDelay = (
    selectDelay = 1000,
    eraseDelay = 400,
    doneDelay = 200
  ) =>
    new Promise((resolve) => {
      // Wait delay
      setTimeout(() => {
        // Select text
        searchInput.select();

        // Wait
        setTimeout(() => {
          // Erase text
          setSearchQuery('');

          // Deselect
          window.getSelection().removeAllRanges();

          // Wait
          setTimeout(resolve, doneDelay);
        }, eraseDelay);
      }, selectDelay);
    });

  // Method for taking multiple queries and fake typing one at a time, looping forever until cancelled
  // Returns a callback that when called cancels the loop
  const fakeTypeMultiple = (queries) => {
    // Cancel token
    let token = { cancelled: false };

    // Clear whatever's in there now
    setSearchQuery('');

    const loop = async () => {
      // Current query index
      let queryIndex = 0;

      // Loop until cancelled
      while (token.cancelled == false) {
        // Type query
        await fakeType(queries[queryIndex], token);

        // Erase query
        if (token.cancelled == false) {
          await eraseInputAfterDelay();
        }

        queryIndex = (queryIndex + 1) % queries.length;
      }

      // Erase content
      setSearchQuery('');
    };

    // Start
    loop();

    return () => (token.cancelled = true);
  };

  // Type something
  setTimeout(() => {
    const cancelTyping = fakeTypeMultiple([
      'Lacoste shirts',
      'blue skirts',
      'green glasses',
    ]);

    // Listen to step change
    function cancelAndUnsubscribe() {
      cancelTyping();

      removeListenerToStepChange(cancelAndUnsubscribe);
      removeListenerToTourToggle(cancelAndUnsubscribe);
    }

    addListenerToStepChange(cancelAndUnsubscribe);
    addListenerToTourToggle(cancelAndUnsubscribe);
  }, 100);
}
