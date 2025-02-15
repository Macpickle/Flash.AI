import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"


function LoginRegister({method = "login"}) {
    const [isLogin, setIsLogin] = useState(method === "login");

    return (
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-8">
      <Card className="w-full max-w-[400px] sm:max-w-[440px] md:max-w-[480px] border-0 sm:border shadow-none sm:shadow bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <div className="flex justify-center mb-4">
            <img src="./assets/logo.png" alt="Flash.AI" className="w-12 h-12" />
          </div>
          <CardTitle className="text-xl sm:text-2xl text-center font-bold dark:text-gray-300 dark:focus:border-primary">{isLogin ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name" className = "dark:text-gray-400">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter your name" 
                  className="text-sm sm:text-base border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-primary"
                  required />
              </div>
            )}
            <div>
              <Label htmlFor="email" className = "dark:text-gray-400">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                className="text-sm sm:text-base border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 focus:border-primary dark:focus:border-primary"
                required />
            </div>
            <div>
              <Label htmlFor="password" className = "dark:text-gray-400">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                className="text-sm sm:text-base border-gray-300 dark:border-neutral-700 dark:bg-neutral-800"
                required />
            </div>
            <Button className="w-full" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center gap-0">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link to={isLogin ? "/register" : "/login"} className="text-primary font-bold hover:underline">
                {isLogin ? "Register" : "Login"}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
    );
}

export default LoginRegister;