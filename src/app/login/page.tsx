import { LoginForm } from '../../components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl mb-4">Innskráning</h1>
      <LoginForm />
      <p className="text-sm text-gray-600 mt-4">
        Áttu ekki aðgang?{' '}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Búðu þér til aðgang hér
        </Link>
        .
      </p>
    </div>
  );
}
