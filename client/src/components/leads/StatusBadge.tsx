interface Props {
  status: string;
}

const colors: Record<string, string> = {
  NEW: "bg-blue-500",
  CONTACTED: "bg-yellow-500",
  QUALIFIED: "bg-purple-500",
  WON: "bg-green-500",
  LOST: "bg-red-500",
};

const StatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${colors[status] ?? "bg-slate-600"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;