import { all } from "axios";

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
            caption: formatBreedName(breed),
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

function formatBreedName(breed) {
    return breed
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");
}