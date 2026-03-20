import cards from "../assets/cards_final.json"
import "../css/Cards.css"
import CardInfo from "../components/CardInfo"
import CardFocus from "../components/CardFocus"
import { useState } from "react"

function Cards(){

    const [selectedCard, setSelectedCard] = useState(null)
    const [cardFocus, setCardFocus] = useState(false)
    const [search, setSearch] = useState("")

    const [rarityFilter, setRarityFilter] = useState("All")
    const handleRaritySelect = () => {
        if (document.getElementById("rarity-selection") != null) {
            setRarityFilter(document.getElementById("rarity-selection").value)
        }
    }

    const [setFilter, setSetFilter] = useState("All")
    const handleSetSelect = () => {
        if (document.getElementById("set-selection") != null) {
            setSetFilter(document.getElementById("set-selection").value)
        }
    }

    const [coreFilter, setCoreFilter] = useState("All")
    const handleCoreSelect = () => {
        if (document.getElementById("core-selection") != null) {
            setCoreFilter(document.getElementById("core-selection").value)
        }
    }

    const [typeFilter, setTypeFilter] = useState("All")
    const handleTypeSelect = () => {
        if (document.getElementById("type-selection") != null) {
            setTypeFilter(document.getElementById("type-selection").value)
        }
    }

    const handleClear = () => {
        setSearch("")
        if (document.getElementById("search-input") != null) {
            document.getElementById("search-input").value = ""
        }
    }

    const checkCategories = (card) => {
        if (!card.name.toLowerCase().includes(search.toLowerCase())){
            return false
        }

        if (coreFilter != "All" && !card.coreType.includes(coreFilter)) {
            return false
        }
        
        if (typeFilter != "All" && !card.type.includes(typeFilter)) {
            return false
        }
        
        for (const print in card.printings){
            if ((rarityFilter == "All" || card.printings[print].rarity == rarityFilter) && 
                (setFilter == "All" || card.printings[print].set == setFilter)) {
                return true
            }
            
        }
    
        return false
    }

    const getPrinting = (card) => {

        console.log(card.name)
        for (const print in card.printings){
            console.log(rarityFilter + " x " + card.printings[print].rarity)
            console.log(setFilter + " x " + card.printings[print].set)
            console.log("")
            if ((rarityFilter == "All" || card.printings[print].rarity == rarityFilter) && (setFilter == "All" || card.printings[print].set == setFilter)) {
                return print
            }
        }
        return 0
    }

    const rarities = ["Common", "Uncommon", "Rare", "Ultra Rare", "Chromatic"]
    const sets = ["Base Set", "Starter Set", "Promo Set"]
    const cores = ["Firewire", "Rootlink", "Psycore", "Android", "Blackhat", "Torrent"]
    const types = ["Basic", "Fusion", "Evolution", "Special", "Node", "Peripheral", "Command"]


    return(
        <div className="card-page">
            <div className="card-filters">
                <div className="card-search-bar">
                    <input 
                        type="text"
                        placeholder="Enter a card name"
                        className="search-input"
                        id="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleClear} className="card-search-bar-clear">
                        X
                    </button>
                </div>
                <select className="filter-selection" id="rarity-selection" onChange={handleRaritySelect}>
                    <option value="All" defaultValue>All Rarities</option>
                    {rarities.map((rarity, i) => (
                        <option value={rarity} key={i}>{rarity}</option>
                    ))}
                </select>
                <select className="filter-selection" id="set-selection" onChange={handleSetSelect}>
                    <option value="All" defaultValue>All Sets</option>
                    {sets.map((set, i) => (
                        <option value={set} key={i}>{set}</option>
                    ))}
                </select>
                <select className="filter-selection" id="core-selection" onChange={handleCoreSelect}>
                    <option value="All" defaultValue>All Cores</option>
                    {cores.map((core, i) => (
                        <option value={core} key={i}>{core}</option>
                    ))}
                </select>
                <select className="filter-selection" id="type-selection" onChange={handleTypeSelect}>
                    <option value="All" defaultValue>All Card Types</option>
                    {types.map((type, i) => (
                        <option value={type} key={i}>{type}</option>
                    ))}
                </select>
            </div>

            
            <div className="card-list">
                {cards.map((card, i) => (
                    checkCategories(card) &&
                    <CardInfo card={card} printing={getPrinting(card)} key={i} setCardFocus={setCardFocus} cardFocus={cardFocus} setSelectedCard={setSelectedCard} selectedCard={selectedCard}/>
                ))}
            </div>
            {cardFocus ? 
                <CardFocus selectedCard={selectedCard} setCardFocus={setCardFocus} setSelectedCard={setSelectedCard}/>
            : <p/>}
        </div>
    )

}

export default Cards