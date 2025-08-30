import React, { useState } from "react";

export default function VocabItem({ vocab, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...vocab });

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(editForm);
    setIsEditing(false);
  };

  return (
    <div className="vocab-card">
      {isEditing ? (
        <div className="edit-section">
          <input name="word" value={editForm.word} onChange={handleChange} />
          <input
            name="meaning"
            value={editForm.meaning}
            onChange={handleChange}
          />
          <textarea
            name="exampleSentence"
            value={editForm.exampleSentence}
            onChange={handleChange}
          />
          <button onClick={handleSave}>저장</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </div>
      ) : (
        <div className="view-section">
          <h2>{vocab.word}</h2>
          <p>
            <strong>뜻:</strong> {vocab.meaning}
          </p>
          {vocab.nounForm && (
            <p>
              <strong>명사형:</strong> {vocab.nounForm}
            </p>
          )}
          {vocab.adjForm && (
            <p>
              <strong>형용사형:</strong> {vocab.adjForm}
            </p>
          )}
          {vocab.advForm && (
            <p>
              <strong>부사형:</strong> {vocab.advForm}
            </p>
          )}
          {vocab.synonyms && (
            <p>
              <strong>유의어:</strong> {vocab.synonyms}
            </p>
          )}
          {vocab.antonyms && (
            <p>
              <strong>반의어:</strong> {vocab.antonyms}
            </p>
          )}
          {vocab.plusWord && (
            <p>
              <strong>연관 단어:</strong> {vocab.plusWord}
            </p>
          )}
          {vocab.plusMeaning && (
            <p>
              <strong>연관 뜻:</strong> {vocab.plusMeaning}
            </p>
          )}
          {vocab.exampleSentence && (
            <p>
              <strong>예문:</strong> <em>{vocab.exampleSentence}</em>
            </p>
          )}
          <div className="card-buttons">
            <button onClick={() => setIsEditing(true)}>✏️ 수정</button>
            <button onClick={() => onDelete(vocab.id)}>🗑️ 삭제</button>
          </div>
        </div>
      )}
    </div>
  );
}
