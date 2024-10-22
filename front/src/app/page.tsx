import Image from "next/image";
import styles from "./page.module.css";
import PQDebug from "./components/pqdebug";

export default function Home() {
  return (
    <main>
      <PQDebug></PQDebug>
    </main>
  );
}
