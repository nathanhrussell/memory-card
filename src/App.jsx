import { useEffect, useState } from "react";
import { getDogs } from "./api/getDogs";
import Card from "./components/Card";

function App() {
  const [dogs, setDogs] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    getDogs()
      .then(setDogs)
      .catch((err) => console.error("Error fetching dogs:", err));
  }, []);

  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {

      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setClickedCards([]);
    } else {

      setClickedCards([...clickedCards, id]);
      setCurrentScore(currentScore + 1);
    }
  
    setDogs(shuffle([...dogs]));
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
