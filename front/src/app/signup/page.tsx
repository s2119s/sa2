export default function Signup() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      fontFamily: "Arial, sans-serif", 
      textAlign: "center", 
      padding: "20px" 
    }}>
      <h1 style={{ color: "#28a745", marginBottom: "20px" }}>登録完了</h1>
      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        あなたのアカウントが登録されました。
      </p>
      <p style={{ fontSize: "16px", color: "#555" }}>
        メールボックスを確認してください。
      </p>
    </div>
  );
}
