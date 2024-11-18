import Link from "next/link"
import { getAvailable, getQuery } from "../lib/pq"

export const AvalablePCs = async () => {
  const available = await getAvailable() //TODO get more good pc

  return (
    <>
      Recomended PCs
      <ul>
        {available?.slice(0, 4).map((value) => (
          <li key={value.id}>
            {value.name}
            <Link href={"reservation/" + value.id}>reserve</Link>
          </li>
        ))}
      </ul>
      <Link href={"/reservation"}>see more</Link>
    </>
  )
}

export const enum Sorting {
  Recomend,
  Name,
}

interface Props {
  sorting: Sorting

  from_timestamp?: Date
  to_timestamp?: Date
}

export const AvalablePCsList = async ({ sorting, from_timestamp, to_timestamp }: Props) => {
  const available = await getAvailable() //TODO get more good pc
  const result = await getQuery("SELECT * FROM PCs ORDER BY name DESC;")

  return (
    <>
      <div>
        <ul> {result?.rows.map((value) => (
          <li key={value.id}>
            <p>{value.name}</p>
            <Link href={"/reservation/" + value.id}>reserve</Link>
          </li>
        ))}
        </ul>
      </div>
    </>
  )
}
