function Card({ id, image, caption, onClick }) {
    return (
        <div
            onClick={() => onClick(id)}
            className="bg-white shadow rounded overflow-hidden cursor-pointer transform hover:scale-105 transition"
        >
            <img src={image} alt={caption} className="w-full h-40 object-cover" />
        </div>
    );
}

export default Card;