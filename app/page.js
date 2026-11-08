'use client';

import { useState, useEffect } from 'react';
import { createCustomOrder } from '@/actions/orderActions';

export default function Home() {
  const [filamentColor, setFilamentColor] = useState('Negro Mate');
  const [finishType, setFinishType] = useState('bruto');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => console.error(err));
    }
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage(null);

    const formData = new FormData(event.target);
    formData.append('productId', 'sample-product-id-p1s');

    const response = await createCustomOrder(formData);
    setIsSubmitting(false);

    if (response.success) {
      setFeedbackMessage({ type: 'success', text: response.message });
    } else {
      setFeedbackMessage({ type: 'error', text: response.error || response.message });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Tienda 3D - Bambu Lab P1S</h1>
        <p className="text-sm text-gray-500 mb-8">
          Personaliza tu figura 3D con acabados artesanales. Altura máxima: 23 cm.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color de Filamento Base:
            </label>
            <select
              name="filamentColor"
              value={filamentColor}
              onChange={(e) => setFilamentColor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Negro Mate">Negro Mate (PLA Basic)</option>
              <option value="Blanco Nieve">Blanco Nieve (PLA Basic)</option>
              <option value="Gris Metalizado">Gris Metalizado (PETG)</option>
              <option value="Rojo Fuego">Rojo Fuego (PLA Basic)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Acabado Manual:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className={`p-4 border rounded-lg cursor-pointer text-center ${finishType === 'bruto' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                <input type="radio" name="finishId" value="bruto" checked={finishType === 'bruto'} onChange={() => setFinishType('bruto')} className="sr-only" />
                <span className="block font-semibold text-gray-800">Filamento Puro</span>
                <span className="block text-xs text-gray-500 mt-1">Limpio sin soportes</span>
              </label>
              <label className={`p-4 border rounded-lg cursor-pointer text-center ${finishType === 'preparado' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                <input type="radio" name="finishId" value="preparado" checked={finishType === 'preparado'} onChange={() => setFinishType('preparado')} className="sr-only" />
                <span className="block font-semibold text-gray-800">Lijado + Primer</span>
                <span className="block text-xs text-gray-500 mt-1">Listo para pintar</span>
              </label>
              <label className={`p-4 border rounded-lg cursor-pointer text-center ${finishType === 'pintado' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'}`}>
                <input type="radio" name="finishId" value="pintado" checked={finishType === 'pintado'} onChange={() => setFinishType('pintado')} className="sr-only" />
                <span className="block font-semibold text-gray-800">Full Pintado</span>
                <span className="block text-xs text-gray-500 mt-1">Acabado artístico</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sube tu archivo 3D (.stl, .obj, .3mf) o imagen:
            </label>
            <input
              type="file"
              name="stlFile"
              accept=".stl,.obj,.3mf,.png,.jpg,.jpeg"
              required
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Subiendo archivo a la nube...' : 'Enviar para Revisión y Cotización'}
          </button>

          {feedbackMessage && (
            <div className={`p-4 rounded-lg text-sm font-medium ${feedbackMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {feedbackMessage.text}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}