import './App.css';
import { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");
  const colors = [
    '#ff80ed',
    '#065535',
    '#ffc0cb', 
    '#008080', 
    '#40e0d0',
    '#b0e0e6', 
    '#ff6347',
    '#1e90ff',
    '#32cd32',
    '#ff4500',
    '#9370db',
    '#00ced1',
    '#ffa500',
    '#8a2be2',
    '#ff69b4',
    '#00fa9a',
    '#4169e1',
    '#ff8c00',
    '#20b2aa',
    '#8b008b',
    '#ff1493'];
  const [randomColor, setRandomColor] = useState('');
  const [tweetQuoteURL, setTweetQuoteURL] = useState('');

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
        let index = Math.floor(Math.random() * data.length);
        let author = data[index].author || 'Unknown';

        // Check if author is a non-empty string before applying replace
        if (typeof author === 'string' && author.trim() !== '') {
          author = author.replace(/,?\s?type.fit/, ''); // Removes annoying 'type.fit' from the end of the author name (from API)
        }
        setRandomQuote({
          text: data[index].text,
          author: author
        });
        let twURL = data[index].text;
        setTweetQuoteURL(twURL.replace(/\s/g, '%20'));
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    }
    fetchQuotes();
    updateBgColor();
  }, []);

  useEffect(() => {
    updateBgColor();
  }, [randomQuote]);

  const updateBgColor = () => {
    let index = Math.floor(Math.random() * colors.length);
    setRandomColor(colors[index]);
  };
  
  useEffect(() => {
    console.log(tweetQuoteURL);
  }, [tweetQuoteURL]);

  const newQuote = () => {
    let index = Math.floor(Math.random() * quotes.length);
    let _author = quotes[index].author || 'Unknown';

    // Check if _author is a non-empty string before applying replace
    if (typeof _author === 'string' && _author.trim() !== '') {
      _author = _author.replace(/,?\s?type.fit/, ''); // Removes annoying 'type.fit' from the end of the author name (from API)
    }

    setRandomQuote({
      text: quotes[index].text,
      author: _author
    });
    let twURL = quotes[index].text;
    setTweetQuoteURL(twURL.replace(/\s/g, '%20'));
  };

  return (
    <div style={{ backgroundColor: randomColor }}>
      <div className="App container d-flex justify-content-center vh-100 align-items-center">
        <QuoteCard text={randomQuote.text} author={randomQuote.author} newQuote={newQuote} twitterIntent={tweetQuoteURL}/>
      </div>
    </div>
  );
}

export default App;
