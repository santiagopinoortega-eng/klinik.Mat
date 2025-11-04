"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CASOS } from '../data';
import { CasoDetalleClient } from './CasoDetalleClient';

export default function ClientFallback() {
  const params = useParams();
  const [caso, setCaso] = useState<typeof CASOS[0] | null>(null);

  useEffect(() => {
    const id = params?.id as string | undefined;
    if (!id) return;
    const found = CASOS.find((c) => c.id === id) ?? null;
    setCaso(found);
  }, [params]);

  if (caso === null) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-700">Cargando caso...</h1>
        <p className="mt-2 text-sm text-gray-500">Obteniendo ID desde la ruta cliente...</p>
      </div>
    );
  }

  if (!caso) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Caso no encontrado</h1>
        <p className="mt-4 text-gray-600">No se encontró el caso con ID en la ruta cliente.</p>
        <a href="/casos" className="mt-4 inline-block text-red-600 underline">← Volver a la lista de casos</a>
      </div>
    );
  }

  return <CasoDetalleClient caso={caso} />;
}
