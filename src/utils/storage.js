// 저장: 단어 리스트를 JSON 파일로 다운로드
export function saveVocabToFile(vocabList, filename = "vocab-data.json") {
  const dataStr = JSON.stringify(vocabList, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

// 불러오기: 파일 input 이벤트에서 단어 리스트 추출
export function loadVocabFromFile(file, onSuccess, onError) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        onSuccess(data); // 단어 리스트 상태 업데이트
      } else {
        onError("올바른 JSON 형식이 아닙니다.");
      }
    } catch (err) {
      onError("파일을 읽는 중 오류가 발생했습니다.");
    }
  };
  reader.readAsText(file);
}
