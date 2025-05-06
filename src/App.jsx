import { useEffect, useState } from "react";
import { getDogs } from "./api/getDogs";
import Card from "./components/Card";

function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    getDogs()
      .then(setDogs)
      .catch((err) => console.error("Error fetching dogs:", err));
  }, []);

  const handleCardClick = (id) => {
    console.log("Clicked card:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🐶 Dog Breed Memory Game 🐶</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {dogs.map((dog) => (
          <Card
            key={dog.id}
            id={dog.id}
            image={dog.image}
            caption={dog.caption}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
