import api from "./api";

export interface DashboardStats {
  total: number;
  newLeads: number;
  contacted: number;
  qualified: number;
  won: number;
  lost: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/leads/dashboard/stats");
  return response.data.stats;
};