import './NavBar.css';

export default function NavBar() {
    return (
        <nav class="navbar">
            <a href="/" id="sitetitle">Music&You</a>
            <ul>
                <CustomLink href="/">Home</CustomLink>
                <CustomLink href="/artists">Artists</CustomLink>
                <CustomLink href="/albums">Albums</CustomLink>
                <CustomLink href="/songs">Songs</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname;

    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>{children}</a>
        </li>
    );
}