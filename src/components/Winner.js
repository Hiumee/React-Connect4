function Winner({ winner }) {
    return (
        <div>
            {winner !== 0 &&
            <span className={"winner-text "+(winner === 1 ? 'blue' : 'red')}>Winner</span>
            }
        </div>
    )
}

export default Winner
