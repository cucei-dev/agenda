import type {
  Subject,
  SidebarSubject,
  CalendarEventData,
  SubjectDetail,
  NavItem,
  FilterOption,
} from "@/lib/types";

export const navItems: NavItem[] = [
  { label: "Buscador", href: "/", icon: "search" },
  { label: "Mi Horario", href: "/horario", icon: "calendar_today" },
  { label: "Acerca de", href: "/about", icon: "info" },
];

export const centroFilters: FilterOption[] = [
  { label: "Todos", value: "todos" },
  { label: "CUCEI", value: "cucei" },
  { label: "CUCEA", value: "cucea" },
  { label: "CUAAD", value: "cuaad" },
  { label: "CUCS", value: "cucs" },
  { label: "CUSH", value: "cush" },
];

export const searchResults: Subject[] = [
  {
    nrc: "142586",
    nombre: "Estructura de Datos y Algoritmos",
    profesor: "Prof. Dr. Alejandro Villagrana Sandoval",
    creditos: 8,
    cuposTotales: 35,
    disponibles: 12,
    centro: "CUCEI",
    status: "disponible",
    clases: [
      { dia: "Lun", horaInicio: "08:00", horaFin: "10:00" },
      { dia: "Mié", horaInicio: "08:00", horaFin: "10:00" },
    ],
  },
  {
    nrc: "198273",
    nombre: "Microeconomía Avanzada",
    profesor: "Mtra. Elena Montserrat Ruiz",
    creditos: 10,
    cuposTotales: 40,
    disponibles: 0,
    centro: "CUCEA",
    status: "lleno",
    clases: [],
  },
  {
    nrc: "210594",
    nombre: "Cálculo Diferencial e Integral",
    profesor: "Ing. Roberto Carlos Méndez",
    creditos: 12,
    cuposTotales: 30,
    disponibles: 5,
    centro: "CUCEI",
    status: "disponible",
    clases: [
      { dia: "Mar", horaInicio: "10:00", horaFin: "12:00" },
      { dia: "Jue", horaInicio: "10:00", horaFin: "12:00" },
    ],
  },
];

export const sidebarSubjects: SidebarSubject[] = [
  {
    nombre: "Cálculo Diferencial",
    nrc: "12456",
    creditos: 8,
    colorClass: "border-primary",
  },
  {
    nombre: "Programación de Estructuras",
    nrc: "18902",
    creditos: 10,
    colorClass: "border-secondary",
  },
  {
    nombre: "Física I",
    nrc: "15543",
    creditos: 9,
    colorClass: "border-tertiary",
  },
  {
    nombre: "Inglés Técnico",
    nrc: "22100",
    creditos: 4,
    colorClass: "border-primary",
  },
];

export const calendarEvents: CalendarEventData[] = [
  // Cálculo Diferencial — Lun, Mié, Vie 07:00
  {
    materia: "Cálculo Diferencial",
    aula: "Aula B-201",
    dia: "Lun",
    horaInicio: "07:00",
    horaFin: "09:00",
    colorScheme: "basic",
  },
  {
    materia: "Cálculo Diferencial",
    aula: "Aula B-201",
    dia: "Mié",
    horaInicio: "07:00",
    horaFin: "09:00",
    colorScheme: "basic",
  },
  {
    materia: "Cálculo Diferencial",
    aula: "Aula B-201",
    dia: "Vie",
    horaInicio: "07:00",
    horaFin: "09:00",
    colorScheme: "basic",
  },
  // Programación — Mar, Jue 09:00
  {
    materia: "Programación",
    aula: "Lab. C-4",
    dia: "Mar",
    horaInicio: "09:00",
    horaFin: "11:00",
    colorScheme: "specialty",
  },
  {
    materia: "Programación",
    aula: "Lab. C-4",
    dia: "Jue",
    horaInicio: "09:00",
    horaFin: "11:00",
    colorScheme: "specialty",
  },
  // Física I — Lun, Mié, Vie 11:00
  {
    materia: "Física I",
    aula: "Edificio G-12",
    dia: "Lun",
    horaInicio: "11:00",
    horaFin: "13:00",
    colorScheme: "basic",
  },
  {
    materia: "Física I",
    aula: "Edificio G-12",
    dia: "Mié",
    horaInicio: "11:00",
    horaFin: "13:00",
    colorScheme: "basic",
  },
  {
    materia: "Física I",
    aula: "Edificio G-12",
    dia: "Vie",
    horaInicio: "11:00",
    horaFin: "13:00",
    colorScheme: "basic",
  },
  // Inglés Técnico — Mar, Jue 13:00
  {
    materia: "Inglés Técnico",
    aula: "Aula E-10",
    dia: "Mar",
    horaInicio: "13:00",
    horaFin: "15:00",
    colorScheme: "complementary",
  },
  {
    materia: "Inglés Técnico",
    aula: "Aula E-10",
    dia: "Jue",
    horaInicio: "13:00",
    horaFin: "15:00",
    colorScheme: "complementary",
  },
  // Taller Extra — Sáb 09:00 (workshop block spanning 180px)
  {
    materia: "Taller Extra",
    aula: "",
    dia: "Sáb",
    horaInicio: "09:00",
    horaFin: "13:00",
    colorScheme: "workshop",
  },
];

