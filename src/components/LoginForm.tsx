'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

    if (res.ok) {
      const data = await res.json();
      login(data.user);
      router.push('/recipes');
    } else {
      const err = await res.json();
      setError(err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Notandanafn" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Lykilorð" required />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Skrá inn</button>
    </form>
  );
};
