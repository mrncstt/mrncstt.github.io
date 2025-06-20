import React from "react";

export default function QuizMenu({ onStart }) {
  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Select quiz</h1>

      <button
        onClick={onStart}
        className="border rounded p-4 bg-blue-600 text-white w-full text-left hover:bg-blue-700"
      >
        Databricks Associate Engineer Practice Exam
      </button>
    </div>
  );
}