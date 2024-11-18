import Link from "next/link";
import { AvalablePCsList, Sorting } from "./components";

export default function Reservation() {
  // this component can reserve pc
  // and check pc availability

  return (
    <>
      <Link href={"/"}>back</Link>
      <AvalablePCsList sorting={Sorting.Recomend}></AvalablePCsList>
    </>
  )
}
