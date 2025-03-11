import { fetchCharacterNames } from "../services/api";

async function FetchMarvel() {
  try {
    const names = await fetchCharacterNames("spider");
    console.log("Marvel API call completed");
    console.log(names);
  } catch (error) {
    console.error("Error fetching Marvel characters:", error);
  }
  
  return null;
}

export default FetchMarvel;
