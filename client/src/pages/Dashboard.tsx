import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getDashboardStats } from "../services/dashboard.service";

interface Stats {
  total: number;
  newLeads: number;
  contacted: number;
  qualified: number;
  won: number;
  lost: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    newLeads: 0,
    contacted: 0,
    qualified: 0,
    won: 0,
    lost: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const cards = [
    { title: "Total Leads", value: stats.total },
    { title: "New", value: stats.newLeads },
    { title: "Contacted", value: stats.contacted },
    { title: "Qualified", value: stats.qualified },
    { title: "Won", value: stats.won },
    { title: "Lost", value: stats.lost },
  ];

  return (
    <Layout>
      <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className="text-slate-400">{card.title}</p>

            <h2 className="mt-4 text-5xl font-bold">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;