export const calendarDays = [
  { short: "Lun", date: "02" },
  { short: "Mar", date: "03" },
  { short: "Mié", date: "04" },
  { short: "Jue", date: "05" },
  { short: "Vie", date: "06" },
  { short: "Sáb", date: "07" },
] as const;

export const timeSlots = [
  { label: "07:00 AM", hour: "07:00" },
  { label: "09:00 AM", hour: "09:00" },
  { label: "11:00 AM", hour: "11:00" },
  { label: "01:00 PM", hour: "13:00" },
] as const;

export const scheduleDetailSubjects: SubjectDetail[] = [
  {
    nrc: "148293",
    nombre: "Programación Orientada a Objetos",
    profesor: "Prof. Dr. Ricardo Arreola Velasco",
    horarios: [
      { dias: "Lunes / Miércoles", hora: "09:00 - 10:55" },
      { dias: "Viernes", hora: "09:00 - 09:55" },
    ],
    ubicacion: {
      aula: "Módulo L - Aula 102",
      centro: "Centro Universitario de Ciencias Exactas e Ingenierías",
      status: "DISPONIBLE",
      statusVariant: "disponible",
    },
  },
  {
    nrc: "159302",
    nombre: "Estructuras de Datos II",
    profesor: "Mtra. Elena Sofia García",
    horarios: [{ dias: "Martes / Jueves", hora: "11:00 - 12:55" }],
    ubicacion: {
      aula: "Beta - Laboratorio 3",
      centro: "Centro Universitario de Ciencias Exactas e Ingenierías",
      status: "SIN CUPOS",
      statusVariant: "lleno",
    },
  },
  {
    nrc: "162281",
    nombre: "Administración de Redes",
    profesor: "Ing. Fernando Tapia Montes",
    horarios: [],
    ubicacion: {
      aula: "",
      centro: "",
      status: "",
      statusVariant: "disponible",
    },
  },
];

export const colorSchemeMap = {
  basic: {
    bg: "bg-secondary-container",
    text: "text-on-secondary-container",
    subtext: "text-on-secondary-container/80",
  },
  specialty: {
    bg: "bg-primary-fixed",
    text: "text-on-primary-fixed-variant",
    subtext: "text-on-primary-fixed-variant/80",
  },
  complementary: {
    bg: "bg-tertiary-fixed",
    text: "text-on-tertiary-fixed-variant",
    subtext: "text-on-tertiary-fixed-variant/80",
  },
  workshop: {
    bg: "bg-tertiary-container/30",
    text: "text-tertiary",
    subtext: "text-tertiary/80",
  },
} as const;

export const calendarLegend = [
  { label: "Ciencias Básicas", color: "bg-secondary-container" },
  { label: "Especialidad", color: "bg-primary-fixed" },
  { label: "Complementarias", color: "bg-tertiary-fixed" },
];
