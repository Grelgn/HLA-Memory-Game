import { useState, useEffect } from "react";
import Card from "./Card";
import Video from "./Video";

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
    const [video, setVideo] = useState("Loop");
    const [gameVisibility, setGameVisibility] = useState(true);

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

    useEffect(() => {
        const vis = document.querySelectorAll("main > div");
        if (gameVisibility) {
            vis[0].classList.remove("invisible");
            vis[1].classList.remove("invisible");
        } else {
            vis[0].classList.add("invisible");
            vis[1].classList.add("invisible");
        }
    }, [gameVisibility]);

	function handleCardClick(e) {
		const name = e.target.parentNode.innerText;
		if (clickedCards.includes(name)) {
            setGameVisibility(false);
            setVideo("Lost");

            if (score > highScore) {
                setHighScore(score);
            }
			
			console.log("GAME OVER");
			setClickedCards([]);
			setScore(0);

			randomizeCards();

            setTimeout(() => {
                setVideo("Loop");
                setGameVisibility(true);
            }, 8000);

			return;
		}
		setClickedCards((c) => [...c, name]);
		setScore(s => s + 1);
		if (score >= 5) {
            setGameVisibility(false);
            setVideo("Won");
            setHighScore(score + 1);
			console.log("YOU WIN");
            setClickedCards([]);
			setScore(0);

            randomizeCards();

            setTimeout(() => {
                setVideo("Loop");
                setGameVisibility(true);
            }, 12000);
		}

		randomizeCards();
	}

	return (
		<main>
            <Video videoState={video} key={video}/>
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
