import { useQuery } from "@tanstack/react-query";
import api from "../../../services/axios";


const fetchDashboard = async () => {
  const res = await api.get("/dashboard");
  return res.data;
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
};
