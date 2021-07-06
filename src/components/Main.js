function Main({ table, setTable, nextMove, setNextMove, winner, setWinner, toConnect }) {
    const checkWinner = async (row, column, move) => {
        // Horizontal
        for(let i=-toConnect+1;i<=0;i++) {
            let allGood = true
            for(let j=0;j<toConnect;j++) {
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
        if(row <= table.length-toConnect) {
            let allGood = true
            for(let i=1;i<toConnect;i++) {
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
        for(let i=-toConnect+1;i<=0;i++) {
            let allGood = true
            for(let j=0;j<toConnect;j++) {
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
        
        for(let i=-toConnect+1;i<=0;i++) {
            let allGood = true
            for(let j=0;j<toConnect;j++) {
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

    const maxNumber = Math.max(table.length, table[0].length)

    const cellStyle = { 
        height: 50/maxNumber + "vh",
        width: 50/maxNumber + "vh",
        maxHeight: 50/maxNumber + "vw",
        maxWidth: 50/maxNumber + "vw",
    }

    const rowStyle = { 
        height: 50/maxNumber + "vh",
        maxHeight: 50/maxNumber + "vw",
    }

    return (
        <div className='table'>
            {table.map((row, index) => 
                <div style={{lineHeight: 0}} key={index}>
                    <span style={rowStyle} className='row-start' />
                    {row.map((cell, index) => 
                        <span style={cellStyle} key={index} className={'cell '+(cell ? (cell === 1 ? 'blue' : 'red') : '')} onClick={() => onClick(index)}>
                        </span>
                        )}
                </div>
            )}
        </div>
    )
}

export default Main
