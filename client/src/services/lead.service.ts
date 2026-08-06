import api from "./api";
import type { Lead } from "../types/lead";

interface LeadResponse {
  success: boolean;
  data: Lead[];
  total: number;
  page: number;
  limit: number;
}

export const getLeads = async (
  page = 1,
  limit = 10,
  status?: string
): Promise<LeadResponse> => {
  const response = await api.get("/leads", {
    params: {
      page,
      limit,
      status,
    },
  });

  return response.data;
};