import paper from '../../assets/paper.png';
import scissor from '../../assets/scissor.png';
import rock from '../../assets/rock.png';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../socket';
import { useSelector } from 'react-redux';
import ScoreCalc from '../../Utils/Score';
const Game = () => {
  const [pick, setPick] = useState('');
  const [myPick, setMyPick] = useState();
  const [opponentPick, setOpponentPick] = useState();
  const [timer, setTimer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [oppoMove, setOppoMove] = useState('');
  const [myMove, setMyMove] = useState('');
  const { user } = useSelector((v) => v.auth);
  const { id } = useParams();
  const { users } = useSelector((v) => v.users);
  useEffect(() => {
    if (id) {
      socket.emit('joinGame', id);
      socket.connect();
    }
  }, [id]);
  const handleSubmit = useCallback(() => {
    if (pick && user) {
      const data = {
        id,
        pick,
        sender: user._id
      }
      setMyMove(pick);
      socket.emit("game", data);
      setPick('');
      setPick('');
      clearInterval(intervalId);
    }
  }, [pick, id, user, intervalId]);
  useEffect(() => {
    if (pick) {
      if (pick === "Paper") setMyPick(paper);
      if (pick === "Scissor") setMyPick(scissor);
      if (pick === "Rock") setMyPick(rock);
      socket.emit("moveMade", { id, pick, sender: user._id });
    }
  }, [pick, id, user]);
  useEffect(() => {
    socket.on("startTimer", () => {
      setTimer(5);
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
      setIntervalId(interval);
      const timeout = setTimeout(() => {
        handleSubmit();
      }, 5000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
        setTimer(null);
      };
    });
    return () => {
      socket.off("startTimer");
    };
  }, [handleSubmit]);
  const [opponetUser, setOpponentUser] = useState();
  useEffect(() => {
    socket.on('sendMove', (data) => {
      const opponetUser = users.find((v) => v._id === data.sender.toString());
      if (opponetUser) {
        setOpponentUser(opponetUser);
        setOppoMove(data.pick);
        if (data.pick === "Paper") {
          setOpponentPick(paper)
        }
        if (data.pick === "Scissor") {
          setOpponentPick(scissor)
        }
        if (data.pick === "Rock") {
          setOpponentPick(rock)
        }
      }
    })
    return () => {
      socket.off('sendMove');
    };
  }, [users])
  let [score, setScore] = useState({});
  const [result, setResult] = useState("")
  useEffect(() => {
    if (myMove && oppoMove) {
      setResult(ScoreCalc(myMove, oppoMove));
    }
    setScore(JSON.parse(localStorage.getItem("score")));
  }, [myMove, oppoMove])

  return (
    <div className='w-full h-full bg-purple-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100'>
      <div>
        <h1 className='text-3xl font-bold text-black'>Pick Your Move</h1>
        <p className='text-center text-5xl pb-4 font-bold '>{timer !== null ? timer : ''}</p>
      </div>
      <form onSubmit={handleSubmit} className='flex items-center justify-center gap-4 mb-6'>
        <img type="submit" onClick={() => setPick("Paper")} className='h-28 w-28 rounded-full hover:scale-110 duration-100' src={paper} alt="Paper" />
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
          <h1 className='text-2xl pt-8 font-bold'>{opponetUser?.name} Move</h1>
          <img className='h-28 w-28 rounded-full' src={opponentPick} alt="Scissor" />
        </div>
      </div>
      <div className='m-6 flex'>
        <h1 className='text-xl'>Result : {result ? <b className={`font-bold text-4xl p-3 border-2 shadow-lg ${result==="win"?"text-green-400":"text-red-700"}`}>{result.toUpperCase()}</b> : <b>Play to See Result</b>} </h1>
      </div>
      <div className='m-6 flex flex-col sm:flex-row justify-evenly'>
        <h1 className='sm:text-2xl font-bold'>Total Wins : <b>{score.wins}</b></h1>
        <h1 className='sm:text-2xl font-bold'>Total Lost : <b>{score.lost}</b></h1>
        <h1 className='sm:text-2xl font-bold'>Total Tie : <b>{score.tie}</b></h1>
      </div>
      <div className='m-6 flex flex-col gap-2 sm:flex-row'>
        <button className='bg-orange-600 text-xl text-black font-bold hover:bg-green-600 duration-300 px-4 py-2'>Reset Scores</button>
        <button className='bg-orange-600 text-xl text-black font-bold hover:bg-green-600 duration-300 px-4 py-2'>Exit Game</button>
      </div>
    </div>
  )
}

export default Game