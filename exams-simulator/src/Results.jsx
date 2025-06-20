import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
} from "@mui/material";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <Container>
        <Typography variant="h5" mt={4}>No results to show.</Typography>
        <Button onClick={() => navigate("/")}>Go to Start</Button>
      </Container>
    );
  }

  const { results, score } = state;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Exam Results
      </Typography>
      <Typography variant="h6" align="center" mb={4}>
        Score: {score.toFixed(2)}%
      </Typography>

      {results.map((res, index) => (
        <Paper key={index} elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Question {index + 1}: {res.question}
          </Typography>
          <Typography>
            Your Answer:{" "}
            {res.userAnswers.length > 0 ? res.userAnswers.join(", ") : "None"}
          </Typography>
          <Typography>
            Correct Answer: {res.correctAnswers.join(", ")}
          </Typography>
          <Chip
            label={res.isCorrect ? "Correct ✅" : "Incorrect ❌"}
            color={res.isCorrect ? "success" : "error"}
            sx={{ mt: 1 }}
          />
        </Paper>
      ))}

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Start
        </Button>
      </Box>
    </Container>
  );
}
