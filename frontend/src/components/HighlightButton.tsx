import React, { useState, useEffect } from 'react';

import '../css/HighlightButton.css';
import { FaHighlighter } from 'react-icons/fa';

/** Component that renders the highligh text button */
const HighlightButton: React.FC = () => {
  // TODO: Send Request to API with highlighted information
  const [inHighlightMode, setInHighlightMode] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Enable Manual Text Highlight');
  const [buttonCss, setButtonCss] = useState<string>('highlight-button-container enable');

  /** Function to get highlighted text on mouseUp. */
  const getSelectedText = (): void => {
    const text = window.getSelection().toString();
    // TODO: Send the highlighted text to API
  };

  useEffect(() => {
    if (inHighlightMode) {
      // We want to be able to highlight\
      window.onmouseup = getSelectedText;
      setButtonText('Disable Manual Text Highlight');
      setButtonCss('highlight-button-container disable');
      return;
    }

    // No longer in highlight mode, remove event listener\
    window.onmouseup = null;
    setButtonText('Enable Manual Text Highlight');
    setButtonCss('highlight-button-container enable');

    return () => {
      // Cleanup event listners
      window.onmouseup = null;
    };
  }, [inHighlightMode]);

  return (
    <div
      className={buttonCss}
      role="button"
      onClick={() => {
        setInHighlightMode(!inHighlightMode);
      }}
    >
      <h3>{buttonText}&nbsp;</h3>
      <FaHighlighter />
    </div>
  );
};

export { HighlightButton };
