import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TestAPI() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    let cancelled = false; 

    const fetchRoot = async () => {
      try {
        const res = await axios.get("http://localhost:5000/"); 
        if (!cancelled) setMessage(String(res.data));
      } catch (err) {
        
        console.error("TestAPI error:", err);
        const friendly =
          err?.response?.data?.message ?? err?.message ?? "Unknown error";
        if (!cancelled) setMessage(`Error: ${friendly}`);
      }
    };

    fetchRoot();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui" }}>
      <strong>Backend response:</strong> <span>{message}</span>
    </div>
  );
}
