import "../css/Playing.css"
import Pdf from "/src/assets/byteforms_rule_book.pdf"

function Playing(){

    return(
        <div className="playing-header">
            <a href={Pdf}>Click here for the rules!</a>
        </div>
    )

}

export default Playing