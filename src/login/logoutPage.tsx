import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useApi } from "../api/ApiProvider";

export default function LogoutPage() {
  const navigate = useNavigate();
  const apiClient = useApi();
  useEffect(() => {
    apiClient.logout();
    navigate("/home");
  }, [apiClient, navigate]);
  return null;
}
