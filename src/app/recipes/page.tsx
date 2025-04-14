'use client';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../../lib/api';
import { RecipeCards } from '../../components/RecipeCards';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [minProtein, setMinProtein] = useState('');
  const [maxProtein, setMaxProtein] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');
  const [minFat, setMinFat] = useState('');
  const [maxFat, setMaxFat] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const ingredients = search ? search.split(',').map(s => s.trim()) : [];

      const data = await fetchRecipes({
        ingredients,
        minProtein: minProtein ? parseInt(minProtein) : undefined,
        maxProtein: maxProtein ? parseInt(maxProtein) : undefined,
        minCalories: minCalories ? parseInt(minCalories) : undefined,
        maxCalories: maxCalories ? parseInt(maxCalories) : undefined,
        minFat: minFat ? parseInt(minFat) : undefined,
        maxFat: maxFat ? parseInt(maxFat) : undefined,
      });

      setRecipes(data);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    load();
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Uppskriftir</h1>

      <form onSubmit={handleSearch} className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Leita að hráefnum (egg, ostur)"
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          value={minProtein}
          onChange={(e) => setMinProtein(e.target.value)}
          placeholder="Minnst prótein"
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          value={maxProtein}
          onChange={(e) => setMaxProtein(e.target.value)}
          placeholder="Mest prótein"
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          value={minCalories}
          onChange={(e) => setMinCalories(e.target.value)}
          placeholder="Minnst kaloríur"
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          value={maxCalories}
          onChange={(e) => setMaxCalories(e.target.value)}
          placeholder="Mest kaloríur"
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          value={minFat}
          onChange={(e) => setMinFat(e.target.value)}
          placeholder="Minnst fita"
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          value={maxFat}
          onChange={(e) => setMaxFat(e.target.value)}
          placeholder="Mest fita"
          className="border px-2 py-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Leita</button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <RecipeCards recipes={recipes} />
    </div>
  );
}
