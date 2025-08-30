import React, { useState } from "react";
import QuizModal from "./components/js/QuizModal";
import ResultDisplay from "./components/js/ResultDisplay";
import VocabManager from "./components/js/VocabManager";
import VocabList from "./components/js/VocabList";
import VocabForm from "./components/js/VocabForm";
import VocabItem from "./components/js/VocabItem";
import VocabSearch from "./components/js/VocabSearch";
import "./App.css";

function App() {
  const [vocabList, setVocabList] = useState([]);
  const [quizQueue, setQuizQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const startQuiz = () => {
    if (vocabList.length === 0) {
      alert("단어장이 비어 있습니다.");
      return;
    }

    const shuffled = [...vocabList].sort(() => Math.random() - 0.5);
    setQuizQueue(shuffled);
    setCurrentIndex(0);
    setResult([]);
    setShowModal(true);
  };

  const nextQuiz = () => {
    if (currentIndex + 1 >= quizQueue.length) {
      alert("🎉 퀴즈 종료! 모든 문제를 풀었습니다.");
      closeQuiz();
    } else {
      setCurrentIndex(currentIndex + 1);
      setResult([]);
    }
  };

  const closeQuiz = () => {
    setShowModal(false);
  };

  const filteredList = vocabList.filter((v) =>
    v.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setVocabList(vocabList.filter((v) => v.id !== id));
  };

  const handleUpdate = (updatedVocab) => {
    setVocabList(
      vocabList.map((v) => (v.id === updatedVocab.id ? updatedVocab : v))
    );
  };

  const handleAdd = (newVocab) => {
    setVocabList([...vocabList, { ...newVocab, id: Date.now() }]);
  };

  return (
    <div className="App">
      <h1>📘 단어 외우기 웹</h1>
      <h3>Version 1.0.0</h3>

      {!showModal && (
        <>
          <button onClick={startQuiz}>퀴즈 시작</button>
          <VocabManager vocabList={vocabList} setVocabList={setVocabList} />

          {/* 검색창 */}
          <VocabSearch query={searchQuery} setQuery={setSearchQuery} />

          {/* 단어 목록 */}
          <div className="vocab-list">
            {filteredList.length === 0 ? (
              <p>등록된 단어가 없습니다.</p>
            ) : (
              filteredList.map((vocab) => (
                <VocabItem
                  key={vocab.id}
                  vocab={vocab}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            )}
          </div>

          {/* 단어 추가 폼 */}
          <VocabForm onAdd={handleAdd} />
        </>
      )}

      {/* 퀴즈 모달 */}
      {showModal && quizQueue.length > 0 && (
        <QuizModal
          vocab={quizQueue[currentIndex]}
          onNext={nextQuiz}
          onClose={closeQuiz}
          setResult={setResult}
        />
      )}

      {/* 퀴즈 결과 */}
      {result.length > 0 && (
        <ResultDisplay resultList={result} onNext={nextQuiz} />
      )}

      <h5>copyright© by jihu</h5>
    </div>
  );
}

export default App;
