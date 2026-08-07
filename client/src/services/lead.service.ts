import api from "./api";
import type {
  Lead,
  CreateLeadDto,
} from "../types/lead";
export interface LeadResponse {
  success: boolean;
  data: Lead[];
  total: number;
  page: number;
  limit: number;
}
export const createLead = async (
  data: CreateLeadDto
) => {
  const response = await api.post("/leads", data);

  return response.data;
};
export const updateLead = async (
  id: string,
  data: CreateLeadDto
) => {
  const response = await api.patch(`/leads/${id}`, data);
  return response.data;
};
export const getLeads = async (
  page = 1,
  limit = 10,
  status = "",
  search = ""
): Promise<LeadResponse> => {
  const response = await api.get("/leads", {
    params: {
      page,
      limit,
      status,
      search,
    },
  });

  return response.data;
};