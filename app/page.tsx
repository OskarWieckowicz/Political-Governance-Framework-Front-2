import TaxesDashboard from "./components/TaxesDashboard";
import styles from "./page.module.css";
import Signin from "./components/Signin";
export default function Home() {
  return (
    <main className={styles.main}>
      <TaxesDashboard />
    </main>
  );
}
