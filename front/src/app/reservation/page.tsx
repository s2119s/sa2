import Link from "next/link";
import { AvalablePCsList, Sorting } from "./components";

export default function Reservation() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Link href={"/"}>
        <button
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          戻る
        </button>
      </Link>

      <AvalablePCsList sorting={Sorting.Recomend}></AvalablePCsList>
    </div>
  );
}
