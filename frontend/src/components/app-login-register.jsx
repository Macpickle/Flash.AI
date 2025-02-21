import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import AxiosRequest from "@/utils/Axios";
import PropTypes from "prop-types";
import { LuCircleX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginRegister({ method = "login" }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const isLogin = method === "login";

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, keepLoggedIn } = e.target; // get form fields

    // error handling
    if ((!isLogin && !username.value) || !password.value || !email.value) {
      setError("All fields are required");
      return;
    }

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Invalid email Format");
      return;
    }

    // group data to send to server
    const data = {
      username: username?.value,
      email: email.value,
      password: password.value,
      keepLoggedIn: keepLoggedIn?.checked,
    };

    // send data to server
    AxiosRequest({
      url: method === "login" ? "/api/auth/login" : "/api/auth/register",
      method: "post",
      data: data,
    })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("theme", response.data.user.theme ? "dark" : "light");
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handleInputChange = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <header className="w-full py-4 px-8 text-black flex flex-row items-center gap-1">
        <img src="./assets/logo.png" alt="Flash.Ai" className="w-12 h-12" />
        <h2 className="text-2xl font-bold text-primary">Flash.Ai</h2>
      </header>
      <div className="flex justify-center items-center w-full flex-grow">
        <Card className="w-full max-w-md border-none shadow-none sm:border-0 sm:shadow-none lg:border lg:shadow-lg lg:h-[500px] dark:bg-neutral-900">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl">{isLogin ? "Login" : "Register"}</CardTitle>
          </CardHeader>
          <CardContent>
            <h4>{isLogin ? "Welcome Back" : "Welcome"} to Flash.Ai!</h4>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mt-2 flex items-center" role="alert">
                <LuCircleX className="mr-2 text-2xl" />
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <form onSubmit={onSubmit} className="flex flex-col gap-2 mt-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    name="username" 
                    type="text" 
                    placeholder="Username" 
                    maxLength="20" 
                    minLength="3"
                    className="dark:border-neutral-600"
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="Email" 
                  className="dark:border-neutral-600"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                  minLength="6"
                  className="dark:border-neutral-600"
                  onChange={handleInputChange}
                />
              </div>
              {isLogin && (
                <div>
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              )}

              {isLogin && (
                <div className = "flex items-center">
                  <Input id="keepLoggedIn" name="keepLoggedIn" type="checkbox" className="mr-2 w-4" />
                  <Label htmlFor="keepLoggedIn" className="text-md">Keep me logged in</Label>
                </div>
              )}

              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Register"}
              </Button>
            </form>

            <div className="mt-4">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Link to={isLogin ? "/register" : "/login"} className="text-primary ml-1 hover:underline">
                  {isLogin ? "Register" : "Login"}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

LoginRegister.propTypes = {
  method: PropTypes.string,
};

export default LoginRegister;
