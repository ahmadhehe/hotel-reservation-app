  "use client";
  import { useState } from 'react';
  import Link from 'next/link';
  import { FormEvent } from 'react';

  export default function SignIn() {
    // State variables to manage form data and messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // To show error messages
    const [successMessage, setSuccessMessage] = useState(''); // To show success messages
    const [isLoading, setIsLoading] = useState(false); // To show loading state

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true); // Set loading statef
      setErrorMessage(''); // Reset error message
      setSuccessMessage(''); // Reset success message

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Send email and password
        });

        const data = await response.json();

        setIsLoading(false);

        if (response.ok) {
          setSuccessMessage('Signed in successfully!');
          setErrorMessage('');
          // Optionally redirect user upon success:
          // Router.push('/dashboard') or handle successful login flow
        } else {
          setErrorMessage(data.message || 'Invalid email or password');
          setSuccessMessage('');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred while signing in. Please try again.');
        setIsLoading(false);
      }
    };

    return (
      <>
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Sign in to your account</h1>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 text-green-600">
            {successMessage}
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 text-red-600">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-input w-full py-2"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="corybarker@email.com"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="form-input w-full py-2"
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            {/* Disable button while loading */}
            <button
              type="submit"
              className={`btn w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Bottom link */}
        <div className="mt-6 text-center">
          <Link className="text-sm text-gray-700 underline hover:no-underline" href="/reset-password">
            Forgot password
          </Link>
        </div>
      </>
    );
  }
