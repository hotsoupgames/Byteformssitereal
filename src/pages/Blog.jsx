import { useState } from "react"
import "../css/Blog.css"

const blogPosts = [
  {
    id: 1,
    title: "Welcome to the Byteforms TCG Blog!",
    date: "2026-03-01",
    author: "Byteforms Team",
    tags: ["Announcement"],
    summary: "We're excited to launch the official Byteforms TCG blog — your home for game updates, strategy guides, and community news.",
    content: `Welcome to the official Byteforms TCG blog! This is where you'll find all the latest news about the game, including set announcements, rule clarifications, strategy tips, and community spotlights.

Byteforms TCG is a fast-growing trading card game set in a digital world of programs, nodes, and core types. Whether you're a brand-new player or a seasoned veteran, this blog will have something for you.

Stay tuned for upcoming posts covering:
- Deep dives into each Core type and their strategies
- Deck building guides for beginners
- Announcements for upcoming sets
- Tournament results and coverage

Thanks for being part of the community — see you in the game!`
  },
  {
    id: 2,
    title: "Deck Building 101: Understanding Core Types",
    date: "2026-03-08",
    author: "Byteforms Team",
    tags: ["Strategy", "Beginner"],
    summary: "A breakdown of the six Core types in Byteforms TCG and how to build around each one effectively.",
    content: `One of the most important decisions in Byteforms TCG is choosing your Core type. Your Core type shapes your entire deck strategy. Here's a quick overview:

**Firewire** — Aggressive and fast. Firewire decks love to apply Overheat and hit hard early. Great for beginners who like a straightforward gameplan.

**Rootlink** — Resilient and growth-focused. Rootlink decks build up resources over time and are hard to stop once they get going.

**Psycore** — Tricky and disruptive. Psycore excels at manipulating the game state, using Packet Loss to cripple your opponent's hand.

**Android** — Synergistic and board-wide. Android decks benefit from having lots of Byteforms on the field at once.

**Blackhat** — Tactical and removal-heavy. Blackhat decks control the board and pick off threats with precision.

**Torrent** — Flexible and combo-oriented. Torrent decks can pull off some of the most powerful combos in the game with the right setup.

When building your deck, try to stick to one or two Core types to keep your strategy focused. Mixing too many Cores can leave you without the right cards at the right time.`
  },
  {
    id: 3,
    title: "Base Set Spotlight: Top 5 Cards to Watch",
    date: "2026-03-15",
    author: "Byteforms Team",
    tags: ["Strategy", "Card Spotlight"],
    summary: "Five Base Set cards that are making waves in the competitive scene right now.",
    content: `The Base Set has been out for a while now and the meta is starting to take shape. Here are five cards you should be keeping an eye on:

**1. Ashnet** — A staple Firewire Basic that applies Overheat on attack. Simple, effective, and a great turn-one play.

**2. Neuroclaw** — This Psycore card lets you reposition programs whenever you draw a card, creating some wild board states.

**3. Pomswirl** — Suspend it to search for a Peripheral card. Incredible consistency tool for any deck running Peripherals.

**4. Cerebrawl** — Applying Packet Loss when it attacks makes this Psycore card a nightmare for hand-heavy decks.

**5. Pyrexel** — A defensive Firewire Basic that punishes attackers while suspended. Great for slowing down aggressive openers.

Keep these cards in mind when building your deck or preparing for your next match!`
  }
]

function BlogPost({ post, onBack }) {
  return (
    <div className="blog-post-full">
      <button className="blog-back-btn" onClick={onBack}>← Back to Blog</button>
      <div className="blog-post-tags">
        {post.tags.map((t, i) => <span className="blog-tag" key={i}>{t}</span>)}
      </div>
      <h1 className="blog-post-title">{post.title}</h1>
      <div className="blog-post-meta">{post.date} · {post.author}</div>
      <div className="blog-post-body">
        {post.content.split("\n\n").map((para, i) => {
          // Bold **text** support
          const parts = para.split(/\*\*(.*?)\*\*/g)
          return (
            <p key={i}>
              {parts.map((part, j) =>
                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
              )}
            </p>
          )
        })}
      </div>
    </div>
  )
}

function Blog() {
  const [activePost, setActivePost] = useState(null)
  const [activeTag, setActiveTag] = useState("All")

  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap(p => p.tags)))]
  const filtered = activeTag === "All" ? blogPosts : blogPosts.filter(p => p.tags.includes(activeTag))

  if (activePost) return <BlogPost post={activePost} onBack={() => setActivePost(null)} />

  return (
    <div className="blog-page">
      <h1 className="blog-heading">Byteforms Blog</h1>

      <div className="blog-tag-filter">
        {allTags.map((tag, i) => (
          <button
            key={i}
            className={`blog-tag-btn ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="blog-list">
        {filtered.map(post => (
          <div className="blog-card" key={post.id} onClick={() => setActivePost(post)}>
            <div className="blog-card-tags">
              {post.tags.map((t, i) => <span className="blog-tag" key={i}>{t}</span>)}
            </div>
            <h2 className="blog-card-title">{post.title}</h2>
            <div className="blog-card-meta">{post.date} · {post.author}</div>
            <p className="blog-card-summary">{post.summary}</p>
            <span className="blog-read-more">Read more →</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog
