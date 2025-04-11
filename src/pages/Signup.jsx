import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, {
        username,
        email,
        password,
      });

      toast.success("Signup successful! 🎉 You can now login.");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Try again. ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Signup 📝</h1>
      <form
        onSubmit={handleSignup}
        className="bg-base-200 p-6 rounded-lg flex flex-col gap-4 w-full max-w-sm"
      >
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" className="btn btn-success">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
