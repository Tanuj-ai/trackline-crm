import type { Lead } from "../../types/lead";
import StatusBadge from "./StatusBadge";

interface Props {
  leads: Lead[];
}

const LeadTable = ({ leads }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t border-slate-800 hover:bg-slate-800"
            >
              <td className="p-4">{lead.name}</td>
              <td className="p-4">{lead.email}</td>
              <td className="p-4">{lead.company}</td>
              <td className="p-4">
                <StatusBadge status={lead.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leads.length === 0 && (
        <div className="p-8 text-center text-slate-400">
          No leads found.
        </div>
      )}
    </div>
  );
};

export default LeadTable;