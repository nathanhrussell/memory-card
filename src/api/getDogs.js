import { all } from "axios";

const breedNameOverrides = {
    cotondetulear: "Coton de Tulear",
    mexicanhairless: "Mexican Hairless",
  };
  

export async function getDogs(count = 12) {
    const breedListRes = await fetch("https://dog.ceo/api/breeds/list/all");
    const breedListData = await breedListRes.json();
    const allBreeds = Object.keys(breedListData.message);

    const selectedBreeds = shuffle(allBreeds).slice(0, count);

    const dogPromises = selectedBreeds.map(async (breed) => {
        const res = await fetch (`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await res.json();
        return {
            id: data.message,
            image: data.message,
            caption: formatBreedNameFromUrl(data.message),
        };
    });

    return Promise.all(dogPromises);
}

export function shuffle(array) {
    return array
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);
}

function formatBreedNameFromUrl(url) {
    const parts = url.split("/");
    const breedIndex = parts.indexOf("breeds") + 1;
    const breedPath = parts[breedIndex]; // e.g. "bulldog-boston"
  
    // Use override if available
    if (breedNameOverrides[breedPath]) {
      return breedNameOverrides[breedPath];
    }
  
    const nameParts = breedPath.split("-");
  
    // Reverse sub-breed order if there are 2 parts
    const formatted = nameParts.length === 2
      ? [nameParts[1], nameParts[0]]
      : nameParts;
  
    return formatted
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }
  