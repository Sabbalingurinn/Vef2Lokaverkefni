'use client';

import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../../lib/api';
import type { Recipe } from '../../lib/api';
import Link from 'next/link';

export default function MePage() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) return;
        const res = await fetchRecipes({ userId: user.id });
        setRecipes(res);
      } catch (err: any) {
        setError(err.message || 'Villa við að sækja uppskriftir.');
      }
    };
    load();
  }, [user]);

  if (!user) {
    return <p>Þú þarft að skrá þig inn til að sjá þína eigin uppskriftir.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Þínar uppskriftir!</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((r) => (
          <div key={r.id} className="border p-4 rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-lg font-bold mb-2">{r.title}</h2>
            <p>🔥 {r.calories} kaloríur</p>
            <p>🥩 {r.protein}g prótein</p>
            <p>🧈 {r.fat}g fita</p>
            <p className="text-sm text-gray-600 mt-2">
              Innihald: {r.ingredients.join(', ')}
            </p>

            <div className="mt-4">
              <Link href={`/recipes/${r.id}/edit`} className="text-blue-600 underline text-sm">
                Breyta eða eyða
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
