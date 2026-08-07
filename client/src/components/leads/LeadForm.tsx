import { useEffect, useState } from "react";
import { createLead, updateLead } from "../../services/lead.service";
import type { Lead, CreateLeadDto } from "../../types/lead";

interface Props {
  lead?: Lead | null;
  onClose: () => void;
  onSuccess: () => void;
}

const LeadForm = ({
  lead,
  onClose,
  onSuccess,
}: Props) => {
  const [form, setForm] = useState<CreateLeadDto>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lead) {
      setForm({
        name: lead.name,
        email: lead.email,
        phone: lead.phone ?? "",
        company: lead.company ?? "",
      });
    }
  }, [lead]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (lead) {
        await updateLead(lead.id, form);
      } else {
        await createLead(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-xl bg-slate-900 p-8"
      >

        <h2 className="mb-6 text-2xl font-bold">
          {lead ? "Edit Lead" : "Create Lead"}
        </h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="mb-4 w-full rounded bg-slate-800 p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-4 w-full rounded bg-slate-800 p-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="mb-4 w-full rounded bg-slate-800 p-3"
        />

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="mb-6 w-full rounded bg-slate-800 p-3"
        />

        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            className="rounded bg-slate-700 px-5 py-3"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-orange-500 px-5 py-3"
          >
            {loading
              ? "Saving..."
              : lead
              ? "Update Lead"
              : "Create Lead"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default LeadForm;