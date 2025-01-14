import React from "react";

const pcs = [
  {
    name: "Microsoft Surface Laptop Go 2",
    specs: {
      monitor: "12.4インチ",
      cpu: "Intel Core i5",
      memory: "8GB RAM",
      storage: "128GB SSD",
    },
    image: "", // PCの写真ファイルのパスをここに入力
    link: "",
  },
  {
    name: "Lenovo IdeaPad Slim 370i 82RK00BCJP",
    specs: {
      monitor: "14インチ",
      cpu: "Intel Core i3",
      memory: "8GB RAM",
      storage: "256GB SSD",
    },
    image: "", // PCの写真ファイルのパスをここに入力
    link: "",
  },
  {
    name: "HP Spectre x360 6F8L0PA-AAAB",
    specs: {
      monitor: "13.5インチ",
      cpu: "Intel Core i7",
      memory: "16GB RAM",
      storage: "512GB SSD",
    },
    image: "", // PCの写真ファイルのパスをここに入力
    link: "",
  },
  {
    name: "dynabook C7 P2C7VBEL",
    specs: {
      monitor: "15.6インチ",
      cpu: "AMD Ryzen 5",
      memory: "8GB RAM",
      storage: "256GB SSD",
    },
    image: "", // PCの写真ファイルのパスをここに入力
    link: "",
  },
  {
    name: "ASUS TUF Dash F15 FX517ZC",
    specs: {
      monitor: "15.6インチ",
      cpu: "Intel Core i7",
      memory: "16GB RAM",
      storage: "512GB SSD、NVIDIA RTX 3050",
    },
    image: "", // PCの写真ファイルのパスをここに入力
    link: "",
  },
];

const PCList = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>PC一覧</h1>
      <ul style={styles.list}>
        {pcs.map((pc, index) => (
          <li key={index} style={styles.item}>
            <div style={styles.content}>
              <div style={styles.text}>
                <h2 style={styles.name}>{pc.name}</h2>
                <p style={styles.specs}>
                  モニターサイズ：{pc.specs.monitor}
                  <br />
                  CPU：{pc.specs.cpu}
                  <br />
                  メモリ：{pc.specs.memory}
                  <br />
                  ストレージ：{pc.specs.storage}
                </p>
                <a
                  href={pc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  商品ページ
                </a>
              </div>
              <div style={styles.imageContainer}>
                {pc.image ? (
                  <img
                    src={pc.image}
                    alt={`${pc.name}の画像`}
                    style={styles.image}
                  />
                ) : (
                  <div style={styles.placeholder}>
                    <p>画像がありません</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    padding: "15px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    flex: 1,
    paddingRight: "20px",
  },
  imageContainer: {
    flex: "0 0 150px", // 固定幅の領域を設定
    textAlign: "center",
  },
  image: {
    maxWidth: "100%",
    borderRadius: "5px",
  },
  placeholder: {
    width: "150px",
    height: "150px",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    fontSize: "14px",
    color: "#888",
  },
  name: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  specs: {
    fontSize: "14px",
    marginBottom: "10px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default PCList;
