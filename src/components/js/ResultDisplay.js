import React from "react";
import "../css/ResultDisplay.css"; // 선택: 스타일 분리 가능

export default function ResultDisplay({ resultList, onNext }) {
  if (!resultList || resultList.length === 0) return null;

  return (
    <div className="quiz-result">
      <h3>결과</h3>
      <ul>
        {resultList.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
      <button onClick={onNext}>다음 문제</button>
    </div>
  );
}
