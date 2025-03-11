import styles from "./page.module.css";
import FetchMarvel from "../components/fetch";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FetchMarvel />
      </main>
    </div>
  );
}
