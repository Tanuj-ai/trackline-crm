import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import LeadTable from "../components/leads/LeadTable";
import { getLeads } from "../services/lead.service";
import type { Lead } from "../types/lead";

const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const response = await getLeads();

      setLeads(response.data);
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Leads</h1>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : (
        <LeadTable leads={leads} />
      )}
    </Layout>
  );
};

export default Leads;