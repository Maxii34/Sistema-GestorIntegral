export type Socio = {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  membresia: string;
  membresiaId?: string;
  plan: string;
  estado: "Activo" | "Suspendido" | "Inactivo";
  vencimiento: string;
};
