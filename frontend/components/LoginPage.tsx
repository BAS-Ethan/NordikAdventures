import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Mountain } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = login(email, password);
      if (success) {
        onLoginSuccess();
      } else {
        setError('Email ou mot de passe invalide');
      }
    } else {
      if (!name.trim()) {
        setError('Le nom est requis');
        return;
      }
      const success = signup(email, password, name);
      if (success) {
        onLoginSuccess();
      } else {
        setError('Cet email est déjà utilisé');
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-linear-to-r from-emerald-700 to-teal-600 text-white p-4 rounded-full">
              <Mountain className="w-10 h-10" />
            </div>
          </div>
          <CardTitle className="text-2xl">Nordik Adventures</CardTitle>
          <CardDescription>
            {isLogin ? 'Connectez-vous à votre compte' : 'Créer un nouveau compte'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jean Dupont"
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Courriel</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-linear-to-r from-emerald-700 to-teal-600">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-emerald-700 hover:underline"
              >
                {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <p className="font-semibold text-slate-700">Comptes de test:</p>
                <p>👨‍💼 Admin: admin@nordik.ca / admin123</p>
                <p>👤 Employé: employe@nordik.ca / emp123</p>
                <p>🛒 Client: client@example.com / client123</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}