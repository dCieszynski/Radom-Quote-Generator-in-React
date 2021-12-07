import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Quote } from './Quote';

export const Body = (props) => {
  let [{ quote, author }, setQuote] = useState({});
  let [quotes, setQuotes] = useState([]);
  let [displayedQuotes, setDisplayedQuotes] = useState([]);

  useEffect(() => {
    getInitQuote();
  }, []);

  let getInitQuote = async () => {
    let response = await axios.get(
      'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
    );
    let data = await response.data;
    setQuotes(data);
    getRandomQuote(data);
  };

  let getRandomQuote = (quotes) => {
    let getRandomInt = function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };
    let randomQuoteIndex = getRandomInt(0, quotes.length);
    let { quote, author } = quotes[randomQuoteIndex];
    setDisplayedQuotes([...displayedQuotes, { quote, author }]);
    setQuote({ quote, author });
  };

  let getPreviousQuote = (displayedQuotes) => {
    if (displayedQuotes.length - 1 > 0) {
      let { quote, author } = displayedQuotes[displayedQuotes.length - 1 - 1];
      let updatedDisplayedQuotes = displayedQuotes;
      updatedDisplayedQuotes.pop();
      setDisplayedQuotes(updatedDisplayedQuotes);
      setQuote({ quote, author });
    } else if (displayedQuotes.length === 1) {
      let { quote, author } = displayedQuotes[displayedQuotes.length - 1];
      setQuote({ quote, author });
    }
  };

  return (
    <main className='body'>
      <Quote quote={quote} author={author} />
      <div className='container container--buttons'>
        <button
          className='btn btn--prev'
          onClick={() => {
            getPreviousQuote(displayedQuotes);
          }}
        >
          Previous
        </button>
        <button className='btn btn--new' onClick={() => getRandomQuote(quotes)}>
          New
        </button>
      </div>
    </main>
  );
};
