import React, { useState } from 'react';
import memesData from '../memesData';
import '../style.css';

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemeImages, setAllMemeImages] = useState(memesData);

  function getMemeImg() {
    const memesArray = allMemeImages.data.memes;
    const randomNum = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNum].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  return (
    <main>
      <div className='form'>
        <input
          type='text'
          className='form--input'
          placeholder='top text'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type='text'
          className='form--input'
          placeholder='bottom text'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImg} className='form--button'>
          Generate Meme
        </button>
      </div>
      <img src={meme.randomImage} className='meme--image' />
      <h2 className='meme--text top'>{meme.topText}</h2>
      <h2 className='meme--text bottom'>{meme.bottomText}</h2>
    </main>
  );
}
