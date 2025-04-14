'use client';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export const RecipeForm = () => {
  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    calories: '',
    protein: '',
    fat: '',
  });

  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        ingredients: form.ingredients.split(',').map((s) => s.trim()),
        instructions: form.instructions,
        calories: parseInt(form.calories),
        protein: parseInt(form.protein),
        fat: parseInt(form.fat),
        userId: user.id,
      }),
    });

    if (res.ok) {
      router.push('/recipes');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Titill"
        required
      />
      <textarea
        name="ingredients"
        value={form.ingredients}
        onChange={handleChange}
        placeholder="Innihald (aðgreint með kommum)"
        required
      />
      <textarea
        name="instructions"
        value={form.instructions}
        onChange={handleChange}
        placeholder="Leiðbeiningar"
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
        placeholder="Prótein (g)"
      />
      <input
        name="fat"
        type="number"
        value={form.fat}
        onChange={handleChange}
        placeholder="Fita (g)"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Vista uppskrift
      </button>
    </form>
  );
};
