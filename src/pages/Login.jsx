import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      const { token } = res.data;
      localStorage.setItem("token-LoFi", token);
      toast.success("Login successful! 🎉");

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials. ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Login 🔑</h1>
      <form
        onSubmit={handleLogin}
        className="bg-base-200 p-6 rounded-lg flex flex-col gap-4 w-full max-w-sm"
      >
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
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        {/* Small signup text */}
        <div className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
