import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EXAMS = {
  "databricks-associate": {
    label: "Databricks Associate Data Engineer",
    file: "databricks_associate_data_engineer.json",
  },
  "databricks-professional": {
    label: "Databricks Professional Data Engineer",
    file: "databricks_professional_data_engineer.json",
  },
};

const TIME_OPTIONS = [45, 60, 90, 120];
const PASS_MARK_OPTIONS = [50, 60, 70, 80, 90, 100];

export default function App() {
  const [selectedExam, setSelectedExam] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState(null);
  const [timeLimit, setTimeLimit] = useState(60);
  const [passMark, setPassMark] = useState(70);
  const [timer, setTimer] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (questions.length > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [questions]);

  const toggleAnswer = (option) => {
    const key = questions[currentQuestion].id;
    const currentAnswers = answers[key] || [];
    const updatedAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((a) => a !== option)
      : [...currentAnswers, option];

    setAnswers({
      ...answers,
      [key]: updatedAnswers,
    });
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleFinish = () => {
    let correct = 0;

    const results = questions.map((q) => {
      const userAnswers = answers[q.id] || [];
      const correctAnswers = Array.isArray(q.answer) ? q.answer : [q.answer];

      const isCorrect =
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((ans) => correctAnswers.includes(ans));

      if (isCorrect) correct++;

      return {
        question: q.question,
        userAnswers,
        correctAnswers,
        isCorrect,
      };
    });

    const score = (correct / questions.length) * 100;
    const passed = score >= passMark;

    navigate("/results", {
      state: {
        results,
        score,
        passed,
      },
    });
  };

  const loadExam = () => {
    fetch(`${import.meta.env.BASE_URL}exams/${EXAMS[selectedExam].file}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load questions");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setCurrentQuestion(0);
        setTimer(0);
        setAnswers({});
        setError(null);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose Your Exam
      </Typography>

      {questions.length === 0 && (
        <Box display="flex" flexDirection="column" gap={2} mt={3}>
          <FormControl fullWidth>
            <InputLabel>Select Exam</InputLabel>
            <Select
              value={selectedExam}
              label="Select Exam"
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              {Object.entries(EXAMS).map(([key, { label }]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Time Limit (minutes)</InputLabel>
            <Select
              value={timeLimit}
              label="Time Limit (minutes)"
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            >
              {TIME_OPTIONS.map((m) => (
                <MenuItem key={m} value={m}>{m} minutes</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Pass Mark (%)</InputLabel>
            <Select
              value={passMark}
              label="Pass Mark (%)"
              onChange={(e) => setPassMark(Number(e.target.value))}
            >
              {PASS_MARK_OPTIONS.map((p) => (
                <MenuItem key={p} value={p}>{p}%</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={loadExam}
            disabled={!selectedExam}
          >
            Start Exam
          </Button>
        </Box>
      )}

      {selectedExam && error && (
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
      )}

      {questions.length > 0 && (
        <Box mt={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <AccessTime fontSize="small" />
              <Typography>{formatTime(timer)} / {timeLimit}:00</Typography>
            </Box>
          </Box>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle1" mb={2}>
              {questions[currentQuestion].question}
            </Typography>
            <FormGroup>
              {questions[currentQuestion].options.map((option) => {
                const key = questions[currentQuestion].id;
                const selected = answers[key]?.includes(option);
                return (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={selected}
                        onChange={() => toggleAnswer(option)}
                      />
                    }
                    label={option}
                  />
                );
              })}
            </FormGroup>
          </Paper>

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setQuestions([]);
                setSelectedExam("");
              }}
            >
              Main Menu
            </Button>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                onClick={() => setCurrentQuestion((p) => Math.max(0, p - 1))}
                disabled={currentQuestion === 0}
              >
                Back
              </Button>
              {currentQuestion < questions.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => setCurrentQuestion((p) => Math.min(questions.length - 1, p + 1))}
                  disabled={!answers[questions[currentQuestion].id]?.length}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleFinish}
                  disabled={!answers[questions[currentQuestion].id]?.length}
                >
                  Finish
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
