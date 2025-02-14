import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"


function LoginRegister({method = "login"}) {
    const [isLogin, setIsLogin] = useState(method === "login");
    const toggleMode = () => setIsLogin(!isLogin)

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-2 sm:p-4 md:p-8">
      <Card className="w-full max-w-[400px] sm:max-w-[440px] md:max-w-[480px] border-0 sm:border shadow-none sm:shadow">
        <CardHeader className="space-y-1 p-4 sm:p-6">
          <div className="flex justify-center mb-4">
            <img src="./assets/logo.png" alt="Flash.AI" className="w-12 h-12" />
          </div>
          <CardTitle className="text-xl sm:text-2xl text-center font-bold">{isLogin ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" required />
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" type="submit">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={toggleMode} className="text-sm sm:text-base">
              {isLogin ? "Need an account? Register" : "Already have an account? Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    );
}

export default LoginRegister;