"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
      <div className="navigation">
        <nav className="nav">
          <ul>
            <li>
              <Link href="/">Heim</Link>
            </li>
            <li>
              <Link href="/recipes">Uppskriftir</Link>
            </li>
            <li>
              <Link href="/create">Ný uppskrift</Link>
            </li>
          </ul>
        </nav>
        <div>
          {!user ? (
            <Link href="/login">Innskráning</Link>
          ) : (
            <div className="user">
              <Link href={`/me`} className="text-blue-600 hover:underline">
                {user.username}
              </Link>
              <button onClick={logout} className="logoutButton">
                Útskrá
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
