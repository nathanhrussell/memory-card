function Card({ id, image, caption, onClick }) {
    return (
      <div
        onClick={() => onClick(id)}
        className="bg-white shadow rounded overflow-hidden cursor-pointer transform hover:scale-105 transition flex flex-col"
      >
        <div className="h-48 bg-white flex items-center justify-center relative">
          <img
            src={image}
            alt={caption}
            className="absolute h-full w-full object-cover"
          />
        </div>
  
        <p className="p-2 text-center text-sm text-gray-800 font-medium">
          {caption}
        </p>
      </div>
    );
  }
  
  export default Card;