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

  return (
    <main>
      <div className='form'>
        <input type='text' className='form--input' placeholder='top text' />
        <input type='text' className='form--input' placeholder='bottom text' />
        <button onClick={getMemeImg} className='form--button'>
          Generate Meme
        </button>
      </div>
      <img src={meme.randomImage} className='meme--image' />
    </main>
  );
}
