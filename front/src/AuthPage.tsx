import { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {isLogin ? <LoginForm /> : <SignUpForm />}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 text-blue-500 hover:underline"
      >
        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
      </button>
    </div>
  );
};

export default AuthPage;
