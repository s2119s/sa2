import {
  addReservation,
  getPCfromUUID,
  getReservationsfromUUID,
  removeReservation,
} from "@/app/lib/pq";
import { redirect } from "next/navigation";
import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { uuid: string } }) {
  const pc = await getPCfromUUID(params.uuid);
  const reservations = await getReservationsfromUUID(params.uuid);

  const addButton = async (data: FormData) => {
    "use server";
    const start = data.get("start")?.toString();
    const end = data.get("end")?.toString();

    if (!start || !end) return;

    const start_date = new Date(start);
    const end_date = new Date(end);

    if (isNaN(start_date.getTime()) || isNaN(end_date.getTime())) return;

    const supabase = await createClient();
    const { data: udata, error } = await supabase.auth.getUser();

    if (error || !udata?.user) {
      redirect("/login");
      return;
    }

    const result = await addReservation(params.uuid, udata.user.id, start_date, end_date);
    console.log(result);
    redirect("/reservation/" + params.uuid);
  };

  const removeButton = async (reserve_id: string) => {
    "use server";
    const result = await removeReservation(reserve_id);
    console.log(result);
    redirect("/reservation/" + params.uuid);
  };

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(currentDate.getDate() + 14);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = "00";
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Link href="/reservation">
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

      <h2 style={{ marginBottom: "20px" }}>PC情報</h2>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{pc?.rows[0]?.name}</p>

      <section style={{ marginBottom: "40px" }}>
        <h3>予約を追加</h3>
        <form action={addButton} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            name="start"
            type="datetime-local"
            step="3600"
            placeholder="yyyy/mm/dd hh"
            min={formatDate(currentDate)}
            max={formatDate(maxDate)}
            style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <input
            name="end"
            type="datetime-local"
            step="3600"
            placeholder="yyyy/mm/dd hh"
            min={formatDate(currentDate)}
            max={formatDate(maxDate)}
            style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            予約する
          </button>
        </form>
      </section>

      <section>
        <h3>既存の予約</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {reservations?.rows.map((reservation) => (
            <li
              key={reservation.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p>
                開始時間: {new Date(reservation.start_timestamp).toLocaleString()}
              </p>
              <p>
                終了時間: {new Date(reservation.end_timestamp).toLocaleString()}
              </p>
              <form
                action={async () => {
                  "use server";
                  await removeButton(reservation.id);
                }}
                style={{ marginTop: "10px" }}
              >
                <button
                  type="submit"
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  削除
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
