// src/utils/vocab.js

export function createVocabFromState(state) {
  return {
    word: state.word.trim(),
    meaning: state.meaning.trim().split(";"),
    nounForm: state.nounForm.trim().split(";"),
    adjForm: state.adjForm.trim().split(";"),
    advForm: state.advForm.trim().split(";"),
    synonyms: state.synonyms.trim().split(";"),
    antonyms: state.antonyms.trim().split(";"),
    plusWord: state.plusWord.trim(),
    plusMeaning: state.plusMeaning.trim().split(";"),
    exampleSentence: state.exampleSentence.trim(),
  };
}

// ✅ 더 이상 vocabList는 여기서 export하지 않음
