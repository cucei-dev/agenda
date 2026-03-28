export type SubjectStatus = "disponible" | "waitlist" | "lleno";

export type Centro = "CUCEI" | "CUCEA" | "CUAAD" | "CUCS" | "CUSH";

export interface Subject {
  nrc: string;
  nombre: string;
  profesor: string;
  creditos: number;
  cuposTotales: number;
  disponibles: number;
  centro: Centro;
  status: SubjectStatus;
}

export interface SidebarSubject {
  nombre: string;
  nrc: string;
  creditos: number;
  colorClass: string;
}

export type DayOfWeek = "Lun" | "Mar" | "Mié" | "Jue" | "Vie" | "Sáb";

export interface CalendarEventData {
  materia: string;
  aula: string;
  dia: DayOfWeek;
  horaInicio: string;
  horaFin: string;
  colorScheme: "basic" | "specialty" | "complementary" | "workshop";
}

export interface SubjectDetail {
  nrc: string;
  nombre: string;
  profesor: string;
  horarios: {
    dias: string;
    hora: string;
  }[];
  ubicacion: {
    aula: string;
    centro: string;
    status: string;
    statusVariant: "available" | "waitlist";
  };
}

export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export interface FilterOption {
  label: string;
  value: string;
}
