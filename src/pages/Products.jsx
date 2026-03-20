import { useState } from "react"
import "../css/Products.css"

const products = [
  {
    id: 1,
    name: "Base Set Booster Pack",
    category: "Booster Packs",
    description: "10 cards from the Byteforms TCG Base Set. Each pack contains cards from all six Core types and may contain Rare, Ultra Rare, or Chromatic cards.",
    availability: "Available at local game stores",
    image: null,
    tags: ["Base Set"]
  },
  {
    id: 2,
    name: "Starter Set Booster Pack",
    category: "Booster Packs",
    description: "10 cards from the Byteforms TCG Starter Set. Features Evolution and Fusion cards not found in the Base Set.",
    availability: "Available at local game stores",
    image: null,
    tags: ["Starter Set"]
  },
  {
    id: 3,
    name: "Firewire Starter Deck",
    category: "Starter Decks",
    description: "A ready-to-play 40-card Firewire deck. Perfect for new players who want to learn the game with an aggressive, hard-hitting strategy. Includes a quick-start rulebook.",
    availability: "Available at local game stores",
    image: null,
    tags: ["Firewire", "Starter"]
  },
  {
    id: 4,
    name: "Blackhat Starter Deck",
    category: "Starter Decks",
    description: "A ready-to-play 40-card Blackhat deck. Built around board control and strategic removal. Great for players who enjoy a tactical, methodical playstyle.",
    availability: "Available at local game stores",
    image: null,
    tags: ["Blackhat", "Starter"]
  },
  {
    id: 5,
    name: "Base Set Booster Box",
    category: "Booster Boxes",
    description: "24 Base Set Booster Packs. The best way to build a complete collection. Guaranteed to contain multiple Rare, Ultra Rare, and Chromatic cards.",
    availability: "Available at local game stores",
    image: null,
    tags: ["Base Set"]
  },
  {
    id: 6,
    name: "Promo Set Bundle",
    category: "Special",
    description: "A curated set of Promo Series Chromatic cards featuring alternate art versions of fan-favourite Byteforms. Ask your local game store about availability.",
    availability: "Limited — ask your local store",
    image: null,
    tags: ["Promo Set", "Chromatic"]
  },
  {
    id: 7,
    name: "Byteforms Card Sleeves (50ct)",
    category: "Accessories",
    description: "High-quality card sleeves featuring the official Byteforms TCG logo. Standard trading card size. Pack of 50.",
    availability: "Available at local game stores",
    image: null,
    tags: ["Accessories"]
  },
  {
    id: 8,
    name: "Byteforms Playmat",
    category: "Accessories",
    description: "Official Byteforms TCG playmat with the logo and subtle dot-grid background. 24\" x 14\". Non-slip rubber base.",
    availability: "Coming soon",
    image: null,
    tags: ["Accessories"]
  }
]

const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))]

const CORE_COLORS = {
  Firewire: "#c0392b",
  Rootlink: "#27ae60",
  Psycore: "#8e44ad",
  Android: "#2980b9",
  Blackhat: "#2c3e50",
  Torrent: "#16a085",
  Chromatic: "#d4ac0d"
}

function ProductCard({ product }) {
  const availClass =
    product.availability.includes("soon") ? "avail-soon" :
    product.availability.includes("Limited") ? "avail-limited" : "avail-available"

  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        <span className="product-icon">📦</span>
      </div>
      <div className="product-info">
        <div className="product-tags">
          {product.tags.map((t, i) => (
            <span
              className="product-tag"
              key={i}
              style={CORE_COLORS[t] ? { borderColor: CORE_COLORS[t], color: CORE_COLORS[t] } : {}}
            >{t}</span>
          ))}
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className={`product-availability ${availClass}`}>
          {product.availability}
        </div>
      </div>
    </div>
  )
}

function Products() {
  const [category, setCategory] = useState("All")
  const [search, setSearch] = useState("")

  const filtered = products.filter(p => {
    if (category !== "All" && p.category !== category) return false
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="products-page">
      <h1 className="products-heading">Products</h1>
      <p className="products-subheading">
        Byteforms TCG products are available at local game stores near you. Ask your local store to stock us!
      </p>

      <div className="products-controls">
        <div className="card-search-bar products-search">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button onClick={() => setSearch("")} className="card-search-bar-clear">X</button>
        </div>
        <div className="products-categories">
          {categories.map((c, i) => (
            <button
              key={i}
              className={`products-cat-btn ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        {filtered.length === 0 && (
          <p className="products-empty">No products found.</p>
        )}
      </div>
    </div>
  )
}

export default Products
