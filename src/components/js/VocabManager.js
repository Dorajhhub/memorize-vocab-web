import React, { useState } from "react";
import { saveVocabToFile, loadVocabFromFile } from "../../utils/storage";
import "../../App.css";

export default function VocabManager({ vocabList, setVocabList }) {
  const [fileName, setFileName] = useState("vocab-data.json");

  const handleSave = () => {
    if (!vocabList || vocabList.length === 0) {
      alert("저장할 단어장이 없습니다.");
      return;
    }
    saveVocabToFile(vocabList, fileName);
  };

  const handleLoad = (e) => {
    const file = e.target.files[0];
    loadVocabFromFile(
      file,
      (data) => {
        setVocabList(data);
        alert("단어장이 성공적으로 불러와졌습니다!");
      },
      (errorMsg) => {
        alert(errorMsg);
      }
    );
  };

  return (
    <div className="vocab-manager">
      <h3>📁 단어장 관리</h3>
      <input
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="파일 이름"
      />
      <button onClick={handleSave}>단어장 저장</button>
      <input type="file" accept="application/json" onChange={handleLoad} />
    </div>
  );
}
