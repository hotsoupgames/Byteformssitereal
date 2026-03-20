import "../css/Home.css"

function Home(){

    return(
        <div className="home-page-div">
            <div>
                <h1 className="home-header">Dive into the world of Byteforms TCG!</h1>
            </div>
            <div className="discord-div">
                <h1> Join the Discord: </h1>
                <iframe className="discord-widget" src="https://discord.com/widget?id=1362515901961998426&theme=dark" allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
        </div>
    )

}

export default Home