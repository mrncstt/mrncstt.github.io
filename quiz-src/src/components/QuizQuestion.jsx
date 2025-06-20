import React from "react";

const fmt = (t) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
    2,
    "0"
  )}`;

export default function QuizQuestion({
  q,
  idx,
  total,
  choice,
  onChoose,
  onNext,
  onPrev,
  time,
}) {
  const progress = Math.round((idx / total) * 100);
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm font-mono w-16 text-right">{fmt(time)}</span>
      </div>

      <h2 className="font-semibold">
        Question {idx + 1} of {total}
      </h2>

      <p className="text-lg font-medium">{q.text}</p>

      <ul className="space-y-2">
        {q.options.map((o) => (
          <li key={o.label}>
            <button
              onClick={() => onChoose(o.label)}
              className={`w-full text-left border p-2 rounded hover:bg-gray-100 ${
                choice === o.label ? "ring-2 ring-blue-500" : ""
              }`}
            >
              {o.label}. {o.text}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          disabled={idx === 0}
          className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={choice == null}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}