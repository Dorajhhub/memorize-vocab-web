import React, { useState, useEffect } from "react";
import { maskExampleSentence } from "../../utils/maskExampleSentence";

export default function QuizModal({ vocab, onNext, onClose }) {
  const [blanks, setBlanks] = useState([]);
  const [maskedHTML, setMaskedHTML] = useState("");
  const [result, setResult] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (vocab?.exampleSentence) {
      const { html, blanks } = maskExampleSentence(vocab.exampleSentence);
      setMaskedHTML(html);
      setBlanks(blanks);
    }
  }, [vocab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = [];

    const check = (id, correct) => {
      const input = document.getElementById(id)?.value.trim();
      if (!correct) {
        res.push(`⚠️ ${id}: 정답 없음`);
        return;
      }

      if (Array.isArray(correct)) {
        const match = correct.some(
          (c) =>
            typeof c === "string" && c.toLowerCase() === input.toLowerCase()
        );
        res.push(
          match
            ? `✅ ${id}: 정답`
            : `❌ ${id}: 오답 (정답: ${correct.join(", ")})`
        );
      } else {
        res.push(
          input.toLowerCase() === correct.toLowerCase()
            ? `✅ ${id}: 정답`
            : `❌ ${id}: 오답 (정답: ${correct})`
        );
      }
    };

    check("quiz-word", vocab.word);
    check("quiz-noun", vocab.nounForm);
    check("quiz-adj", vocab.adjForm);
    check("quiz-adv", vocab.advForm);
    check("quiz-syn", vocab.synonyms);
    check("quiz-ant", vocab.antonyms);
    check("quiz-plus-word", vocab.plusWord);
    check("quiz-plus-meaning", vocab.plusMeaning);

    blanks.forEach(({ id, answer }, idx) => {
      const input = document.getElementById(id)?.value.trim();
      res.push(
        input.toLowerCase() === answer.toLowerCase()
          ? `✅ 예문 ${idx + 1}: 정답`
          : `❌ 예문 ${idx + 1}: 오답 (정답: ${answer})`
      );
    });

    setResult(res);
    setSubmitted(true);
  };

  return (
    <div className="quiz-modal">
      <h2>퀴즈 문제</h2>
      <p>
        뜻:{" "}
        {Array.isArray(vocab.meaning)
          ? vocab.meaning.join(", ")
          : vocab.meaning}
      </p>

      <form id="quiz-form" onSubmit={handleSubmit}>
        <input type="text" id="quiz-word" placeholder="단어" />
        <input type="text" id="quiz-noun" placeholder="명사형" />
        <input type="text" id="quiz-adj" placeholder="형용사형" />
        <input type="text" id="quiz-adv" placeholder="부사형" />
        <input type="text" id="quiz-syn" placeholder="동의어" />
        <input type="text" id="quiz-ant" placeholder="반의어" />
        <input type="text" id="quiz-plus-word" placeholder="연관 단어" />
        <input type="text" id="quiz-plus-meaning" placeholder="연관 뜻" />

        <div
          className="example-sentence"
          dangerouslySetInnerHTML={{ __html: maskedHTML }}
        />

        <button type="submit">제출</button>
      </form>

      {submitted && (
        <div className="quiz-result">
          {result.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
          <button onClick={onNext}>다음 문제</button>
        </div>
      )}

      <button onClick={onClose}>퀴즈 종료</button>
    </div>
  );
}
