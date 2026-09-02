import Link from "next/link";

export default function SociosPage() {
  return (
    <main className="min-h-[calc(100vh-130px)] bg-zinc-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Socios</p>
        <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-zinc-900">
          Gestión centralizada
        </h1>
        <p className="mt-4 text-zinc-600">
          El listado y el alta de socios se administran desde el dashboard principal para centralizar el control del gimnasio.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-xl bg-amber-500 px-5 py-3 text-sm font-black uppercase tracking-wide text-zinc-950 transition hover:bg-amber-400"
        >
          Ir al dashboard
        </Link>
      </div>
    </main>
  );
}
