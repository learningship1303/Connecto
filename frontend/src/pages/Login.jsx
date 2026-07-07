import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  LogIn,
  Mail,
  RadioTower,
  ShieldCheck,
  Terminal,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(formData);
      navigate("/", { replace: true });
    } catch (loginError) {
      setError(
        loginError.response?.data?.message ||
          "ACCESS DENIED: credential verification failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-industrial-black px-4 py-10 text-industrial-steel">
      <section className="w-full max-w-md border border-industrial-line bg-industrial-panel shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_0_48px_rgba(16,185,129,0.08)]">
        <div className="border-b border-industrial-line bg-industrial-panelAlt px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center border-2 border-industrial-amber bg-industrial-black text-industrial-amber shadow-[0_0_18px_rgba(245,158,11,0.18)]">
                <RadioTower className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-mono text-lg font-black uppercase tracking-normal text-white">
                  Terminal Access
                </h1>
                <p className="font-mono text-[11px] font-black uppercase text-industrial-muted">
                  Connecto field console
                </p>
              </div>
            </div>

            <ShieldCheck className="h-5 w-5 text-industrial-green drop-shadow-[0_0_8px_rgba(16,185,129,0.75)]" />
          </div>
        </div>

        <div className="border-b border-industrial-line bg-industrial-black px-5 py-3 font-mono text-[11px] font-bold uppercase text-industrial-muted">
          <div className="flex items-center gap-2 text-industrial-green">
            <Terminal className="h-4 w-4" />
            Session handshake required
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 p-5">
          <label className="grid gap-2">
            <span className="font-mono text-[11px] font-black uppercase text-industrial-amber">
              Operator Email
            </span>
            <div className="flex min-h-14 items-center gap-3 border border-industrial-line bg-industrial-black px-4 transition focus-within:border-industrial-amber focus-within:shadow-[0_0_18px_rgba(245,158,11,0.18)]">
              <Mail className="h-5 w-5 shrink-0 text-industrial-muted" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                placeholder="operator@connecto.local"
                className="min-w-0 flex-1 bg-transparent font-mono text-sm font-bold text-white outline-none placeholder:text-industrial-muted"
              />
            </div>
          </label>

          <label className="grid gap-2">
            <span className="font-mono text-[11px] font-black uppercase text-industrial-amber">
              Access Key
            </span>
            <div className="flex min-h-14 items-center gap-3 border border-industrial-line bg-industrial-black px-4 transition focus-within:border-industrial-green focus-within:shadow-[0_0_18px_rgba(16,185,129,0.18)]">
              <LockKeyhole className="h-5 w-5 shrink-0 text-industrial-muted" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                placeholder="minimum 6 characters"
                className="min-w-0 flex-1 bg-transparent font-mono text-sm font-bold text-white outline-none placeholder:text-industrial-muted"
              />
            </div>
          </label>

          {error && (
            <div className="border border-industrial-red bg-industrial-red/10 px-4 py-3 font-mono text-xs font-black uppercase text-industrial-red">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-h-14 items-center justify-center gap-3 border border-industrial-amber bg-industrial-amber px-5 font-mono text-sm font-black uppercase text-industrial-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:border-industrial-line disabled:bg-industrial-panelAlt disabled:text-industrial-muted"
          >
            <LogIn className="h-5 w-5" />
            {isSubmitting ? "Authorizing" : "Authorize"}
          </button>

          <div className="border-t border-industrial-line pt-4 text-center font-mono text-[11px] font-bold uppercase text-industrial-muted">
            No access profile?
            <Link
              to="/signup"
              className="ml-2 text-industrial-green hover:text-white"
            >
              Register operator
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
