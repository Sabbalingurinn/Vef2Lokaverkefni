import { fetchRecipeById } from '../../../lib/api';
import type { Recipe } from '../../../lib/api';

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let recipe: Recipe;
  try {
    recipe = await fetchRecipeById(id);
  } catch (err) {
    return (
      <div>
        <h1 className="text-xl font-semibold text-red-600 mb-2">Villa</h1>
        <p>Uppskrift fannst ekki eða villa kom upp.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

      <section className="mb-4">
        <p>🔥 Kaloríur: <strong>{recipe.calories}</strong></p>
        <p>🥩 Prótein: <strong>{recipe.protein}g</strong></p>
        <p>🧈 Fita: <strong>{recipe.fat}g</strong></p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Innihald:</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-1">Leiðbeiningar:</h2>
        <p>{recipe.instructions}</p>
      </section>
    </div>
  );
}
