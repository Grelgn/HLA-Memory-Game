import { useState } from "react";
import Card from "./Card";

function Game() {
	const [cardList, setCardList] = useState([
		{ name: "HEADCRAB", image: "./src/assets/HLA_Headcrab.png" },
		{ name: "POISON HEADCRAB", image: "./src/assets/HLA_PoisonHeadcrab.png" },
		{ name: "ARMORED HEADCRAB", image: "./src/assets/HLA_ArmoredHeadcrab.png" },
		{ name: "BARNACLE", image: "./src/assets/HLA_Barnacle.png" },
		{ name: "ANTLION SOLDIER", image: "./src/assets/HLA_AntlionSoldier.png" },
		{ name: "ANTLION WORKER", image: "./src/assets/HLA_AntlionWorker.png" },
	]);
	const [toggleRefresh, setToggleRefresh] = useState(false);
	const [clickedCards, setClickedCards] = useState([]);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	function randomizeCards() {
		let currentIndex = cardList.length,
			randomIndex;

		while (currentIndex > 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[cardList[currentIndex], cardList[randomIndex]] = [cardList[randomIndex], cardList[currentIndex]];
		}

		setCardList(cardList);
		setToggleRefresh(!toggleRefresh);
	}

	function handleCardClick(e) {
		const name = e.target.parentNode.innerText;
		if (clickedCards.includes(name)) {
			setHighScore(score);
			console.log("GAME OVER");
			setClickedCards([]);
			setScore(0);

			randomizeCards();
			return;
		}
		setClickedCards((c) => [...c, name]);
		setScore(score + 1);
		if (score >= 5) {
			console.log("YOU WIN");
		}

		randomizeCards();
	}

	return (
		<main>
            <video autoPlay muted loop height={50}>
				<source src="./src/assets/Wupgrade_Loop2.mp4" type="video/mp4" />
			</video>
			<div className="score-container">
				<h2>SCORE: {score}</h2>
				<h2>HIGH-SCORE: {highScore}</h2>
			</div>
			<div className="card-container" key={toggleRefresh}>
				<Card name={cardList[0].name} image={cardList[0].image} clickFunction={(e) => handleCardClick(e)} />
				<Card name={cardList[1].name} image={cardList[1].image} clickFunction={(e) => handleCardClick(e)} />
				<Card name={cardList[2].name} image={cardList[2].image} clickFunction={(e) => handleCardClick(e)} />
				<Card name={cardList[3].name} image={cardList[3].image} clickFunction={(e) => handleCardClick(e)} />
				<Card name={cardList[4].name} image={cardList[4].image} clickFunction={(e) => handleCardClick(e)} />
				<Card name={cardList[5].name} image={cardList[5].image} clickFunction={(e) => handleCardClick(e)} />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</main>
	);
}

export default Game;
