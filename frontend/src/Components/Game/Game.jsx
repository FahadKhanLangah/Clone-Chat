import paper from '../../assets/paper.png';
import scissor from '../../assets/scissor.png';
import rock from '../../assets/rock.png';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../socket';
const Game = () => {
  const [pick, setPick] = useState('');
  const [myPick, setMyPick] = useState();
  const [timer, setTimer] = useState(5);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      socket.emit('joinGame', id);
      socket.connect();
    }
  }, [id]);
  const handleSubmit = useCallback(() => {
    if (pick) {
      socket.emit("game", pick);
      setPick(''); 
    }
  }, [pick]);
  useEffect(() => {
    if (pick) {
      if (pick === "Paper") {
        setMyPick(paper)
      }
      if (pick === "Scissor") {
        setMyPick(scissor)
      }
      if (pick === "Rock") {
        setMyPick(rock)
      }
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      const timeout = setTimeout(() => {
        handleSubmit();
      }, 5000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        setTimer(5);
      };
    }
  }, [pick,handleSubmit]);
  const hanldeKey = (e)=>{
    console.log(e.key)
  }
  return (
    <div className='w-full h-full bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100'>
      <div>
        <h1 className='text-3xl font-bold text-black'>Pick Your Move</h1>
        <p className='text-center text-5xl pb-4 font-bold '>{timer}</p>
      </div>
      <form onSubmit={handleSubmit} className='flex items-center justify-center gap-4 mb-6'>
        <img type="submit" onKeyDown={(e)=>hanldeKey(e)} onClick={() => setPick("Paper")} className='h-28 w-28 rounded-full hover:scale-110 duration-100' src={paper} alt="Paper" />
        <img type="submit" onClick={() => setPick("Scissor")} className='h-28 w-28 rounded-full hover:scale-110 duration-100' src={scissor} alt="Scissor" />
        <img type="submit" onClick={() => setPick("Rock")} className='h-28 w-28 rounded-full hover:scale-110 duration-100' src={rock} alt="Scissor" />
      </form>
      <hr />
      <div className='flex flex-col sm:flex-row items-center gap-10 justify-center m-4'>
        <div className='flex gap-10'>
          <h1 className='text-2xl pt-8 font-bold'>Your Move</h1>
          <img className='h-28 w-28 rounded-full' src={myPick} alt="Paper" />
        </div>
        <div className='flex gap-10'>
          <h1 className='text-2xl pt-8 font-bold'>Tariq Move</h1>
          <img className='h-28 w-28 rounded-full' src={scissor} alt="Scissor" />
        </div>
      </div>
      <div className='m-6 flex'>
        <h1 className='text-3xl font-bold'>Result : <b>You Win</b></h1>
      </div>
      <div className='m-6 flex flex-col sm:flex-row justify-evenly'>
        <h1 className='sm:text-2xl font-bold'>Total Wins : <b>5</b></h1>
        <h1 className='sm:text-2xl font-bold'>Total Lost : <b>4</b></h1>
        <h1 className='sm:text-2xl font-bold'>Total Tie : <b>3</b></h1>
      </div>
      <div className='m-6 flex flex-col gap-2 sm:flex-row'>
        <button className='bg-orange-600 text-xl text-black font-bold hover:bg-green-600 duration-300 px-4 py-2'>Reset Scores</button>
        <button className='bg-orange-600 text-xl text-black font-bold hover:bg-green-600 duration-300 px-4 py-2'>Exit Game</button>
      </div>
    </div>
  )
}

export default Game