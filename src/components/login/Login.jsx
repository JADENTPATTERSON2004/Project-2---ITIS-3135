import React, { useState, useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { useAuth } from '../authWrapper/authContext'

function Login() {
  const { login } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    login(userData.username);
  };

  return (
    <section
      className={`mx-auto max-w-2xl rounded-2xl border p-8 shadow-sm ${
        theme === "dark"
          ? "border-gray-700 bg-gray-800"
          : "border-gray-200 bg-white"
      }`}
    >
      <h2
        className={`mb-6 text-3xl font-bold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Login
      </h2>

      <form className="space-y-5" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
          className={`w-full rounded-lg border px-4 py-3 ${
            theme === "dark"
              ? "border-gray-600 bg-gray-900 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className={`w-full rounded-lg border px-4 py-3 ${
            theme === "dark"
              ? "border-gray-600 bg-gray-900 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default Login
