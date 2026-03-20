import { useState } from "react"
import cards from "../assets/cards_final.json"
import "../css/DeckBuilder.css"

const rarities = ["Common", "Uncommon", "Rare", "Ultra Rare", "Chromatic"]
const sets = ["Base Set", "Starter Set", "Promo Set"]
const cores = ["Firewire", "Rootlink", "Psycore", "Android", "Blackhat", "Torrent"]
const types = ["Basic", "Fusion", "Evolution", "Special", "Node", "Peripheral", "Command"]

const DECK_LIMIT = 60
const CARD_COPY_LIMIT = 4

function DeckBuilder() {
  const [deck, setDeck] = useState([])
  const [search, setSearch] = useState("")
  const [rarityFilter, setRarityFilter] = useState("All")
  const [setFilter, setSetFilter] = useState("All")
  const [coreFilter, setCoreFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [deckName, setDeckName] = useState("My Deck")
  const [editingName, setEditingName] = useState(false)
  const [notification, setNotification] = useState("")

  const showNotification = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(""), 2000)
  }

  const checkCategories = (card) => {
    if (!card.name.toLowerCase().includes(search.toLowerCase())) return false
    if (coreFilter !== "All" && !card.coreType.includes(coreFilter)) return false
    if (typeFilter !== "All" && !card.type.includes(typeFilter)) return false
    for (const print of card.printings) {
      if (
        (rarityFilter === "All" || print.rarity === rarityFilter) &&
        (setFilter === "All" || print.set === setFilter)
      ) return true
    }
    return false
  }

  const getPrinting = (card) => {
    for (let i = 0; i < card.printings.length; i++) {
      const p = card.printings[i]
      if (
        (rarityFilter === "All" || p.rarity === rarityFilter) &&
        (setFilter === "All" || p.set === setFilter)
      ) return i
    }
    return 0
  }

  const deckTotal = deck.reduce((sum, e) => sum + e.count, 0)

  const addCard = (card) => {
    if (deckTotal >= DECK_LIMIT) { showNotification(`Deck is full! (${DECK_LIMIT} cards max)`); return }
    const existing = deck.find(e => e.card.name === card.name)
    if (existing) {
      if (existing.count >= CARD_COPY_LIMIT) { showNotification(`Max ${CARD_COPY_LIMIT} copies of ${card.name}`); return }
      setDeck(deck.map(e => e.card.name === card.name ? { ...e, count: e.count + 1 } : e))
    } else {
      setDeck([...deck, { card, count: 1 }])
    }
  }

  const removeCard = (cardName) => {
    setDeck(deck
      .map(e => e.card.name === cardName ? { ...e, count: e.count - 1 } : e)
      .filter(e => e.count > 0)
    )
  }

  const clearDeck = () => setDeck([])

  const exportDeck = () => {
    const lines = [`# ${deckName}`, `# ${deckTotal} cards`, ""]
    deck.forEach(e => lines.push(`${e.count}x ${e.card.name}`))
    const blob = new Blob([lines.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${deckName.replace(/\s+/g, "_")}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const typeCount = deck.reduce((acc, e) => {
    acc[e.card.type] = (acc[e.card.type] || 0) + e.count
    return acc
  }, {})

  const coreCount = deck.reduce((acc, e) => {
    e.card.coreType.forEach(c => { acc[c] = (acc[c] || 0) + e.count })
    return acc
  }, {})

  const filteredCards = cards.filter(checkCategories)

  return (
    <div className="deckbuilder-page">
      {notification && <div className="db-notification">{notification}</div>}

      {/* Left: Card Pool */}
      <div className="db-pool">
        <div className="db-filters">
          <div className="card-search-bar">
            <input
              type="text"
              placeholder="Search cards..."
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button onClick={() => setSearch("")} className="card-search-bar-clear">X</button>
          </div>
          <select className="filter-selection" onChange={e => setRarityFilter(e.target.value)}>
            <option value="All">All Rarities</option>
            {rarities.map((r, i) => <option value={r} key={i}>{r}</option>)}
          </select>
          <select className="filter-selection" onChange={e => setSetFilter(e.target.value)}>
            <option value="All">All Sets</option>
            {sets.map((s, i) => <option value={s} key={i}>{s}</option>)}
          </select>
          <select className="filter-selection" onChange={e => setCoreFilter(e.target.value)}>
            <option value="All">All Cores</option>
            {cores.map((c, i) => <option value={c} key={i}>{c}</option>)}
          </select>
          <select className="filter-selection" onChange={e => setTypeFilter(e.target.value)}>
            <option value="All">All Types</option>
            {types.map((t, i) => <option value={t} key={i}>{t}</option>)}
          </select>
        </div>

        <div className="db-card-count-label">{filteredCards.length} cards</div>

        <div className="db-card-grid">
          {filteredCards.map((card, i) => {
            const p = getPrinting(card)
            const inDeck = deck.find(e => e.card.name === card.name)
            return (
              <div
                className={`db-card-thumb ${inDeck ? "in-deck" : ""}`}
                key={i}
                onClick={() => addCard(card)}
                title={`${card.name} — click to add`}
              >
                <img
                  src={`src/assets/images/${card.printings[p].image}`}
                  alt={card.name}
                  className="db-card-img"
                />
                {inDeck && <div className="db-card-badge">{inDeck.count}</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Right: Deck List */}
      <div className="db-deck">
        <div className="db-deck-header">
          {editingName ? (
            <input
              className="db-deck-name-input"
              value={deckName}
              autoFocus
              onChange={e => setDeckName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={e => e.key === "Enter" && setEditingName(false)}
            />
          ) : (
            <h2 className="db-deck-name" onClick={() => setEditingName(true)} title="Click to rename">
              {deckName} ✎
            </h2>
          )}
          <div className="db-deck-count">
            <span className={deckTotal >= DECK_LIMIT ? "count-full" : ""}>{deckTotal}</span>
            <span>/{DECK_LIMIT}</span>
          </div>
        </div>

        {/* Stats */}
        {deck.length > 0 && (
          <div className="db-stats">
            <div className="db-stats-section">
              <div className="db-stats-label">By Type</div>
              {Object.entries(typeCount).map(([type, count]) => (
                <div className="db-stat-row" key={type}>
                  <span>{type}</span><span>{count}</span>
                </div>
              ))}
            </div>
            <div className="db-stats-section">
              <div className="db-stats-label">By Core</div>
              {Object.entries(coreCount).map(([core, count]) => (
                <div className="db-stat-row" key={core}>
                  <span>{core}</span><span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="db-deck-list">
          {deck.length === 0 && (
            <p className="db-empty">Click cards on the left to add them to your deck.</p>
          )}
          {deck.map((entry, i) => (
            <div className="db-deck-entry" key={i}>
              <span className="db-entry-count">{entry.count}x</span>
              <span className="db-entry-name">{entry.card.name}</span>
              <span className="db-entry-type">{entry.card.type}</span>
              <div className="db-entry-actions">
                <button className="db-entry-btn" onClick={() => addCard(entry.card)}>+</button>
                <button className="db-entry-btn" onClick={() => removeCard(entry.card.name)}>−</button>
              </div>
            </div>
          ))}
        </div>

        <div className="db-deck-actions">
          <button className="db-action-btn" onClick={exportDeck} disabled={deck.length === 0}>Export</button>
          <button className="db-action-btn danger" onClick={clearDeck} disabled={deck.length === 0}>Clear</button>
        </div>
      </div>
    </div>
  )
}

export default DeckBuilder
