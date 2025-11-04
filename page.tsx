export default function Home() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-red-600">KLINIK-MAT</h1>
        <p className="mt-2 text-lg text-gray-700">Formación clínica digital</p>
        <p className="mt-6 text-gray-600">
          Casos clínicos de <strong>Anticoncepción</strong> e <strong>ITS</strong> para estudiantes de Obstetricia en Chile.
          Enfocado en <em>pensamiento clínico</em>, decisiones encadenadas y retroalimentación.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="/casos" className="rounded-xl border border-red-600 px-5 py-2 text-sm text-red-600 hover:bg-red-50">
            Explorar casos →
          </a>
          <a href="/about" className="rounded-xl border px-5 py-2 text-sm hover:bg-gray-50">
            ¿Cómo funciona?
          </a>
        </div>
      </div>
    </section>
  );
}
