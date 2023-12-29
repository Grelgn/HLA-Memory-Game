import { useState } from "react";
import Card from "./Card";

function Game() {
    const [cardList, setCardList] = useState([
        {name: "HEADCRAB", image: "./src/assets/HLA_Headcrab.png"},
        {name: "POISON HEADCRAB", image: "./src/assets/HLA_PoisonHeadcrab.png"},
        {name: "ARMORED HEADCRAB", image: "./src/assets/HLA_ArmoredHeadcrab.png"},
        {name: "BARNACLE", image: "./src/assets/HLA_Barnacle.png"},
        {name: "ANTLION SOLDIER", image: "./src/assets/HLA_AntlionSoldier.png"},
        {name: "ANTLION WORKER", image: "./src/assets/HLA_AntlionWorker.png"},
    ]);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    
    function randomizeCards() {
        let currentIndex = cardList.length,  randomIndex;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [cardList[currentIndex], cardList[randomIndex]] = [
            cardList[randomIndex], cardList[currentIndex]];
        }

        setCardList(cardList);
        setToggleRefresh(!toggleRefresh);
    }

    return (
        <main>
            <div className="card-container" key={toggleRefresh}>
                <Card name={cardList[0].name} image={cardList[0].image} randomizeCards={() => randomizeCards()} />
                <Card name={cardList[1].name} image={cardList[1].image} randomizeCards={() => randomizeCards()} />
                <Card name={cardList[2].name} image={cardList[2].image} randomizeCards={() => randomizeCards()} />
                <Card name={cardList[3].name} image={cardList[3].image} randomizeCards={() => randomizeCards()} />
                <Card name={cardList[4].name} image={cardList[4].image} randomizeCards={() => randomizeCards()} />
                <Card name={cardList[5].name} image={cardList[5].image} randomizeCards={() => randomizeCards()} />
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