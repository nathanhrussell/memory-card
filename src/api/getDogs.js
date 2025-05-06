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

function shuffle(array) {
    return array
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);
}

function formatBreedNameFromUrl(url) {
    const parts = url.split("/");
    const breedIndex = parts.indexOf("breeds") + 1;
    const breedPath = parts[breedIndex];

    if (breedNameOverrides[breedPath]) {
        return breedNameOverrides[breedPath];
    }

    return breedPath
        .split("-")
        .map((part) => 
            part
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/^./, (c) => c.toUpperCase())
        )
        .join(" ");
}