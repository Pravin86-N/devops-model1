import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchShows = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();

      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h2>Search Shows</h2>

      <form onSubmit={searchShows} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search show..."
          style={{ flex: 1, padding: "10px", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {results.map((item) => {
          const show = item.show;
          return (
            <div key={show.id} style={{ border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden" }}>
              <img
                src={show.image?.medium || "https://via.placeholder.com/210x295?text=No+Image"}
                alt={show.name}
                style={{ width: "100%", height: "260px", objectFit: "cover" }}
              />
              <div style={{ padding: "10px" }}>
                <h4>{show.name}</h4>
                <p>{show.premiered || "Unknown year"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
