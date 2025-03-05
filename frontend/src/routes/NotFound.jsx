import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="position:relative w-32 h-32">
        <img src="./assets/logo.png" alt="Flash.Ai" className="w-32 h-32" />
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,rgb(255,231,113)_45%,#ffffff_50%,rgb(255,231,113)_55%)] bg-[length:250%_100%] pb-4">
        404
      </h1>
      <p className="text-lg text-center">The page you are looking for does not exist.</p>
      <p className="text-lg text-center text-neutral-400 dark:textneutral-800">If you think this is a mistake, please contact support.</p>
      <Button onClick={() => {
        if (localStorage.getItem("username")) {
          navigate("/dashboard");
          window.location.reload();
          } else {
            navigate("/")
          }
        }
      } className="mt-4">
        Go back
      </Button>
    </div>
  );
}

export default NotFound;