import './App.css';
import { useState, useEffect } from 'react';
import QuoteCard from './QuoteCard'

function App() {

  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState("");
  const [colors, setColors] = useState(['#ff80ed', '#065535', '#ffc0cb', '#008080', '#40e0d0', '#b0e0e6']);
  const [randomColor, setRandomColor] = useState('');

  useEffect( () => {
    async function fetchQuotes() {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
      let index = Math.floor(Math.random() * data.length);
      setRandomQuote({
        text: data[index].text,
        author: data[index].author.replace(/,?\s?type.fit/, '')
      });
    };
    fetchQuotes();
    updateBgColor();
  }, []);

  useEffect( () => {
    updateBgColor();
  }, [randomQuote])

  const updateBgColor = () => {
    let index = Math.floor(Math.random() * colors.length);
    setRandomColor(colors[index]);
  }

  const newQuote = () => {
    let index = Math.floor(Math.random() * quotes.length);
    let _author = quotes[index].author.replace(/,?\s?type.fit/, ''); //removes annoying 'type.fit' from end of author name (from API)
    if (_author == '') _author = 'Unknown';
    setRandomQuote({
      text: quotes[index].text,
      author: _author
    });
  }

  return (
    <div style={{backgroundColor: randomColor}}>
      <div className="App container d-flex justify-content-center vh-100 align-items-center">
        <QuoteCard text={randomQuote.text} author={randomQuote.author} newQuote={newQuote}/>
      </div>
    </div>
  );
}

export default App;
