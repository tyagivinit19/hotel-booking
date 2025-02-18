import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  console.log("header");

  useEffect(() => {
    console.log("Header mounted or isLoggedIn changed");
  }, [isLoggedIn]);

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="my-bookings">My Bookings</Link>
              <Link to="my-hotels">My Hotels</Link>
              <button className="">Sign out</button>
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
