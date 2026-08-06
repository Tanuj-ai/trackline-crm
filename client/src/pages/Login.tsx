import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginService({
        email,
        password,
      });

      login(response.user, response.token);

      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-lg"
      >

        <h1 className="mb-2 text-3xl font-bold text-white">
          Trackline CRM
        </h1>

        <p className="mb-6 text-slate-400">
          Login to continue
        </p>

        {error && (
          <div className="mb-4 rounded bg-red-500/20 p-3 text-red-400">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border border-slate-700 bg-slate-800 p-3 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded border border-slate-700 bg-slate-800 p-3 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-orange-500 p-3 font-semibold text-white hover:bg-orange-600"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
};

export default Login;