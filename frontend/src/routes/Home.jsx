import AppNavbar from "@/components/app-navbar";
import AppFooter from "@/components/app-footer";
import { Button } from "@/components/ui/button";
import { LuGlobe, LuBrain, LuChartLine } from "react-icons/lu"; // Importing icons
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <AppNavbar />
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,rgb(255,231,113)_45%,#ffffff_50%,rgb(255,231,113)_55%)] bg-[length:250%_100%] pb-4">
                        Master your studying with AI
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">Transform your study materials into interactive quizzes. Learn smarter, not harder with Flash.AI's intelligent learning platform.</p>

                    <div className="mt-8 flex justify-center">
                        <Link to="/register">
                            <Button href="/register" className="w-48 h-12 text-lg hover:bg-secondary">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 dark:bg-gray-900 py-20 text-gray-900 dark:text-gray-100">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-primary">Features</h2>
                    <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">Flash.AI is packed with features that will help you learn more effectively.</p>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent hover:border-primary hover:scale-105 hover:shadow-lg transition-transform duration-300">
                            <LuGlobe className="text-primary text-3xl" /> 
                            <h3 className="text-xl font-bold text-primary">Anywhere Access</h3>
                            <p className="text-gray-700 dark:text-gray-400">Upload your files (TXT, PDF, DOC, etc.) and access them anytime, anywhere.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent hover:border-primary hover:scale-105 hover:shadow-lg transition-transform duration-300">
                            <LuBrain className="text-primary text-3xl" />
                            <h3 className="text-xl font-bold text-primary">AI-Generated Quizzes</h3>
                            <p className="text-gray-700 dark:text-gray-400">Turn your documents into custom quizzes with adaptive difficulty levels.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-transparent hover:border-primary hover:scale-105 hover:shadow-lg transition-transform duration-300">
                            <LuChartLine className="text-primary text-3xl" />
                            <h3 className="text-xl font-bold text-primary">Progress Tracking</h3>
                            <p className="text-gray-700 dark:text-gray-400">Get instant insights to track your progress and improve your performance.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 text-center px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/2">
                        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" alt="Study with AI" className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700" />
                    </div>
                    <div className="w-full md:w-1/2 text-left">
                        <h2 className="text-2xl md:text-4xl font-bold text-primary">Why Choose Flash.AI?</h2>
                        <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">Flash.AI leverages the power of artificial intelligence to transform your study experience. With our platform, you can create personalized quizzes, track your progress, and access your study materials from anywhere.</p>
                        <div className="mt-8 flex space-x-4">
                            <Link to="/register">
                                <Button href="/register" className="w-48 h-12 text-lg hover:bg-secondary">Sign Up</Button>
                            </Link>
                            <Button href="/demo" className="w-48 h-12 text-lg bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600">Watch Demo</Button>
                        </div>
                    </div>
                </div>
            </section>
            <AppFooter />
        </div>
    );
}

export default Home;