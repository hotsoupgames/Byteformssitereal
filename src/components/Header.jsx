import "../css/Header.css"
import byteforms from "../assets/byteforms-banner.png"
import { Link, useLocation } from "react-router-dom"

function Header(){
    const location = useLocation()

    const navLinks = [
        { to: "/playing", label: "How to Play" },
        { to: "/cards", label: "Card Database" },
        { to: "/deckbuilder", label: "Deck Builder" },
        { to: "/blog", label: "Blog" },
        { to: "/products", label: "Products" },
    ]

    return (
        <div className="header">
            <Link to="/" className="nav-link">
                <img src={byteforms} className="byteforms-banner" alt="Byteforms TCG"/>
            </Link>
            <div className="nav-links">
                {navLinks.map((link, i) => (
                    <Link
                        key={i}
                        to={link.to}
                        className={`nav-link${location.pathname === link.to ? " nav-link-active" : ""}`}
                    >
                        <p>{link.label}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Header
