import styles from "./page.module.css";
import { CharacterSearch } from "../components/CharacterSearch";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CharacterSearch />
      </main>
    </div>
  );
}
