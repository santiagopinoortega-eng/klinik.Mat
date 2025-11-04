'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CASOS } from './data';
import { readProgress, clearProgress } from '../lib/progress';

export default function ListaCasos() {
  const [modulo, setModulo] = useState<'Todos' | 'Anticoncepción' | 'ITS'>('Todos');
  const [dificultad, setDificultad] = useState<'Todas' | 'Media' | 'Alta'>('Todas');
  const [stats, setStats] = useState<Record<string, { score: number; totalMcq: number; paso: number; totalPasos: number }>>({});

  const filtrados = useMemo(() => {
    return CASOS
      .filter((c) => (modulo === 'Todos' ? true : c.modulo === modulo))
      .filter((c) => (dificultad === 'Todas' ? true : c.dificultad === dificultad));
  }, [modulo, dificultad]);

  useEffect(() => {
    const m: Record<string, { score: number; totalMcq: number; paso: number; totalPasos: number }> = {};
    CASOS.forEach(c => {
      const p = readProgress(c.id);
      const totalMcq = c.pasos.filter((x) => x.tipo === 'mcq').length;
      m[c.id] = {
        score: p?.score ?? 0,
        totalMcq,
        paso: (p?.indice ?? 0) + 1,
        totalPasos: c.pasos.length
      };
    });
    setStats(m);
  }, []);

  const handleReset = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    clearProgress(id);
    const copy = { ...stats };
    copy[id] = { score: 0, totalMcq: copy[id].totalMcq, paso: 1, totalPasos: copy[id].totalPasos };
    setStats(copy);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-red-600">Casos clínicos</h1>
        <p className="mt-1 text-sm text-gray-600">Filtra por módulo y dificultad. Tus avances y puntajes se guardan localmente.</p>
      </div>

      <div className="mt-4 flex gap-3">
        <select className="border rounded-lg px-3 py-2" value={modulo} onChange={(e) => setModulo(e.target.value as any)}>
          <option>Todos</option>
          <option>Anticoncepción</option>
          <option>ITS</option>
        </select>
        <select className="border rounded-lg px-3 py-2" value={dificultad} onChange={(e) => setDificultad(e.target.value as any)}>
          <option>Todas</option>
          <option>Media</option>
          <option>Alta</option>
        </select>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((c) => {
          const s = stats[c.id] ?? { score: 0, totalMcq: c.pasos.filter(p=>p.tipo==='mcq').length, paso: 1, totalPasos: c.pasos.length };
          const pct = Math.round((s.paso - 1) * 100 / c.pasos.length);
          console.log('Generando enlace para caso:', c.id);
          return (
            <Link key={c.id} href={`/casos/${c.id}`} className="block">

              <article className="h-full flex flex-col justify-between border rounded-xl p-4 transform-gpu transition-shadow transition-transform duration-200 ease-out bg-gradient-to-b from-white to-slate-50 hover:shadow-xl hover:-translate-y-1">
                  <div>
                    <div className="flex items-start gap-3">
                      {/* Module pill with icon */}
                      <div className={`flex items-center justify-center h-10 w-10 rounded-md text-white font-semibold flex-shrink-0 ${c.modulo === 'Anticoncepción' ? 'bg-gradient-to-tr from-red-500 to-red-700' : 'bg-gradient-to-tr from-sky-500 to-blue-700'}`}>
                        {c.modulo === 'Anticoncepción' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v2h12V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2z" />
                            <path d="M4 13a2 2 0 012-2h8a2 2 0 012 2v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-1z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a3 3 0 00-3 3v3a2 2 0 002 2h10a2 2 0 002-2v-3a3 3 0 00-3-3h-1V6a4 4 0 00-4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800">{c.titulo}</h2>
                        <p className="mt-1 text-xs text-gray-500">{c.modulo} · {c.dificultad} · {c.pasos.length} pasos</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700 line-clamp-3">{c.vigneta}</p>
                  </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs rounded-full border px-2 py-1 inline-block">Puntaje: {s.score}/{s.totalMcq}</div>
                  <div className="w-28">
                    <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
                      <div className="h-2 rounded bg-red-600" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-1 text-[10px] text-gray-500 text-right">{pct}%</div>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
        {filtrados.length === 0 && <p className="text-sm text-gray-500">No hay casos con esos filtros.</p>}
      </div>

  <Link href="/" className="inline-block mt-8 text-red-600 underline text-sm">← Volver a inicio</Link>
    </div>
  );
}
