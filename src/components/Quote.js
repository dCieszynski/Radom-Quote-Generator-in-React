import React from 'react';

export const Quote = (props) => {
  return (
    <div className='container container--quote'>
      <div className='quote'>{props.quote}</div>
      <div className='author'>{props.author}</div>
    </div>
  );
};
