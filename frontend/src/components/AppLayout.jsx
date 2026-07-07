import {
  Activity,
  Antenna,
  BatteryCharging,
  HardDrive,
  RadioTower,
  ShieldCheck,
  Wifi,
  WifiOff,
} from "lucide-react";

import ChatRoom from "./ChatRoom";
import useSyncOfflineMessages from "../hooks/useSyncOfflineMessages";
import useNetworkStatus from "../hooks/useNetworkStatus";

const StatusBadge = ({ isOnline }) => {
  const Icon = isOnline ? Wifi : WifiOff;

  return (
    <div
      className={[
        "flex min-h-12 items-center gap-3 border px-4 font-mono text-xs font-black uppercase tracking-normal sm:text-sm",
        isOnline
          ? "border-industrial-green bg-industrial-green/10 text-industrial-green shadow-online"
          : "border-industrial-red bg-industrial-red/15 text-industrial-red shadow-offline",
      ].join(" ")}
      aria-live="polite"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>
        {isOnline
          ? "SYSTEM ONLINE"
          : "CRITICAL: OFFLINE - Queuing Messages"}
      </span>
    </div>
  );
};

const NavButton = ({ icon: Icon, label, active = false }) => (
  <button
    type="button"
    className={[
      "flex min-h-14 items-center gap-3 border px-4 text-left text-sm font-bold uppercase tracking-normal transition",
      active
        ? "border-industrial-amber bg-industrial-amber text-industrial-black"
        : "border-industrial-line bg-industrial-panelAlt text-industrial-steel hover:border-industrial-amber hover:text-white",
    ].join(" ")}
  >
    <Icon className="h-5 w-5 shrink-0" />
    <span>{label}</span>
  </button>
);

const Metric = ({ label, value, tone = "neutral" }) => {
  const toneClass =
    tone === "green"
      ? "text-industrial-green"
      : tone === "amber"
        ? "text-industrial-amber"
        : "text-industrial-steel";

  return (
    <div className="border border-industrial-line bg-industrial-panelAlt p-4">
      <div className="font-mono text-[11px] font-bold uppercase text-industrial-muted">
        {label}
      </div>
      <div className={`mt-3 font-mono text-2xl font-black ${toneClass}`}>
        {value}
      </div>
    </div>
  );
};

export default function AppLayout() {
  const isOnline = useNetworkStatus();
  useSyncOfflineMessages();

  return (
    <main className="min-h-screen bg-industrial-black text-industrial-steel">
      <header className="border-b border-industrial-line bg-industrial-panel">
        <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div className="flex min-h-14 items-center gap-4">
            <div className="grid h-12 w-12 place-items-center border-2 border-industrial-amber bg-industrial-black text-industrial-amber">
              <RadioTower className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-normal text-white">
                Connecto
              </h1>
              <p className="font-mono text-xs font-bold uppercase text-industrial-muted">
                Field Operations Console
              </p>
            </div>
          </div>

          <StatusBadge isOnline={isOnline} />
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-89px)] grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-industrial-line bg-industrial-panel p-4 lg:border-b-0 lg:border-r">
          <nav className="grid gap-3">
            <NavButton icon={Activity} label="Network" active />
            <NavButton icon={HardDrive} label="Local Cache" />
            <NavButton icon={Antenna} label="Channels" />
            <NavButton icon={ShieldCheck} label="Access" />
          </nav>
        </aside>

        <section className="bg-industrial-black">
          <div className="border-b border-industrial-line bg-industrial-panelAlt px-4 py-4 lg:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-black uppercase tracking-normal text-white">
                  Network-Aware Shell
                </h2>
                <p className="mt-1 font-mono text-xs uppercase text-industrial-muted">
                  Offline-first command surface
                </p>
              </div>
              <div className="flex min-h-11 items-center gap-2 border border-industrial-line bg-industrial-black px-3 font-mono text-xs font-bold uppercase text-industrial-muted">
                <BatteryCharging className="h-4 w-4 text-industrial-amber" />
                Resilient Mode Armed
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 lg:grid-cols-3 lg:p-6">
            <Metric
              label="Transport"
              value={isOnline ? "LIVE" : "LOCAL"}
              tone={isOnline ? "green" : "amber"}
            />
            <Metric label="Queue" value={isOnline ? "0" : "READY"} />
            <Metric label="Storage" value="INDEXEDDB" tone="amber" />
          </div>

          <div className="px-4 pb-4 lg:px-6 lg:pb-6">
            <ChatRoom />
          </div>
        </section>
      </div>
    </main>
  );
}
