// app/recipes/[id]/page.tsx

import { fetchRecipeById } from '../../../lib/api';
import { notFound } from 'next/navigation';

type RecipePageProps = {
  params: { id: string };
};

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await fetchRecipeById(params.id);

  if (!recipe) return notFound();

  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

      <section className="mb-4">
        <p>🔥 <strong>{recipe.calories}</strong> kaloríur</p>
        <p>🥩 <strong>{recipe.protein}g</strong> prótein</p>
        <p>🧈 <strong>{recipe.fat}g</strong> fita</p>
      </section>

      <section className="mb-4">
        <h2 className="font-semibold text-lg mb-1">Innihald:</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((item: string) => (
            <li key={item}>{item}</li>
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
