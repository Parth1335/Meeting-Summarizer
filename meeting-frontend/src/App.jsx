import { useState } from "react";
import axios from "axios";

function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState("");

  const generateSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/generate`, {
        transcript,
        prompt,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      alert("Error generating summary");
    } finally {
      setLoading(false);
    }
  };

  const Share= async () => {
    try { const res = await fetch(`${import.meta.env.VITE_API_URL}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summary,
        email: recipients.trim() 
      }),
    });

    const data = await res.json();
    alert(data.message || "Summary shared successfully!");}
    catch (err) {
      console.error(err);
      alert("Error sharing summary");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>AI Meeting Summarizer</h1>

      <textarea
        rows="6"
        placeholder="Paste your transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="text"
        placeholder="Enter custom instruction (e.g., Summarize in bullets)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={generateSummary} disabled={loading}>
        {loading ? "Generating..." : "Generate Summary"}
      </button>

      <input type="text" placeholder="Enter recipient emails (comma separated)" value={recipients} onChange={(e) => setRecipients(e.target.value)} style={{ width: "100%", marginTop: "10px", marginBottom: "10px" }}/>

      <button onClick={Share} className="bg-blue-500 text-white px-4 py-2 rounded"  disabled={!summary}> Share Summary</button>
      {summary && (
        <>
          <h2>Generated Summary</h2>
          <textarea
            rows="6"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={{ width: "100%" }}
          />
        </>
      )}
    </div>
  );
}

export default App;
