// Server Component: muestra el caso si existe y delega la UI interactiva al Client Component
import type { ReactElement } from 'react';
import { CASOS, type Caso } from '../data';
import { CasoDetalleClient } from './CasoDetalleClient';
import ClientFallback from './ClientFallback';

export default async function CasoDetallePage({ params }: { params: { id?: string } | Promise<{ id?: string }> }) {
  const resolved = await params;
  const id = resolved?.id;

  // If no id available (client-side navigation state), render fallback which will read router params client-side
  if (!id) return <ClientFallback />;

  const caso = CASOS.find((c) => c.id === id) as Caso | undefined;

  if (!caso) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Caso no encontrado</h1>
        <p className="mt-4 text-gray-600">No se encontró el caso con ID: {String(id)}</p>
        <div className="mt-3 text-xs text-gray-500">
          <div>DEBUG: params (serialized):</div>
          <pre className="mt-1 p-2 bg-gray-100 rounded">{JSON.stringify(resolved, null, 2)}</pre>
        </div>
        <a href="/casos" className="mt-4 inline-block text-red-600 underline">
          ← Volver a la lista de casos
        </a>
      </div>
    );
  }

  // Pasamos el objeto del caso al componente cliente responsable de la interacción
  return <CasoDetalleClient caso={caso} />;
}