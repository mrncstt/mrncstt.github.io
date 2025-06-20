import React from "react";

const fmt = (t) =>
  `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
    2,
    "0"
  )}`;

export default function QuizResult({ questions, answers, time, onRestart }) {
  const summary = {};
  const wrong = [];

  questions.forEach((q) => {
    if (!summary[q.topic]) summary[q.topic] = { total: 0, correct: 0 };
    summary[q.topic].total += 1;
    if (q.correct.split("").includes(answers[q.id])) {
      summary[q.topic].correct += 1;
    } else {
      wrong.push({
        question: q.text,
        yourAnswer: answers[q.id],
        correct: q.correct,
      });
    }
  });

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Results</h1>
      <p className="text-sm">
        Time: <span className="font-mono">{fmt(time)}</span>
      </p>

      <div className="space-y-2">
        {Object.entries(summary).map(([topic, s]) => (
          <div key={topic} className="border p-3 rounded">
            <h3 className="font-semibold">{topic}</h3>
            <p>
              {s.correct}/{s.total} correct (
              {Math.round((s.correct / s.total) * 100)}%)
            </p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-4">Incorrect Questions</h2>
        {wrong.length === 0 ? (
          <p className="text-green-600">Great job! No mistakes 🚀</p>
        ) : (
          <ul className="list-disc ml-5 space-y-2">
            {wrong.map((w, i) => (
              <li key={i}>
                <p className="font-medium">{w.question}</p>
                <p className="text-sm">
                  Your answer:{" "}
                  <span className="text-red-600">{w.yourAnswer}</span> | Correct:{" "}
                  <span className="text-green-600">{w.correct}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={onRestart}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Restart
      </button>
    </div>
  );
}