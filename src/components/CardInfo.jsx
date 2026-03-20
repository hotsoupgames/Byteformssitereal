import { useEffect } from "react";
import "../css/Cards.css"

function CardInfo(props) {
  const card = props.card;
  const setSelectedCard = props.setSelectedCard;
  const selectedCard = props.selectedCard;
  const setCardFocus = props.setCardFocus;
  const cardFocus = props.cardFocus;
  const printing = props.printing

  if (card == null){
      console.log("exiting")
      return (<p />) 
  }

  const images = import.meta.glob("../assets/images/*", {
    eager: true,
    import: "default",
  });

  const handleCardClick = () => {
    if (!cardFocus){
    setSelectedCard(card)
    }
  }

  useEffect (() => {
    if (selectedCard != null){
      setCardFocus(true)
    }
  }, [selectedCard])

  return (
    <div className="card-background" onClick={handleCardClick}>
      <div className="card-info">
        {console.log(card.printings[printing])}
        <img src={"src/assets/images/" + card.printings[printing].image} alt={card.name} className="card-image"/>
        <p>{card.name}</p>
      </div>
    </div>
  );
}

export default CardInfo;
