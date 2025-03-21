export default function Album({ title, songsList }) {
    return (
        <div>
            <h4>Album: {title}</h4>
            <ul>{songsList}</ul>
        </div>
    );
}