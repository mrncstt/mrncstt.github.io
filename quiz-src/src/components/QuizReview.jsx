import React from "react";

const fmt = (t) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
    2,
    "0"
  )}`;

export default function QuizReview({
  questions,
  answers,
  idx,
  setIdx,
  onChange,
  onSubmit,
  time,
}) {
  const q = questions[idx];
  const choice = answers[q.id];

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Review Answers</h1>
        <span className="text-sm font-mono">{fmt(time)}</span>
      </div>

      <p className="text-lg font-medium">{q.text}</p>

      <ul className="space-y-2">
        {q.options.map((o) => (
          <li key={o.label}>
            <button
              onClick={() => onChange(q.id, o.label)}
              className={`w-full text-left border p-2 rounded hover:bg-gray-100 ${
                choice === o.label ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {o.label}. {o.text}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between">
        <button
          onClick={() => setIdx(Math.max(idx - 1, 0))}
          disabled={idx === 0}
          className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {idx + 1 < questions.length ? (
          <button
            onClick={() => setIdx(idx + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}