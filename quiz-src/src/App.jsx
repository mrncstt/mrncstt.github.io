import React, { useState, useEffect, Suspense, lazy } from "react";
import questionsData from "./questions.json";

// Code‑split components
const QuizMenu     = lazy(() => import("./components/QuizMenu"));
const QuizQuestion = lazy(() => import("./components/QuizQuestion"));
const QuizReview   = lazy(() => import("./components/QuizReview"));
const QuizResult   = lazy(() => import("./components/QuizResult"));

// helper
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function QuizApp() {
  const [stage, setStage] = useState("menu");      // menu | quiz | review | result
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(0);

  // timer
  useEffect(() => {
    if (stage !== "quiz" && stage !== "review") return;
    const id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [stage]);

  /* ---------------- actions ---------------- */
  const startQuiz = () => {
    const shuffled = shuffle(questionsData);       // load ALL questions
    setQuestions(shuffled);
    setStage("quiz");
    setIdx(0);
    setAnswers({});
    setTime(0);
  };

  const recordAnswer = (id, choice) => {
    setAnswers(prev => ({ ...prev, [id]: choice }));
  };

  const nextQuestion = () => {
    if (idx + 1 < questions.length) setIdx(idx + 1);
    else { setIdx(0); setStage("review"); }
  };

  const prevQuestion = () => {
    if (idx > 0) setIdx(idx - 1);
  };

  const submitQuiz = () => setStage("result");
  const restart    = () => { setStage("menu"); setQuestions([]); setIdx(0); setAnswers({}); setTime(0); };

  /* ---------------- render ---------------- */
  return (
    <Suspense fallback={<p className="p-6">Loading…</p>}>
      {stage === "menu" && <QuizMenu onStart={startQuiz} />}

      {stage === "quiz" && (
        <QuizQuestion
          q={questions[idx]}
          idx={idx}
          total={questions.length}
          choice={answers[questions[idx].id] ?? null}
          onChoose={(label) => recordAnswer(questions[idx].id, label)}
          onNext={nextQuestion}
          onPrev={prevQuestion}
          time={time}
        />
      )}

      {stage === "review" && (
        <QuizReview
          questions={questions}
          answers={answers}
          idx={idx}
          setIdx={setIdx}
          onChange={recordAnswer}
          onSubmit={submitQuiz}
          time={time}
        />
      )}

      {stage === "result" && (
        <QuizResult
          questions={questions}
          answers={answers}
          time={time}
          onRestart={restart}
        />
      )}
    </Suspense>
  );
}