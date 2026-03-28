export type SubjectStatus = "disponible" | "lleno" | "waitlist";

export type Centro = "CUCEI" | "CUCEA" | "CUAAD" | "CUCS" | "CUSH";

export interface SubjectClase {
  dia: string;
  horaInicio: string;
  horaFin: string;
}

export interface Subject {
  nrc: string;
  nombre: string;
  profesor: string;
  creditos: number;
  cuposTotales: number;
  disponibles: number;
  centro: string;
  status: SubjectStatus;
  clases: SubjectClase[];
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
    statusVariant: "disponible" | "lleno";
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

// ── Schedule (Horario) types ──────────────────────────────────────────────────

export interface ScheduleColorScheme {
  bg: string;
  text: string;
  border: string;
}

export interface ScheduleEntry {
  seccion: ApiSeccion;
  colorIndex: number;
}

// ── SIIAPI response types ─────────────────────────────────────────────────────

export interface ApiPagination<T> {
  total: number;
  results: T[];
}

export interface ApiCalendario {
  id: number;
  name: string;
  siiau_id: string;
}

export interface ApiCentro {
  id: number;
  name: string;
  siiau_id: string;
}

export interface ApiMateria {
  id: number;
  name: string;
  creditos: number;
  clave: string;
}

export interface ApiProfesor {
  id: number;
  name: string;
}

export interface ApiClase {
  id: number;
  seccion_id: number;
  sesion: number | null;
  hora_inicio: string | null;
  hora_fin: string | null;
  dia: number | null;
  aula_id: number | null;
}

export interface ApiSeccion {
  id: number;
  name: string;
  nrc: string;
  cupos: number;
  cupos_disponibles: number;
  periodo_inicio: string | null;
  periodo_fin: string | null;
  centro_id: number;
  materia_id: number;
  profesor_id: number | null;
  calendario_id: number;
  centro: ApiCentro;
  materia: ApiMateria;
  profesor: ApiProfesor | null;
  calendario: ApiCalendario;
  clases: ApiClase[];
}

