import memesData from '../memesData';
import '../style.css';

export default function Meme() {
  const getImageUrl = () => {
    const data = memesData.data.memes;
    const randomNum = Math.floor(Math.random() * data.length);
    const { url } = data[randomNum];
    console.log(url);
  };

  return (
    <main>
      <div className='form'>
        <input type='text' className='form--input' placeholder='top text' />
        <input type='text' className='form--input' placeholder='bottom text' />
        <button onClick={getImageUrl} className='form--button'>
          Generate Meme
        </button>
      </div>
    </main>
  );
}
