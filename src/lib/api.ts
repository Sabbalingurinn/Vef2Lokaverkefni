// lib/api.ts

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://apilokaverkefni-1.onrender.com';

export type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  calories: number;
  protein: number;
  fat: number;
  userId: string;
  createdAt: string;
};

export type RecipeSearchParams = {
  ingredients?: string[];
  minCalories?: number;
  maxCalories?: number;
  minProtein?: number;
  maxProtein?: number;
  minFat?: number;
  maxFat?: number;
  userId?: string;
};

export async function fetchRecipes(params: RecipeSearchParams = {}): Promise<Recipe[]> {
  const searchParams = new URLSearchParams();

  if (params.ingredients?.length) {
    searchParams.append('ingredients', params.ingredients.join(','));
  }

  if (params.userId) {
    searchParams.append('userId', params.userId);
  }

  const appendNum = (key: string, value: number | undefined) => {
    if (typeof value === 'number' && !isNaN(value)) {
      searchParams.append(key, value.toString());
    }
  };

  appendNum('minCalories', params.minCalories);
  appendNum('maxCalories', params.maxCalories);
  appendNum('minProtein', params.minProtein);
  appendNum('maxProtein', params.maxProtein);
  appendNum('minFat', params.minFat);
  appendNum('maxFat', params.maxFat);

  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';

  const res = await fetch(`${API_BASE}/recipes${query}`);
  if (!res.ok) throw new Error('Tókst ekki að sækja uppskriftir');
  return res.json();
}

export async function fetchRecipeById(id: string): Promise<Recipe> {
  const res = await fetch(`${API_BASE}/recipes/${id}`);

  if (!res.ok) {
    throw new Error(`Uppskrift fannst ekki (id: ${id})`);
  }

  return res.json();
}

export async function updateRecipe(id: string, updatedData: Partial<Recipe>): Promise<Recipe> {
    const res = await fetch(`${API_BASE}/recipes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error('Tókst ekki að uppfæra uppskrift');
    return res.json();
  }
  
  export async function deleteRecipe(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/recipes/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Tókst ekki að eyða uppskrift');
  }
  
