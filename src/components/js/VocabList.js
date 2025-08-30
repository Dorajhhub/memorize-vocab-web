import React from "react";
import "../css/VocabList.css"; // 선택: 스타일 분리 가능

export default function VocabList({ vocabList }) {
  if (!vocabList || vocabList.length === 0) {
    return <p>📭 단어장이 비어 있습니다.</p>;
  }

  return (
    <div className="vocab-list">
      <h3>📚 단어장 목록</h3>
      <ul>
        {vocabList.map((vocab, idx) => (
          <li key={idx}>
            <strong>{vocab.word}</strong> —{" "}
            {Array.isArray(vocab.meaning)
              ? vocab.meaning.join(", ")
              : vocab.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}
