import { getDeadlinePassed, getDeadlineNear } from "../lib/pq"

export const Notice = async () => {
  const should_return = await getDeadlinePassed();
  const near_return = await getDeadlineNear();
  return (
    <>
      <p>
        {should_return as string | undefined}
      </p>
      <p>
        {near_return as string | undefined}
      </p>
    </>
  )
}
