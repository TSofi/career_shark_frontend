import { useState, useCallback } from "react";
import axios from "axios";
import { GetQuizDto } from "../api/dto/quiz_dto";
import { useApi } from "../api/ApiProvider";

const useQuizData = () => {
  const [data, setData] = useState<GetQuizDto | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();

  const fetchQuizData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.getWelcomeQuiz();
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch loans");
    } finally {
      setLoading(false);
    }
  }, [apiClient]);

  return { data, fetchQuizData, loading, error };
};

export default useQuizData;
