import './NavBar.css';

export default function NavBar() {
    return (
        <nav class="navbar">
            <a href="/" id="sitetitle">Music&You</a>
            <ul>
                <li className="active"><a href="/artists">Home</a></li>
                <li><a href="/artists">Artists</a></li>
                <li><a href="/albums">Albums</a></li>
                <li><a href="/songs">Songs</a></li>
            </ul>
        </nav>
    );
}