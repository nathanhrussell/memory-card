function Card({ id, image, caption, onClick }) {
    return (
        <div
            onClick={() => onClick(id)}
            className="bg-white shadow rounded overflow-hidden cursor-pointer transform hover:scale-105 transition"
        >
            <img src={image} alt={caption} className="w-full h-48 object-contain bg-white" />
            <p className="p-2 text-center text-sm text-gray-800 font-medium">
                {caption}
            </p>
        </div>
    );
}

export default Card;