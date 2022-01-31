import React, { useState } from 'react';
import style from './_Searchbar.module.scss';
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset()
  };

  return (
    <div className={style.container}>
      <form className={style.searchbar} onSubmit={(e) => handleSubmit}>
        <input
          type='text'
          onChange={(e) => setInput(e.target.value)}
          placeholder='Buscar'
          value={input}
        />
        <Link to={`/search/${input}`}>
          <button type='submit'>
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.9636 12.0241C8.31325 14.1468 4.43382 13.9797 1.97703 11.5229C-0.65901 8.88693 -0.65901 4.61307 1.97703 1.97703C4.61307 -0.65901 8.88695 -0.65901 11.523 1.97703C13.9797 4.43381 14.1468 8.31323 12.0241 10.9635L17.1798 16.1191C17.4727 16.412 17.4727 16.8869 17.1798 17.1798C16.8869 17.4727 16.4121 17.4727 16.1192 17.1798L10.9636 12.0241ZM3.03769 10.4623C0.98744 8.41203 0.98744 5.08794 3.03769 3.03769C5.08795 0.98744 8.41205 0.98744 10.4623 3.03769C12.5111 5.08644 12.5126 8.40713 10.4669 10.4578C10.4654 10.4593 10.4639 10.4607 10.4622 10.4623C10.4607 10.4638 10.4593 10.4653 10.4579 10.4668C8.40715 12.5125 5.08644 12.511 3.03769 10.4623Z'
                fill='black'
              />
            </svg>
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Searchbar
