'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {
  fetchRecipeById,
  updateRecipe,
  deleteRecipe,
  type Recipe,
} from '../lib/api';

type EditableRecipe = Omit<Recipe, 'ingredients'> & { ingredients: string };

export default function EditRecipeClient({ id }: { id: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<EditableRecipe | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const recipe = await fetchRecipeById(id);
        if (user?.id !== recipe.userId) {
          setError('Þú hefur ekki aðgang að þessari uppskrift.');
        } else {
          setForm({
            ...recipe,
            ingredients: recipe.ingredients.join(', '),
          });
        }
      } catch (err: any) {
        setError(err.message || 'Villa við að sækja uppskrift.');
      }
    };
    load();
  }, [id, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    const newValue =
      name === 'calories' || name === 'protein' || name === 'fat'
        ? Number(value)
        : value;
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form || !user) return;

    await updateRecipe(form.id, {
      ...form,
      ingredients: form.ingredients
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    });

    router.push('/me');
  };

  const handleDelete = async () => {
    if (!form) return;
    if (confirm('Ertu viss um að þú viljir eyða þessari uppskrift?')) {
      await deleteRecipe(form.id);
      router.push('/me');
    }
  };

  if (error) return <p className="text-red-600 font-semibold">{error}</p>;
  if (!form) return <p>Sæki gögn...</p>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto mt-10">
      <h1 className="text-xl font-bold">Breyta uppskrift</h1>

      <input name="title" value={form.title} onChange={handleChange} required />
      <textarea
        name="ingredients"
        value={form.ingredients}
        onChange={handleChange}
        required
        placeholder="Innihald (aðgreint með kommum)"
      />
      <textarea
        name="instructions"
        value={form.instructions}
        onChange={handleChange}
        required
      />
      <input
        name="calories"
        type="number"
        value={form.calories}
        onChange={handleChange}
        placeholder="Kaloríur"
      />
      <input
        name="protein"
        type="number"
        value={form.protein}
        onChange={handleChange}
        placeholder="Prótein"
      />
      <input
        name="fat"
        type="number"
        value={form.fat}
        onChange={handleChange}
        placeholder="Fita"
      />

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Vista
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Eyða
        </button>
      </div>
    </form>
  );
}
