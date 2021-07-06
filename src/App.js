import './App.css';
import Main from './components/Main'
import Winner from './components/Winner'
import { useState } from 'react'

let rows = 6;
let columns = 7;
let toConnect = 4;

function App() {
  const initialState = Array(rows).fill().map(()=>Array(columns).fill(0))
  const [toConnectState, setToConnect] = useState(4)

  const [table, setTable] = useState(initialState)
  const [nextMove, setNextMove] = useState(1)
  const [winner, setWinner] = useState(0)

  const resetTable = async () => {
    setWinner(0)
    console.log(rows, columns)
    setTable(Array(rows).fill().map(()=>Array(columns).fill(0)))
    setToConnect(toConnect)
  }

  return (
    <div className='app'>
      <div>
        <span className='title'>Connect <input onChange={event => toConnect = Math.max(4, parseInt(event.target.value))} className='number-input' type='number' defaultValue={4} min={4}></input></span>
        <span className='input-span'>Size <input onChange={event => rows = Math.max(4, parseInt(event.target.value))} className='number-input' type='number' defaultValue={6} min={4}></input> x <input onChange={event => columns = Math.max(4, parseInt(event.target.value))} className='number-input' type='number' defaultValue={7} min={4}></input></span>
        <button className='btn' onClick={resetTable}>Reset</button>
      </div>
      <Main table={table} setTable={setTable} nextMove={nextMove} setNextMove={setNextMove} winner={winner} setWinner={setWinner} toConnect={toConnectState}></Main>
      <Winner winner={winner} />
    </div>
  );
}

export default App;
