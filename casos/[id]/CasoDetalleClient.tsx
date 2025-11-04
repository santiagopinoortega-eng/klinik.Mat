"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { readProgress, clearProgress, type SavedProgress } from '../../lib/progress';
import type { Caso } from '../data';
import CaseProgress from '../CaseProgress';

export function CasoDetalleClient({ caso }: { caso: Caso }) {
  const [paso, setPaso] = useState(0);
  const [progress, setProgress] = useState<SavedProgress | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<string | null>(null);
  const [shortLocal, setShortLocal] = useState<string>('');

  useEffect(() => {
    const saved = readProgress(caso.id);
    if (saved) {
      setPaso(saved.indice);
      setProgress(saved);
    }
  }, [caso.id]);

  // keep shortLocal in sync when paso or progress changes
  useEffect(() => {
    const pasoActual = caso.pasos[paso];
    if (pasoActual && pasoActual.tipo === 'short') {
      setShortLocal(progress?.shortAnswers?.[pasoActual.id] ?? '');
    } else {
      setShortLocal('');
    }
  }, [paso, progress, caso.pasos]);

  // Handle MCQ selection: store locally, save progress, and show feedback. Do not auto-advance.
  const handleMCQSelect = (respuesta: string) => {
    if (showFeedback) return; // ignore extra clicks while feedback visible
    const pasoActual = caso.pasos[paso];
    if (pasoActual.tipo !== 'mcq') return;

    // Update local selection (controls UI) and persisted progress
    setSelectedLocal(respuesta);

    const newProgress: SavedProgress = progress ?? {
      indice: paso,
      score: 0,
      mcqAnswers: {},
      shortAnswers: {}
    };
    newProgress.mcqAnswers[pasoActual.id] = respuesta;

    // Recompute score
    let recomputedScore = 0;
    for (const p of caso.pasos) {
      if (p.tipo === 'mcq') {
        const ans = newProgress.mcqAnswers[p.id];
        if (ans) {
          const opt = (p as any).opciones.find((o: any) => o.id === ans);
          if (opt?.esCorrecta) recomputedScore += 1;
        }
      }
    }
    newProgress.score = recomputedScore;
    newProgress.indice = paso; // persist current index
    setProgress({ ...newProgress });
    localStorage.setItem(`klinikmat:case:${caso.id}`, JSON.stringify(newProgress));

    // Show feedback until user advances
    setShowFeedback(true);
  };

  const handleShortChange = (value: string) => {
    setShortLocal(value);
  };

  const handleShortSave = () => {
    const pasoActual = caso.pasos[paso];
    if (pasoActual.tipo !== 'short') return;
    const newProgress: SavedProgress = progress ?? {
      indice: paso,
      score: 0,
      mcqAnswers: {},
      shortAnswers: {}
    };
    newProgress.shortAnswers[pasoActual.id] = shortLocal;
    newProgress.indice = paso;
    setProgress(newProgress);
    localStorage.setItem(`klinikmat:case:${caso.id}`, JSON.stringify(newProgress));
    setShowFeedback(true);
  };

  const pasoActual = caso.pasos[paso];
  // For UI selection we prefer the transient local value (selectedLocal) so saved progress doesn't auto-show feedback
  const respuestaActual = pasoActual.tipo === 'mcq'
    ? (selectedLocal ?? undefined)
    : (progress?.shortAnswers[pasoActual.id] ?? undefined);

  // Selección actual y opción correcta para feedback (solo si es MCQ)
  const selectedId = selectedLocal ?? undefined;
  const correctOption = pasoActual.tipo === 'mcq' ? pasoActual.opciones.find(o => o.esCorrecta) : undefined;

  const handleJump = (i: number) => {
    if (i <= paso) {
      setPaso(i);
      setShowFeedback(false);
      setSelectedLocal(null);
    }
  };

  return (
    <div className="animate-klinik-fade">
      <div className="mb-4 flex items-center justify-between">
        <nav className="text-xs text-gray-500">
          <Link href="/casos" className="text-gray-500 hover:text-red-600">Casos</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{caso.modulo}</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">{caso.titulo}</span>
        </nav>
        <div className="text-sm text-gray-500">{caso.dificultad}</div>
      </div>

      <div className="lg:flex lg:gap-8">
        <aside className="hidden lg:block w-64">
          <CaseProgress pasos={caso.pasos} current={paso} caseId={caso.id} onNavigate={handleJump} />
          <div className="mt-4 text-xs text-gray-500">
            <button onClick={() => { clearProgress(caso.id); setProgress(null); setPaso(0); }} className="text-red-600 underline">Reiniciar caso</button>
          </div>
        </aside>

        <div className="flex-1 max-w-2xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-red-600">{caso.titulo}</h1>
          <div className="mt-2 text-sm">
            <span className="rounded-full bg-gray-100 px-2 py-1">{caso.modulo}</span>
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-1">{caso.dificultad}</span>
          </div>

          <div className="mt-4 text-gray-700">{caso.vigneta}</div>

          <div className="mt-6">
            <div className="text-sm text-gray-500">Paso {paso + 1} de {caso.pasos.length}</div>

            <div className="mt-4">
              <h3 className="text-lg font-medium">{pasoActual.enunciado}</h3>

              {pasoActual.tipo === 'mcq' ? (
                <div className="mt-4 space-y-4">
                  {pasoActual.opciones.map((opcion) => {
                    const isSelected = selectedId === opcion.id;
                    const isCorrect = !!opcion.esCorrecta;
                    return (
                      <div key={opcion.id} className="border rounded-lg p-2">
                        <button
                          onClick={() => handleMCQSelect(opcion.id)}
                          disabled={showFeedback}
                          aria-pressed={isSelected}
                          className={`w-full flex items-start justify-between gap-4 p-4 rounded-md transform transition duration-150 ${
                            isSelected ? (isCorrect ? 'bg-green-50 border-green-200 scale-100' : 'bg-red-50 border-red-200') : 'hover:bg-gray-50 border border-gray-100 hover:-translate-y-0.5'
                          }`}
                        >
                          <div className="flex-1 text-left whitespace-pre-wrap">{opcion.texto}</div>
                          <div className="shrink-0 ml-2 flex items-center">
                            {showFeedback && isSelected && isCorrect && (
                              <span className="inline-flex items-center gap-1 text-green-700 text-sm font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                                </svg>
                                Correcto
                              </span>
                            )}
                            {showFeedback && isSelected && !isCorrect && (
                              <span className="inline-flex items-center gap-1 text-red-700 text-sm font-semibold">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V6a1 1 0 112 0v3a1 1 0 01-2 0zm1 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clipRule="evenodd" />
                                </svg>
                                Incorrecto
                              </span>
                            )}
                          </div>
                        </button>
                        {showFeedback && isSelected && !isCorrect && correctOption && (
                          <div className="mt-3 w-full text-sm text-gray-700 bg-green-50 border border-green-100 rounded-md p-2">
                            <strong>Respuesta correcta:</strong> {correctOption.texto}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4">
                  <textarea
                    className="w-full p-4 border-2 rounded-lg min-h-[150px]"
                    placeholder={pasoActual.guia}
                    rows={6}
                    value={shortLocal}
                    onChange={(e) => handleShortChange(e.target.value)}
                    disabled={showFeedback}
                    aria-label="Respuesta corta"
                  />

                  <div className="mt-3 flex gap-3">
                    {!showFeedback && (
                      <button
                        onClick={handleShortSave}
                        className="px-4 py-2 rounded bg-red-600 text-white"
                      >
                        Guardar respuesta
                      </button>
                    )}

                    {showFeedback && (
                      <button
                        onClick={() => {
                          setShowFeedback(false);
                          setShortLocal('');
                          if (paso < caso.pasos.length - 1) setPaso(p => p + 1);
                        }}
                        className="px-4 py-2 rounded bg-red-600 text-white"
                      >
                        Continuar
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls for MCQ: show continue if feedback visible */}
          {pasoActual.tipo === 'mcq' && showFeedback && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setShowFeedback(false);
                  setSelectedLocal(null);
                  if (paso < caso.pasos.length - 1) setPaso(p => p + 1);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Continuar
              </button>
            </div>
          )}

          <div className="mt-8">
            <Link href="/casos" className="text-red-600 underline text-sm">← Volver a casos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}