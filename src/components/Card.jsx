import PropTypes from 'prop-types'

function handleHover() {
	const audioHover = new Audio("/dist/assets/hover.wav");
	audioHover.volume = 0.1;
	audioHover.play();
}

function Card(props) {
	return (
		<div className="card" onClick={props.clickFunction} onMouseEnter={() => handleHover()}>
			<img src={props.image} alt={props.name} />
			<h3>{props.name}</h3>
		</div>
	);
}

Card.defaultProps = {
    name: "CARD NAME",
    image: "https://via.placeholder.com/140x175",
}
Card.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    clickFunction: PropTypes.func,
}

export default Card;
