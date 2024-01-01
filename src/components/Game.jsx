import { useState, useEffect } from "react";
import Card from "./Card";
import Video from "./Video";
import Score from "./Score";

import imgHeadcrab from "/dist/assets/HLA_Headcrab.png";
import imgPoisonHeadcrab from "/dist/assets/HLA_PoisonHeadcrab.png";
import imgArmoredHeadcrab from "/dist/assets/HLA_ArmoredHeadcrab.png";
import imgBarnacle from "/dist/assets/HLA_Barnacle.png";
import imgAntlionSoldier from "/dist/assets/HLA_AntlionSoldier.png";
import imgAntlionWorker from "/dist/assets/HLA_AntlionWorker.png";
import imgReviver from "/dist/assets/HLA_Reviver.png";
import imgStrider from "/dist/assets/HLA_Strider.png";
import imgZombie from "/dist/assets/HLA_Zombie.png";
import imgVortigaunt from "/dist/assets/HLA_Vortigaunt.png";
import imgSnark from "/dist/assets/HLA_Snark.png";
import imgDropship from "/dist/assets/HLA_Dropship.png";
import imgJeff from "/dist/assets/HLA_Jeff.png";
import imgMetroCop from "/dist/assets/HLA_Metrocop.png";
import imgCombineGrunt from "/dist/assets/HLA_Combine_Grunt.png";
import imgCombineOrdinal from "/dist/assets/HLA_Combine_Ordinal.png";
import imgCombineCharger from "/dist/assets/HLA_Combine_Charger.png";
import imgCombineSuppressor from "/dist/assets/HLA_Combine_Suppressor.png";

import imgCombineLogo from "/dist/assets/combine_logo.png";
import imgBarcode from "/dist/assets/barcode.png";
import imgTempBackground from "/dist/assets/temp_background.png";

import audOpen from "/dist/assets/open.wav";
import audStart from "/dist/assets/start.wav";
import audSelect from "/dist/assets/select.wav";
import audComplete from "/dist/assets/complete.wav";
import audHover from "/dist/assets/hover.wav";
import audRetract from "/dist/assets/retract.wav";
import audFail from "/dist/assets/fail.wav";

