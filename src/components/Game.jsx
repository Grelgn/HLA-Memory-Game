import { useState, useEffect } from "react";
import Card from "./Card";
import Video from "./Video";
import Score from "./Score";

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
    const [video, setVideo] = useState("Won");
    const [gameVisibility, setGameVisibility] = useState(false);
    const [dataVisibility, setDataVisibility] = useState(false);
    const [startVisibility, setStartVisibility] = useState(false);
    const [lostVisibility, setLostVisibility] = useState(false);
    const [wonVisibility, setWonVisibility] = useState(false);

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

    // Show-Hide game
    useEffect(() => {
        const vis = document.querySelectorAll(".game-middle > div");
        if (gameVisibility) {
            vis[0].classList.remove("invisible");
            vis[1].classList.remove("invisible");
        } else {
            vis[0].classList.add("invisible");
            vis[1].classList.add("invisible");
        }
    }, [gameVisibility]);

    // Show-Hide data ui
    useEffect(() => {
        const vis = document.querySelector(".game-top");
        const vis2 = document.querySelector(".game-bottom");
        if (dataVisibility) {
            vis.classList.remove("invisible");
            vis2.classList.remove("invisible");
        } else {
            vis.classList.add("invisible");
            vis2.classList.add("invisible");
        }
    }, [dataVisibility]);

    // Show-Hide Start button
    useEffect(() => {
        const start = document.querySelector(".start");
        if (startVisibility) {
            start.classList.remove("invisible");
        } else {
            start.classList.add("invisible");
        }
    }, [startVisibility]);

    // Show-Hide Lost
    useEffect(() => {
        const lost = document.querySelector(".lost");
        if (lostVisibility) {
            lost.classList.remove("invisible");
        } else {
            lost.classList.add("invisible");
        }
    }, [lostVisibility]);

    // Show-Hide Won
    useEffect(() => {
        const won = document.querySelector(".won");
        if (wonVisibility) {
            won.classList.remove("invisible");
        } else {
            won.classList.add("invisible");
        }
    }, [wonVisibility]);

    // Start
    useEffect(() => {
        setTimeout(() => {
            setVideo("Loop");
            setDataVisibility(true);
            setStartVisibility(true);
        }, 12000);
    }, []);

	function handleCardClick(e) {
		const name = e.target.parentNode.innerText;

        // Lost Game
		if (clickedCards.includes(name)) {
            setGameVisibility(false);
            setDataVisibility(false);
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
                setDataVisibility(true);
                setLostVisibility(true);
            }, 8000);

			return;
		}

		setClickedCards((c) => [...c, name]);
		setScore(s => s + 1);

        // Won Game
		if (score >= 5) {
            setGameVisibility(false);
            setDataVisibility(false);
            setVideo("Won");
            setHighScore(score + 1);
			console.log("YOU WIN");
            setClickedCards([]);
			setScore(0);

            randomizeCards();

            setTimeout(() => {
                setVideo("Loop");
                setGameVisibility(false);
                setWonVisibility(true);
                setDataVisibility(true);
            }, 12000);
		}

		randomizeCards();
	}

    // Handle start and restart
    function handleStartClick() {
        setStartVisibility(false);
        setLostVisibility(false);
        setWonVisibility(false);
        setGameVisibility(true);
    }

	return (
		<main>
            <div className="game-top">
                <div className="top-left">
                    <b>ECHO-1-12-7</b>
                    <p>XXXXXXXXXXXX..XXX.X.X</p>
                </div>
                <div className="top-right">
                    <p>BIOTICS VISCON TRAINING STATION 0.3.3.333</p>
                    <img src="./src/assets/combine_logo.png"/>
                </div>
            </div>
            <div className="game-middle">
                <Video videoState={video} key={video}/>
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
                <Score score={score} highScore={highScore}/>
            </div>
            <div className="game-bottom">
                <img src="./src/assets/barcode.png" />
            </div>
            <div className="start invisible">
                <h2>
                    REPORT ALL BIOTICS WITHOUT REPETITION
                </h2>
                <button onClick={handleStartClick}>
                    START TRAINING
                </button>
            </div>
            <div className="lost invisible">
                <div className="lost-text">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alert</title><path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z" /></svg>
                    <h2>
                        FAILED BIOTICS VISCON
                    </h2>
                </div>
                <button onClick={handleStartClick}>
                    RESTART TRAINING
                </button>
            </div>
            <div className="won invisible">
                <h2>
                    BIOTICS VISCON SUCCESSFUL
                </h2>
                <button onClick={handleStartClick}>
                    RESTART TRAINING
                </button>
            </div>
		</main>
	);
}

export default Game;
