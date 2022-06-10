import React from 'react';

// Override content component of the tour
export default function Content({ content }) {
  return <div className='tour-content-container'>{content}</div>;
}
