import "../css/Header.css"
import byteforms from "../assets/byteforms-banner.png"
import { Link } from "react-router-dom"
function Header(){

    return (
        <div className="header">
            <Link to="/" className="nav-link">
                <img src={byteforms} className="byteforms-banner"/>
            </Link>
            <div className="nav-links">
                <Link to="/playing" className="nav-link">
                    <p>How to Play |</p>
                </Link>
                <Link to="/cards" className="nav-link">
                    <p>Card Database</p>
                </Link>
            </div>
        </div>
    )

}
export default Header