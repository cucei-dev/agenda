import { HeroSection } from "@/components/buscador/hero-section";
import { SubjectCard } from "@/components/buscador/subject-card";
import { StatsSidebar } from "@/components/buscador/stats-sidebar";
import { searchResults } from "@/data/mock";
import { MaterialIcon } from "@/components/ui/material-icon";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 mb-24 md:mb-12">
      <HeroSection />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <StatsSidebar />
        <div className="lg:col-span-9 space-y-6">
          {searchResults.map((subject) => (
            <SubjectCard key={subject.nrc} subject={subject} />
          ))}
          <div className="pt-8 flex justify-center">
            <button className="flex items-center gap-2 text-secondary font-headline font-bold hover:gap-4 transition-all">
              Cargar más materias
              <MaterialIcon name="arrow_forward" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
