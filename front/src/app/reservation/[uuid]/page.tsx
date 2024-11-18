import { addReservation, getPCfromUUID, getReservationsfromUUID, removeReservation } from "@/app/lib/pq"
import { redirect } from "next/navigation";
import { createClient } from '@/app/utils/supabase/server'
import Link from "next/link"

export default async function Page({ params }: { params: { uuid: string } }) {
  const pc = await getPCfromUUID(params.uuid);
  const reservetions = await getReservationsfromUUID(params.uuid);

  const addButton = async (data: FormData) => {
    "use server"
    const start = data.get("start")?.toString()
    const end = data.get("end")?.toString()

    if (start === undefined || end === undefined) {
      return
    }

    const start_date = new Date(start)
    const end_date = new Date(end)

    const supabase = await createClient()
    const { data: udata, error } = await supabase.auth.getUser()
    if (error || !udata?.user) {
      redirect('/login')
    }

    const result = await addReservation(params.uuid, udata.user.id, start_date, end_date)
    console.log(result)
    redirect("/reservation/" + params.uuid)
  }

  const removeButton = async (reserve_id: string) => {
    "use server"
    const result = await removeReservation(reserve_id)
    console.log(result)
    redirect("/reservation/" + params.uuid)
  }

  return (
    <>
      <Link href={"/reservation"}>back</Link>
      <p>hello, {params.uuid}</p>
      <p>{pc?.rows[0].name}</p>
      <form action={addButton}>
        <input name="start" type="datetime-local" step={3600} placeholder={"yyyy/mm/dd hh"} />
        <input name="end" type="datetime-local" step={3600} placeholder={"yyyy/mm/dd hh"} />
        <button>submit</button>
      </form>
      <ul>
        {reservetions?.rows.map((value) => (
          <li key={value.id}>
            <p>{value.start_timestamp.toString()}</p>
            <p>{value.end_timestamp.toString()}</p>
            <form action={async () => {
              'use server'
              await removeButton(value.id)
            }}>
              <button>remove</button>
            </form>
          </li>
        ))}
      </ul>
    </>
  )
}

