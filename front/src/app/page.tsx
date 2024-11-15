import Image from "next/image";
import styles from "./page.module.css";
import PQDebug from "./components/pqdebug";
import { Notice } from "./return/components";
import { AvalablePCs } from "./reservation/components";

export default function Home() {
  return (
    <main>
      <Notice></Notice>
      <AvalablePCs></AvalablePCs>
    </main>
  );
}
