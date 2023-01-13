import { useState } from 'react';
import memesData from '../memesData';
import '../style.css';

export default function Meme() {
  const [memeImage, setImageMeme] = useState('');

  const getMemeImg = () => {
    const data = memesData.data.memes;
    const randomNum = Math.floor(Math.random() * data.length);
    setImageMeme(data[randomNum].url);
  };

  return (
    <main>
      <div className='form'>
        <input type='text' className='form--input' placeholder='top text' />
        <input type='text' className='form--input' placeholder='bottom text' />
        <button onClick={getMemeImg} className='form--button'>
          Generate Meme
        </button>
      </div>
      <img src={memeImage} className="meme--image" />
    </main>
  );
}
