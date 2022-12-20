import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);

  const onUsernameChange = async (event) => {
    event.preventDefault();
    setUsername(event.target.value);

    const res = await fetch(`/api/signup/username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.target.value,
      }),
    });
    const { available } = await res.json();
    setUsernameAvailable(available);
  };

  const onEmailChange = async (event) => {
    event.preventDefault();
    setEmail(event.target.value);

    const res = await fetch(`/api/signup/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.target.value,
      }),
    });
    const { available } = await res.json();
    setEmailAvailable(available);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!usernameAvailable || !emailAvailable) {
      return;
    }

    const res = await fetch("/api/signup/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
    });

    const { success } = await res.json();

    if (success) {
      signIn("credentials", {
        email,
        password,
        callbackUrl: `/${username}`,
      });
    }
  };

  return (
    <div className="flex justify-center p-4">
      <div className="w-96 mx-auto mt-4">
        <div className="mb-6 text-2xl text-center text-dark-bg-text-1">
          Sign up to Augur
        </div>
        <form
          className="flex flex-col p-4 rounded border border-dark-bg-border"
          onSubmit={handleSignUp}
        >
          <div className="flex">
            <div className="basis-1/2 pr-2">
              <label className="pb-2 text-dark-bg-text-1" htmlFor="firstName">
                First name
              </label>
              <input
                className="h-8 p-2 w-full shrink rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
                id="firstName"
                type="text"
                pattern="[a-zA-Z]{1,16}"
                title="Must contain only letters. (16 max)"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="basis-1/2 pl-2">
              <label
                className="pb-2 pt-4 text-dark-bg-text-1"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                className="h-8 p-2 w-full rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
                id="lastName"
                type="text"
                pattern="[a-zA-Z]{1,16}"
                title="Must contain only letters. (16 max)"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <label className="pb-2 pt-4 text-dark-bg-text-1" htmlFor="username">
              Username
            </label>
            {!usernameAvailable && (
              <div className="pb-2 pt-4 text-xs text-dark-nav-underline">
                Taken, try another.
              </div>
            )}
          </div>
          <input
            className="h-8 p-2 rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
            id="username"
            type="text"
            pattern="[a-zA-Z0-9]{4,16}"
            title="Must be alphanumeric. (4-16 characters)"
            value={username}
            onChange={onUsernameChange}
          />
          <div className="flex justify-between items-end">
            <label className="pb-2 pt-4 text-dark-bg-text-1" htmlFor="email">
              Email address
            </label>
            {!emailAvailable && (
              <div className="pb-2 pt-4 text-xs text-dark-nav-underline">
                Taken, try another.
              </div>
            )}
          </div>
          <input
            className="h-8 p-2 rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
          />
          <label className="pb-2 pt-4 text-dark-bg-text-1" htmlFor="password">
            Password
          </label>
          <input
            className="h-8 p-2 rounded caret-dark-bg-text-1 text-dark-bg-text-1 bg-dark-bg border border-dark-bg-border"
            id="password"
            type="password"
            pattern="[\S]{8,16}"
            title="Must be between 8-16 characters. No spaces, tabs, or returns."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="rounded mt-4 h-8 bg-dark-theme-green text-dark-surface-text"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <div className="flex justify-center items-center mt-4 h-14 rounded border border-dark-bg-border">
          <label className="text-dark-bg-text-1 mr-2">
            Already have an account?{" "}
          </label>
          <Link className="text-dark-theme-blue" href="/auth/signin">
            Sign In.
          </Link>
        </div>
      </div>
    </div>
  );
}

// <div className="bg-slate-500">
//   <h1>Register</h1>

//   <form onSubmit={registerUser}>
//     <label>
//       First Name:{" "}
//       <input
//         type="text"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//       />
//     </label>
//     <label>
//       Last Name:{" "}
//       <input
//         type="text"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//       />
//     </label>
//     <label>
//       Username:{" "}
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//     </label>
//     <label>
//       Email:{" "}
//       <input
//         type="text"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </label>
//     <label>
//       Password:{" "}
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//     </label>
//     <button type="submit">Submit</button>
//   </form>
// </div>
