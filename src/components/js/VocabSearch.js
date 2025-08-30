import React from "react";

export default function VocabSearch({ query, setQuery }) {
  return (
    <div className="vocab-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 단어 검색"
      />
    </div>
  );
}
