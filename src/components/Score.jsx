import PropTypes from 'prop-types'

function Score(props) {
    return (
        <div className="score-container">
            <div className="score">
                <h2>SCORE: </h2><b>{props.score}</b>
            </div>
            <div className="high-score">
                <h2>HIGH-SCORE: </h2><b>{props.highScore}</b>
            </div>
        </div>
    );
}

Score.defaultProps = {
    score: 0,
    highScore: 0,
}
Score.propTypes = {
    score: PropTypes.number,
    highScore: PropTypes.number,
}

export default Score;