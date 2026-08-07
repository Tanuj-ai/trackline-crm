import type { Lead } from "../../types/lead";
import StatusBadge from "./StatusBadge";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
}

const LeadTable = ({
  leads,
  onEdit,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg">

      <table className="w-full">

        <thead className="bg-slate-800">

          <tr className="text-left text-sm uppercase tracking-wide text-slate-300">

            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Company</th>
            <th className="p-4">Status</th>
            <th className="p-4">Created</th>
            <th className="p-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {leads.map((lead) => (

            <tr
              key={lead.id}
              className="border-t border-slate-800 hover:bg-slate-800 transition-colors"
            >

              <td className="p-4 font-medium">
                {lead.name}
              </td>

              <td className="p-4">
                {lead.email}
              </td>

              <td className="p-4">
                {lead.phone || "-"}
              </td>

              <td className="p-4">
                {lead.company || "-"}
              </td>

              <td className="p-4">
                <StatusBadge status={lead.status} />
              </td>

              <td className="p-4">
                {new Date(
                  lead.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">

                <div className="flex justify-center gap-3">

                  <button className="text-blue-400 hover:text-blue-300">
                    <Eye size={18} />
                  </button>

                  <button
  onClick={() => onEdit(lead)}
  className="text-yellow-400 hover:text-yellow-300"
>
  <Pencil size={18} />
</button>

                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {leads.length === 0 && (

        <div className="p-10 text-center text-slate-400">

          No Leads Found

        </div>

      )}

    </div>
  );
};

export default LeadTable;