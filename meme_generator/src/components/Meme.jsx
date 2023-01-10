import '../style.css';

export default function Meme() {
  return (
    <main>
      <form className='form'>
        <input type='text' className='form--input' placeholder='top text' />
        <input
          type='text'
          className='form--input'
          placeholder='bottom text'
        />
        <button className='form--button'>Generate Meme</button>
      </form>
    </main>
  );
}
