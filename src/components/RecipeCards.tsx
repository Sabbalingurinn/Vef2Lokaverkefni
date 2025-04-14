import Link from 'next/link';
import type { Recipe } from '../lib/api';

export const RecipeCards = ({ recipes }: { recipes: Recipe[] }) => {
  if (recipes.length === 0) return <p>Engar uppskriftir fundust.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recipes.map((r) => (
        <div
          key={r.id}
          className="border p-4 rounded shadow hover:bg-gray-50 transition"
        >
          <Link href={`/recipes/${r.id}`}>
            <h2 className="text-lg font-bold mb-2 hover:underline">{r.title}</h2>
          </Link>
          <p>🔥 {r.calories} kaloríur</p>
          <p>🥩 {r.protein}g prótein</p>
          <p>🧈 {r.fat}g fita</p>
          <p className="text-sm text-gray-600 mt-2">Innihald: {r.ingredients.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};
