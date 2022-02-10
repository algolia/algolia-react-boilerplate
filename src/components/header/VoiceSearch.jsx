import React from 'react';
// Algolia Import

import {
  connectSearchBox,
  createVoiceSearchHelper,
} from 'react-instantsearch-dom';

class VoiceSearchComponent extends React.Component {
  componentDidMount() {
    const { refine } = this.props;
    this.voiceSearchHelper = createVoiceSearchHelper({
      searchAsYouSpeak: false,
      onQueryChange: (query) => refine(query),
      onStateChange: () => {
        this.setState(this.voiceSearchHelper.getState());
      },
    });
    this.setState(this.voiceSearchHelper.getState());
  }

  componentWillUnmount() {
    if (this.voiceSearchHelper) {
      this.voiceSearchHelper.dispose();
    }
  }

  render() {
    if (!this.voiceSearchHelper) {
      return null;
    }

    const { status, transcript, isSpeechFinal, errorCode } = this.state;
    const { isBrowserSupported, isListening, toggleListening } =
      this.voiceSearchHelper;

    return (
      <div>
        <button
          type="button"
          title="Voice Search"
          onClick={toggleListening}
          disabled={!isBrowserSupported()}
        >
          {isListening() ? 'Stop' : 'Start'}
        </button>
        <div>
          <p>status: {status}</p>
          <p>transcript: {transcript}</p>
          <p>isSpeechFinal: {isSpeechFinal ? 'true' : 'false'}</p>
          <p>errorCode: {errorCode}</p>
          <p>isListening: {isListening() ? 'true' : 'false'}</p>
          <p>isBrowserSupported: {isBrowserSupported() ? 'true' : 'false'}</p>
        </div>
      </div>
    );
  }
}
const CustomVoiceSearchComponent = connectSearchBox(VoiceSearchComponent);

export default CustomVoiceSearchComponent;
