import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email,
      password,
      callbackUrl: `/`,
    });
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-96 mx-auto mt-4">
        <div className="mb-6 text-2xl text-center text-dark-bg-text-1">
          Sign in to Augur
        </div>
        <form
          className="flex flex-col p-4 rounded border border-dark-bg-border"
          onSubmit={handleLogin}
        >
          <label className="text-dark-bg-text-1 pb-2" htmlFor="email">
            Email address
          </label>
          <input
            className="h-8 p-2 rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="pb-2 pt-4 text-dark-bg-text-1" htmlFor="password">
            Password
          </label>
          <input
            className="h-8 p-2 rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded mt-4 h-8 bg-dark-theme-green text-dark-surface-text"
            type="submit"
          >
            Sign in
          </button>
          {router.query.error && (
            <p className="mt-4 text-sm text-center text-dark-nav-underline">
              Invalid email or password. Try again.
            </p>
          )}
        </form>
        <div className="flex justify-center items-center mt-4 h-14 rounded border border-dark-bg-border">
          <label className="text-dark-bg-text-1 mr-2">New to Augur? </label>
          <Link className="text-dark-theme-blue" href="/auth/signup">
            Create an account.
          </Link>
        </div>
      </div>
    </div>
  );
}
