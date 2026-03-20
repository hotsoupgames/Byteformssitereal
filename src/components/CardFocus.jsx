import { useState } from "react";
import "../css/CardFocus.css"

function CardFocus(props) {
  const card = props.selectedCard;
  const setCardFocus = props.setCardFocus;
  const setSelectedCard= props.setSelectedCard;

  const images = import.meta.glob("/src/assets/images/*", {
    eager: true,
    import: "default",
  });

  const handleCardClick = () => {
    setCardFocus(false)
    setSelectedCard(null)
  }

  const [printing, setPrinting] = useState(0)
  const handlePrintingSelect = () => {
      if (document.getElementById("printing-selection") != null) {
          setPrinting(document.getElementById("printing-selection").value)
      }
  }

  return (
    <div className="card-focus">
      <div className="card-focus-window">
        <img src={"/src/assets/images/" + card.printings[printing].image} alt={card.name} className="focus-card-image"/>
        <div>
          <p>{card.name}</p>
          <select onChange={handlePrintingSelect} id="printing-selection">
            {card.printings.map((printing, i) => (
              <option value={i}>{printing.rarity} {card.type}, {printing.set}</option>  
            ))}
          </select>
          <p>{card.text}</p>
        </div>
        <div className="card-focus-info">
          {card.type != "Peripheral" && card.type != "Command" ? 
              card.type == "Node" ? 
                  <p>Durability: {card.durability}</p>
              : <p>Attack: {card.attack} Durability: {card.durability}</p>
          : <p/>}
          {card.type != "Peripheral" && card.type != "Command" ? 
            <p>Cores: {card.numCores} </p>
          : <p/>}
        </div>
        <button onClick={handleCardClick}>Back</button>
      </div>
    </div>
  );
}

export default CardFocus;
