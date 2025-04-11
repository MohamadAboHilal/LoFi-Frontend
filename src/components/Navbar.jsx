import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const token = localStorage.getItem("token-LoFi");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token-LoFi");
    toast.success("Logged out successfully! 👋");
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-200 px-8">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          Lo-Fi Radio
        </Link>
      </div>

      <div className="flex gap-2">
        <Link to="/" className="btn btn-ghost btn-sm">
          Home
        </Link>

        {token ? (
          <>
            <Link to="/favorites" className="btn btn-ghost btn-sm">
              Favorites
            </Link>
            <button
              onClick={handleLogout}
              className="btn btn-ghost btn-sm text-red-400"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-ghost btn-sm ">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