function Game() {
	const [cardList, setCardList] = useState([
		{ name: "HEADCRAB", image: imgHeadcrab },
		{ name: "POISON HEADCRAB", image: imgPoisonHeadcrab },
		{ name: "ARMORED HEADCRAB", image: imgArmoredHeadcrab},
		{ name: "BARNACLE", image: imgBarnacle },
		{ name: "ANTLION SOLDIER", image: imgAntlionSoldier },
		{ name: "ANTLION WORKER", image: imgAntlionWorker },
        { name: "REVIVER", image: imgReviver },
        { name: "STRIDER", image: imgStrider },
        { name: "ZOMBIE", image: imgZombie },
        { name: "VORTIGAUNT", image: imgVortigaunt },
        { name: "SNARK", image: imgSnark },
        { name: "DROPSHIP", image: imgDropship },
        { name: "JEFF", image: imgJeff },
        { name: "METRO COP", image: imgMetroCop },
        { name: "COMBINE GRUNT", image: imgCombineGrunt },
        { name: "COMBINE ORDINAL", image: imgCombineOrdinal },
        { name: "COMBINE CHARGER", image: imgCombineCharger },
        { name: "COMBINE SUPPRESSOR", image: imgCombineSuppressor },
	]);
	const [toggleRefresh, setToggleRefresh] = useState(false);
	const [clickedCards, setClickedCards] = useState([]);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
    const [video, setVideo] = useState("Loop");
    const [gameVisibility, setGameVisibility] = useState(false);
    const [dataVisibility, setDataVisibility] = useState(true);
    const [startVisibility, setStartVisibility] = useState(true);
    const [lostVisibility, setLostVisibility] = useState(false);
    const [wonVisibility, setWonVisibility] = useState(false);

    //Sounds
    const audioOpen = new Audio(audOpen);
    const audioStart = new Audio(audStart);
    const audioSelect = new Audio(audSelect);
    const audioComplete = new Audio(audComplete);
    const audioHover = new Audio(audHover);
    const audioRetract = new Audio(audRetract);
    const audioFail = new Audio(audFail);

    audioOpen.volume = 0.08;
    audioStart.volume = 0.08;
    audioSelect.volume = 0.15;
    audioComplete.volume = 0.15;
    audioHover.volume = 0.1;
    audioRetract.volume = 0.08;
    audioFail.volume = 0.15;

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
        
        setTimeout(() => {
            const cards = document.querySelectorAll(".card img");
            cards.forEach(card => {
            card.classList.add("glitch");
        });
        }, 1);
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

	function handleCardClick(e) {
        
		const name = e.target.parentNode.innerText;

        // Lost Game
		if (clickedCards.includes(name)) {
            audioFail.play();
            setTimeout(() => {
                audioRetract.play();
            }, 200);

            setGameVisibility(false);
            setDataVisibility(false);
            setVideo("Lost");

            if (score > highScore) {
                setHighScore(score);
            }
			
			setClickedCards([]);
			setScore(0);

			randomizeCards();

            setTimeout(() => {
                setVideo("Loop");
                setDataVisibility(true);
                setLostVisibility(true);
            }, 4000);

			return;
		}

        audioSelect.play();
		setClickedCards((c) => [...c, name]);
		setScore(s => s + 1);

        // Won Game
		if (score >= 17) {
            setGameVisibility(false);
            setDataVisibility(false);
            setVideo("Won");
            setHighScore(score + 1);
            setClickedCards([]);
			setScore(0);

            audioOpen.play();
            setTimeout(() => {
                audioStart.play();
            }, 1000);
            setTimeout(() => {
                audioComplete.play();
                setVideo("Loop");
                setWonVisibility(true);
                setDataVisibility(true);
            }, 9000);
		}

		randomizeCards();
	}

    // Handle start and restart
    function handleStartClick() {
        // audioLoop.play();
        audioSelect.play();
        setVideo("Won");
        setStartVisibility(false);
        setLostVisibility(false);
        setWonVisibility(false);
        setGameVisibility(false);
        setDataVisibility(false);
        audioOpen.play();
        setTimeout(() => {
            audioStart.play();
        }, 1000);
        setTimeout(() => {
            audioComplete.play();
            setVideo("Loop");
            setGameVisibility(true);
            setDataVisibility(true);
            randomizeCards();
        }, 9000);
    }

    function handleRestartClick() {
        audioSelect.play();
        setVideo("Loop");
        setStartVisibility(false);
        setLostVisibility(false);
        setWonVisibility(false);
        setGameVisibility(true);
        setDataVisibility(true);
        randomizeCards();
    }

    // Button sounds
    function handleHover() {
        audioHover.play();
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
                    <img src={imgCombineLogo}/>
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
                    <Card name={cardList[6].name} image={cardList[6].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[7].name} image={cardList[7].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[8].name} image={cardList[8].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[9].name} image={cardList[9].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[10].name} image={cardList[10].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[11].name} image={cardList[11].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[12].name} image={cardList[12].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[13].name} image={cardList[13].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[14].name} image={cardList[14].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[15].name} image={cardList[15].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[16].name} image={cardList[16].image} clickFunction={(e) => handleCardClick(e)} />
                    <Card name={cardList[17].name} image={cardList[17].image} clickFunction={(e) => handleCardClick(e)} />
                </div>
                <Score score={score} highScore={highScore}/>
            </div>
            <div className="game-bottom">
                <img src={imgBarcode} />
            </div>
            <div className="start invisible">
                <h2>
                    REPORT ALL BIOTICS WITHOUT REPETITION
                </h2>
                <button onClick={handleStartClick} onMouseEnter={handleHover}>
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
                <button onClick={handleRestartClick} onMouseEnter={handleHover}>
                    RESTART TRAINING
                </button>
            </div>
            <div className="won invisible">
                <h2>
                    BIOTICS VISCON SUCCESSFUL
                </h2>
                <button onClick={handleRestartClick} onMouseEnter={handleHover}>
                    RESTART TRAINING
                </button>
            </div>
            <img src={imgTempBackground} className="temp-background "/>
		</main>
	);
}

export default Game;
