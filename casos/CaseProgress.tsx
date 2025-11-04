"use client";

import React, { useEffect, useState } from 'react';
import type { Paso } from './data';
import { readProgress } from '../lib/progress';

export default function CaseProgress({
  pasos,
  current,
  caseId,
  onNavigate,
}: {
  pasos: Paso[];
  current: number;
  caseId?: string;
  onNavigate?: (i: number) => void;
}) {
  const total = pasos.length;
  const totalMcq = pasos.filter(p => p.tipo === 'mcq').length;
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!caseId) return;
    const saved = readProgress(caseId);
    if (saved) setScore(saved.score ?? 0);
    else setScore(null);
  }, [caseId]);

  const pct = totalMcq > 0 && score !== null ? Math.round((score / totalMcq) * 100) : 0;

  return (
    <div className="text-sm">
      <div className="hidden lg:block sticky top-24">
        <div className="p-3 bg-white border rounded-md">
          <div className="text-xs text-gray-500">Resumen</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div className="text-lg font-semibold text-gray-800">{score ?? '-'} / {totalMcq}</div>
            <div className="text-xs text-gray-500">MCQ correctas</div>
          </div>
          <div className="mt-3">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-2 bg-green-600" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 text-[11px] text-gray-500">{pct}%</div>
          </div>
          <div className="mt-3">
            <button onClick={() => onNavigate?.(0)} className="w-full px-3 py-2 rounded btn-ghost">Revisar respuestas</button>
          </div>
        </div>

        <h4 className="text-xs text-gray-500 mt-4 mb-3">Progreso</h4>
        <div className="space-y-2">
          {pasos.map((p, i) => {
            const done = i < current;
            const active = i === current;
            return (
              <button
                key={p.id}
                onClick={() => onNavigate && onNavigate(i)}
                disabled={!onNavigate || i > current}
                className={`w-full text-left flex items-start gap-3 p-2 rounded-md transition-colors ${
                  active ? 'bg-red-50 border border-red-100' : done ? 'bg-green-50' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold ${done ? 'bg-green-600 text-white' : active ? 'border border-red-600 text-red-600' : 'border text-gray-600'}`}>
                  {done ? '✓' : i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 truncate">{p.tipo === 'mcq' ? 'Pregunta' : 'Reflexión'} {i + 1}</div>
                  <div className="text-xs text-gray-500 truncate">{p.enunciado}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile compact progress bar */}
      <div className="lg:hidden">
        <div className="mb-2 text-xs text-gray-500">Progreso</div>
        <div className="flex gap-1">
          {pasos.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-2 rounded ${i < current ? 'bg-green-600' : i === current ? 'bg-red-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500">Paso {current + 1} de {total}</div>
      </div>
    </div>
  );
}
