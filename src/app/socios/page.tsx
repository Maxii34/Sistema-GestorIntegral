import Link from "next/link";

export default function SociosPage() {
  return (
    <main className="min-h-[calc(100vh-130px)] bg-transparent px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-stone-200 bg-white/85 p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-600">Socios</p>
        <h1 className="mt-2 text-3xl font-black uppercase tracking-[-0.05em] text-zinc-900">
          Gestión centralizada
        </h1>
        <p className="mt-4 text-stone-600">
          El listado y el alta de socios se administran desde el dashboard principal para centralizar el control del gimnasio.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-stone-950 shadow-[0_12px_25px_rgba(217,164,65,0.35)] transition hover:brightness-110"
        >
          Ir al dashboard
        </Link>
      </div>
    </main>
  );
}
