import { useEffect, useState } from "react";

export default function UserBadge() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!user) return null;

  const firstChar = user.name?.charAt(0).toUpperCase() || "?";

  return (
    <div style={styles.container}>
      {/* Avatar */}
      <div style={styles.avatar}>
        {firstChar}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 20,
    color: "white",
    boxShadow: "0 6px 16px rgba(139,92,246,0.6)",
  }
};
