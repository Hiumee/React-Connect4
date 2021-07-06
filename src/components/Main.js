function Main({ table, setTable, nextMove, setNextMove, winner, setWinner }) {
    const checkWinner = async (row, column, move) => {
        // Horizontal
        for(let i=-3;i<=0;i++) {
            let allGood = true
            for(let j=0;j<4;j++) {
                if(!(column+i+j===column) && table[row][column+i+j] !== move) {
                    allGood = false
                }
            }
            if(allGood) {
                setWinner(move)
                return
            }
        }
        //Vertical
        if(row <= 2) {
            let allGood = true
            for(let i=1;i<4;i++) {
                if(table[row+i][column] !== move) {
                    allGood = false
                }
            }
            if(allGood) {
                setWinner(move)
                return
            }
        }

        //Diagonal
        for(let i=-3;i<=0;i++) {
            let allGood = true
            for(let j=0;j<4;j++) {
                const r = row + i + j;
                const c = column + i + j;
                if(r < 0 || r >= table.length || c < 0 || c >= table[0].length || (!(r === row && c === column) && table[r][c] !== move)) {
                    allGood = false
                }
            }
            if(allGood) {
                setWinner(move)
                return
            }
        }
        
        for(let i=-3;i<=0;i++) {
            let allGood = true
            for(let j=0;j<4;j++) {
                const r = row + i + j;
                const c = column - i - j;
                if(r < 0 || r >= table.length || c < 0 || c >= table[0].length || (!(r === row && c === column) && table[r][c] !== move)) {
                    allGood = false
                }
            }
            if(allGood) {
                setWinner(move)
                return
            }
        }  
    }

    const onClick = async (column) => {
        if(!winner) {
            for(let i=table.length-1;i>=0;i--) {
                if(table[i][column] === 0) {
                    const newTable = table.map( (row, index) =>
                        index === i ? row.map( (piece, index) =>
                            index === column ? nextMove : piece
                        ) : row
                    )
                    setTable(newTable)
                    await checkWinner(i, column, nextMove)
                    setNextMove(nextMove === 1 ? 2 : 1)
                    break
                }
            }
        }
    }

    return (
        <div className='table'>
            {table.map((row, index) => 
                <div key={index}>
                    <span className='row-start' />
                    {row.map((cell, index) => 
                        <span key={index} className={'cell '+(cell ? (cell === 1 ? 'blue' : 'red') : '')} onClick={() => onClick(index)}>
                        </span>
                        )}
                </div>
            )}
        </div>
    )
}

export default Main
