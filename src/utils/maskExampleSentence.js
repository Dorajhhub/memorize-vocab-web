/**
 * 예문에서 랜덤 단어를 빈칸으로 마스킹하고, HTML과 정답 목록을 반환
 * @param {string} sentence - 원본 예문
 * @param {number} maxBlanks - 최대 빈칸 수 (기본값: 4)
 * @returns {{ html: string, blanks: Array<{ id: string, answer: string }> }}
 */
export function maskExampleSentence(sentence, maxBlanks = 4) {
  if (!sentence || typeof sentence !== "string")
    return { html: "", blanks: [] };

  // 단어, 기호, 공백을 분리
  const tokens = sentence.match(/\w+|[^\w\s]+|\s+/g) || [];

  // 마스킹 대상 단어 인덱스 추출 (길이 2 이상)
  const wordIndexes = tokens
    .map((t, i) => (/\w+/.test(t) && t.length > 2 ? i : null))
    .filter((i) => i !== null);

  const blanks = [];
  const selected = new Set();

  // 랜덤으로 maxBlanks개 선택
  while (selected.size < Math.min(maxBlanks, wordIndexes.length)) {
    const rand = wordIndexes[Math.floor(Math.random() * wordIndexes.length)];
    selected.add(rand);
  }

  // 선택된 단어를 <input>으로 마스킹
  Array.from(selected).forEach((i, idx) => {
    const id = `blank-${idx}`;
    const answer = tokens[i];
    blanks.push({ id, answer });
    tokens[
      i
    ] = `<input type="text" id="${id}" class="blank-input" data-answer="${answer}" autocomplete="off" />`;
  });

  return {
    html: tokens.join(""),
    blanks,
  };
}
