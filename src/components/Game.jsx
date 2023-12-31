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
        { name: "REVIVER", image: "./src/assets/HLA_Reviver.png" },
        { name: "STRIDER", image: "./src/assets/HLA_Strider.png" },
        { name: "ZOMBIE", image: "./src/assets/HLA_Zombie.png" },
        { name: "VORTIGAUNT", image: "./src/assets/HLA_Vortigaunt.png" },
        { name: "SNARK", image: "./src/assets/HLA_Snark.png" },
        { name: "DROPSHIP", image: "./src/assets/HLA_Dropship.png" },
        { name: "JEFF", image: "./src/assets/HLA_Jeff.png" },
        { name: "METRO COP", image: "./src/assets/HLA_Metrocop.png" },
        { name: "COMBINE GRUNT", image: "./src/assets/HLA_Combine_Grunt.png" },
        { name: "COMBINE ORDINAL", image: "./src/assets/HLA_Combine_Ordinal.png" },
        { name: "COMBINE CHARGER", image: "./src/assets/HLA_Combine_Charger.png" },
        { name: "COMBINE SUPPRESSOR", image: "./src/assets/HLA_Combine_Suppressor.png" },
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
    const audioOpen = new Audio("./src/assets/open.wav");
    const audioStart = new Audio("./src/assets/start.wav");
    const audioSelect = new Audio("./src/assets/select.wav");
    const audioComplete = new Audio("./src/assets/complete.wav");
    const audioHover = new Audio("./src/assets/hover.wav");
    const audioRetract = new Audio("./src/assets/retract.wav");
    const audioRetract2 = new Audio("./src/assets/retract2.wav");
    const audioFail = new Audio("./src/assets/fail.wav");
    // const audioLoop = new Audio("./src/assets/underground.mp3");

    audioOpen.volume = 0.1;
    audioStart.volume = 0.1;
    audioSelect.volume = 0.2;
    audioComplete.volume = 0.2;
    audioHover.volume = 0.2;
    audioRetract.volume = 0.1;
    audioRetract2.volume = 0.1;
    audioFail.volume = 0.2;
    // audioLoop.volume = 0.03;

    // audioLoop.addEventListener('timeupdate', function(){
    //     const buffer = 0.356;
    //     if(this.currentTime > this.duration - buffer){
    //         this.currentTime = 0
    //         this.play()
    //     }
    // });

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

	function handleCardClick(e) {
		const name = e.target.parentNode.innerText;

        // Lost Game
		if (clickedCards.includes(name)) {
            audioFail.play();
            setTimeout(() => {
                audioRetract.play();
            }, 1200);
            setTimeout(() => {
                audioRetract2.play();
            }, 4200);

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

        audioSelect.play();
		setClickedCards((c) => [...c, name]);
		setScore(s => s + 1);

        // Won Game
		if (score >= 17) {
            setGameVisibility(false);
            setDataVisibility(false);
            setVideo("Won");
            setHighScore(score + 1);
			console.log("YOU WIN");
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
                <img src="./src/assets/barcode.png" />
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
            <img src="./src/assets/temp_background.png" className="temp-background "/>
		</main>
	);
}

export default Game;
