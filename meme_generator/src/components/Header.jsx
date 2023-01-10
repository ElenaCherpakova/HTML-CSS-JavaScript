import troll from '/images/trollFace.png';


export default function Header() {
  return (
    <header className='header'>
      <img className='header--image' src={troll} alt='troll face' />
      <h2 className='header--title'>Meme Generator</h2>
      <h4 className='header--project'>React Course - Project 3</h4>
    </header>
  );
}
