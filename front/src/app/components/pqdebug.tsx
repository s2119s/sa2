import { getRandomKey } from "../lib/pq"

export default async function PQDebug() {
  const result = await getRandomKey();
  console.log(result);
  return (
    <>aaa{result}</>
  )
}
