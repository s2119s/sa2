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
