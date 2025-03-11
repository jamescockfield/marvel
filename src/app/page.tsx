import styles from "./page.module.css";
import { CharacterInput } from "../components/CharacterInput";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CharacterInput />
      </main>
    </div>
  );
}
