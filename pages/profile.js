import Head from "next/head";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const initialFormState = {
  firstName: "",
  lastName: "",
  username: "",
};

// THIS PAGE NEEDS TO BE BLOCKED EXCEPT FOR PEOPLE WITH A SESSION AND NO PROFILE!!!!

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileData = {
      userId: user.id,
      username: formState.username.toLowerCase(),
      firstName: formState.firstName,
      lastName: formState.lastName,
    };

    const res = await fetch("/api/profile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    router.push(`/${profileData.username}`, undefined, { shallow: true });
  };
  return (
    <>
      <Head>
        <title>Augur - Predict</title>
      </Head>
      <div className="w-full max-w-lg m-auto pt-4 md:pt-16 px-2">
        <form
          className="bg-white px-4 pt-6 pb-8 mb-4 rounded-xl bg-dark-theme-2 border border-dark-theme-border"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center mb-6 text-2xl font-bold text-white">
            Profile
          </h1>
          <div className="flex my-4">
            <input
              className="basis-1/2 min-w-0 shadow appearance-none border rounded py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formState.firstName.value}
              onChange={handleInputChange}
            />

            <input
              className="basis-1/2 min-w-0 shadow appearance-none border rounded py-2 px-3 ml-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formState.lastName.value}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="username"
              placeholder="Username"
              value={formState.username.value}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <div className="w-full px-6 my-2">
              <button
                className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
