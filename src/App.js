import './App.css';
import Main from './components/Main'
import Winner from './components/Winner'
import { useState } from 'react'

function App() {
  const initialState = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
  ]
  const [table, setTable] = useState(initialState)
  const [nextMove, setNextMove] = useState(1)
  const [winner, setWinner] = useState(0)

  const resetTable = async () => {
    setWinner(0)
    setTable(initialState)
  }

  return (
    <div className='app'>
      <h1>Connect 4 <button className='btn' onClick={resetTable}>Reset</button></h1>
      <Main table={table} setTable={setTable} nextMove={nextMove} setNextMove={setNextMove} winner={winner} setWinner={setWinner}></Main>
      <Winner winner={winner} />
    </div>
  );
}

export default App;
