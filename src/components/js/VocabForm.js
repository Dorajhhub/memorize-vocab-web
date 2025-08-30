import React, { useState } from "react";
import { createVocabFromState } from "../../utils/vocab";
import "../css/VocabForm.css"; // 선택: 스타일 분리 가능

export default function VocabForm({ onAdd }) {
  const [form, setForm] = useState({
    word: "",
    meaning: "",
    nounForm: "",
    adjForm: "",
    advForm: "",
    synonyms: "",
    antonyms: "",
    plusWord: "",
    plusMeaning: "",
    exampleSentence: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVocab = createVocabFromState(form);
    onAdd(newVocab); // 부모 컴포넌트에서 vocabList에 추가
    setForm({
      word: "",
      meaning: "",
      nounForm: "",
      adjForm: "",
      advForm: "",
      synonyms: "",
      antonyms: "",
      plusWord: "",
      plusMeaning: "",
      exampleSentence: "",
    });
  };

  return (
    <form className="vocab-form" onSubmit={handleSubmit}>
      <h3>✍️ 단어 추가</h3>
      <input
        name="word"
        value={form.word}
        onChange={handleChange}
        placeholder="단어"
      />
      <input
        name="meaning"
        value={form.meaning}
        onChange={handleChange}
        placeholder="뜻 (;로 구분)"
      />
      <input
        name="nounForm"
        value={form.nounForm}
        onChange={handleChange}
        placeholder="명사형 (;로 구분)"
      />
      <input
        name="adjForm"
        value={form.adjForm}
        onChange={handleChange}
        placeholder="형용사형 (;로 구분)"
      />
      <input
        name="advForm"
        value={form.advForm}
        onChange={handleChange}
        placeholder="부사형 (;로 구분)"
      />
      <input
        name="synonyms"
        value={form.synonyms}
        onChange={handleChange}
        placeholder="동의어 (;로 구분)"
      />
      <input
        name="antonyms"
        value={form.antonyms}
        onChange={handleChange}
        placeholder="반의어 (;로 구분)"
      />
      <input
        name="plusWord"
        value={form.plusWord}
        onChange={handleChange}
        placeholder="연관 단어"
      />
      <input
        name="plusMeaning"
        value={form.plusMeaning}
        onChange={handleChange}
        placeholder="연관 뜻 (;로 구분)"
      />
      <textarea
        name="exampleSentence"
        value={form.exampleSentence}
        onChange={handleChange}
        placeholder="예문"
      />
      <button type="submit">추가하기</button>
    </form>
  );
}
