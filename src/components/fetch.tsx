import { fetchMarvelCharacters } from "../services/api";

async function FetchMarvel() {
  try {
    await fetchMarvelCharacters("spider");
    console.log("Marvel API call completed");
  } catch (error) {
    console.error("Error fetching Marvel characters:", error);
  }
  
  return null;
}

export default FetchMarvel;
