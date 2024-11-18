import { getDeadlinePassed, getDeadlineNear } from "../lib/pq"

export const Notice = async () => {
  const should_return = await getDeadlinePassed();
  const near_return = await getDeadlineNear();
  return (
    <>
      <p>should return</p>
      <ul>
        {should_return?.rows.map((value) => (
          <li key={value.id}>
            <p>
              {value.id}
            </p>
          </li>
        ))}
      </ul>
      <p>near return</p>
      <ul>
        {near_return?.rows.map((value) => (
          <li key={value.id}>
            <p>
              {value.id}
            </p>
          </li>
        ))}
      </ul>
    </>
  )
}
