import imgLogo from "/dist/assets/HLA_logo.png"

function Header() {
    return (
        <header>
            <img src={imgLogo} height={75} />
            <h1>MEMORY GAME</h1>
        </header>
    );
}

export default Header;