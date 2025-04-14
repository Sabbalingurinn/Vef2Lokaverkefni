'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SignupForm = () => {
  const [form, setForm] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const err = await res.json();
      setError(err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="email" value={form.email} onChange={handleChange} placeholder="Netfang" required />
      <input name="username" value={form.username} onChange={handleChange} placeholder="Notandanafn" required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Lykilorð" required />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Stofna aðgang</button>
    </form>
  );
};
