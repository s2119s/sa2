import { getDeadlinePassed2, getDeadlinePassed, getDeadlineNear,getDeadlineNear2 } from "../lib/pq";

export const Notice = async () => {
  const should_return = await getDeadlinePassed();
  const should_return2 = await getDeadlinePassed2();
  const near_return = await getDeadlineNear();
  const near_return2 = await getDeadlineNear2();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <section style={{ marginBottom: "40px" }}>
        <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>期限切れ</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {should_return?.rows.map((value) => (
            <li
              key={value.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p style={{ fontWeight: "bold", margin: 0 }}>PC 名: {value.name}</p>
              {should_return2?.rows
                .filter((res) => res.pc_id === value.id)
                .map((res) => (
                  <p key={res.id} style={{ margin: "5px 0 0 0", color: "#666" }}>
                    終了時間: {new Date(res.end_timestamp).toLocaleString()}
                  </p>
                ))}
            </li>
          ))}
        </ul>
      </section>

      <section>
      <h2 style={{ borderBottom: "2px solid #ccc", paddingBottom: "10px" }}>期限が近い</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {near_return?.rows.map((value) => (
            <li
              key={value.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p style={{ fontWeight: "bold", margin: 0 }}>PC 名: {value.name}</p>
              {near_return2?.rows
                .filter((res) => res.pc_id === value.id)
                .map((res) => (
                  <p key={res.id} style={{ margin: "5px 0 0 0", color: "#666" }}>
                    終了時間: {new Date(res.end_timestamp).toLocaleString()}
                  </p>
                ))}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
