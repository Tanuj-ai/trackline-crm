import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import LeadTable from "../components/leads/LeadTable";
import { getLeads } from "../services/lead.service";
import type { Lead } from "../types/lead";
import LeadForm from "../components/leads/LeadForm";
const Leads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  

const [editingLead, setEditingLead] =
  useState<Lead | null>(null);
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    loadLeads();
  }, [page, status, search]);
const [showModal, setShowModal] = useState(false);
  const loadLeads = async () => {
    setLoading(true);

    try {
      const response = await getLeads(
        page,
        limit,
        status,
        search
      );

      setLeads(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Leads
          </h1>

          <p className="text-slate-400">
            Manage all customer leads
          </p>
        </div>

        <button
  onClick={() => {
    setEditingLead(null);
    setShowModal(true);
  }}
  className="rounded-lg bg-orange-500 px-5 py-3 hover:bg-orange-600"
>
  + Add Lead
</button>

      </div>

      <div className="mb-6 flex gap-4">

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-3"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-lg border border-slate-700 bg-slate-900 px-4"
        >
          <option value="">
            All Status
          </option>

          <option value="NEW">
            New
          </option>

          <option value="CONTACTED">
            Contacted
          </option>

          <option value="QUALIFIED">
            Qualified
          </option>

          <option value="WON">
            Won
          </option>

          <option value="LOST">
            Lost
          </option>

        </select>

      </div>

      {loading ? (
        <div className="py-10 text-center">
          Loading...
        </div>
      ) : (
        <LeadTable
  leads={leads}
  onEdit={(lead) => {
    setEditingLead(lead);
    setShowModal(true);
  }}
/>

      )}
      {showModal && (
  <LeadForm
    lead={editingLead}
    onClose={() => {
      setShowModal(false);
      setEditingLead(null);
    }}
    onSuccess={loadLeads}
  />
)}

      <div className="mt-8 flex justify-center gap-3">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded bg-slate-800 px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="flex items-center px-4">
          Page {page}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          className="rounded bg-slate-800 px-4 py-2"
        >
          Next
        </button>

      </div>
      {showModal && (
  <LeadForm
    onClose={() => setShowModal(false)}
    onSuccess={loadLeads}
  />
  
)}
    </Layout>
    
  );
};

export default Leads;