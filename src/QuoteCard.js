import { useState } from 'react'

function QuoteCard({ text, author, newQuote, twitterIntent }) {

  return (
    <div className="card bg-white shadow-lg border border-5 border-dark" id="quote-box" style={{width: 20 + 'rem'}}>
        <div className="card-body">
          <p className="card-text" id="text">{text}</p>
          <h6 className="card-title" id="author">by {author}</h6>
          <div className="row card-footer bg-white">
            <div className='col-md-3'>
                <button className='btn btn-light'>
                  <a id='tweet-quote' target='_blank' href={'https://twitter.com/intent/tweet?text=' + twitterIntent}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                      </svg>
                  </a>
                </button>
            </div>
            <div className='col-md-6'></div>
            <div className='col-md-3'><button onClick={newQuote} id='new-quote' className='btn btn-dark'>New Quote</button></div>
            </div>         
        </div>
      </div>
  )
}

QuoteCard.defaultProps = {
    text: 'default text',
    author: 'default author',
}

export default QuoteCard;