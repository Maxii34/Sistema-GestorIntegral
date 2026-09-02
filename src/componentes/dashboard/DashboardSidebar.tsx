import { LayoutDashboard, Users, DoorOpen, CreditCard, Settings } from "lucide-react";

export const menuItems = [
  { key: "resumen", label: "Resumen", icon: LayoutDashboard },
  { key: "socios", label: "Socios", icon: Users },
  { key: "ingresos", label: "Ingresos", icon: DoorOpen },
  { key: "membresias", label: "Membresías", icon: CreditCard },
  { key: "configuracion", label: "Configuración", icon: Settings },
] as const;

type DashboardSidebarProps = {
  activeSection: string;
  onSelectSection: (section: string) => void;
};

export default function DashboardSidebar({ activeSection, onSelectSection }: DashboardSidebarProps) {
  return (
    <aside className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-xs h-fit">
      <div className="mb-6 px-2">
        <span className="text-xs font-bold tracking-widest text-amber-600 uppercase">IronGym</span>
        <h2 className="text-lg font-bold text-stone-900 leading-tight">Administración</h2>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onSelectSection(item.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                isActive
                  ? "bg-amber-500 text-stone-950 shadow-xs font-bold"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
