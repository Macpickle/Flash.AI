import AppNavbar from "@/components/app-navbar";
import AppFooter from "@/components/app-footer";
import { Button } from "@/components/ui/button";
import { LuGlobe, LuBrain, LuChartLine } from "react-icons/lu"; // Importing icons
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [sentEmail, setSentEmail] = useState(false);
  
  const submitFeedback = (e) => { 
    e.preventDefault();

    const { user_name, user_email, message } = e.target;

    if (!user_name.value || !user_email.value || !message.value) {
      return;
    }

    setSentEmail(true);
    const form = new FormData();
    form.append('user_name', user_name.value);
    form.append('user_email', user_email.value);
    form.append('message', message.value);

    axios.post('https://usebasin.com/f/2c2b74a3d330', form)

    emailjs.init('aOysZsoRumWB86JNZ');
    emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, 'template_z8fc0om', e.target)
      .then(() => {}, (error) => {
          console.log(error.text);
      });
  }

  return (
    <div>
      <AppNavbar />
      <section className="pt-32 pb-20 px-4" id="home">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,rgb(255,231,113)_45%,#ffffff_50%,rgb(255,231,113)_55%)] bg-[length:250%_100%] pb-4">
            Master your studying with AI
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Transform your study materials into interactive quizzes. Learn
            smarter, not harder with Flash.Ai&apos;s intelligent learning
            platform.
          </p>

          <div className="mt-8 flex justify-center">
            <Link to="/register">
              <Button
                href="/register"
                className="w-48 h-12 text-lg hover:bg-secondary"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-neutral-950 py-20 text-gray-900 dark:text-gray-100">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-primary">
            Features
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
            Flash.Ai is packed with features that will help you learn more
            effectively.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col cursor-pointer items-center space-y-4 p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-transparent hover:border-primary hover:scale-105 hover:shadow-lg transition-transform duration-300">
              <LuGlobe className="text-primary text-3xl" />
              <h3 className="text-xl font-bold text-primary">
                Anywhere Access
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                Upload your files (TXT, PDF, DOC, etc.) and access them anytime,
                anywhere.
              </p>
            </div>
            <div className="flex flex-col cursor-pointer items-center space-y-4 p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-transparent hover:border-primary hover:scale-105 hover:shadow-lg transition-transform duration-300">
              <LuBrain className="text-primary text-3xl" />
              <h3 className="text-xl font-bold text-primary">
                AI-Generated Quizzes
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                Turn your documents into custom quizzes with adaptive difficulty
                levels.
              </p>
            </div>
            <div className="flex flex-col cursor-pointer items-center space-y-4 p-6 bg-white dark:bg-neutral-900 rounded-lg shadow-md border border-transparent hover:border-primary hover:scale-105 hover:shadow-lg transition-transform duration-300">
              <LuChartLine className="text-primary text-3xl" />
              <h3 className="text-xl font-bold text-primary">
                Progress Tracking
              </h3>
              <p className="text-gray-700 dark:text-gray-400">
                Get instant insights to track your progress and improve your
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 text-center px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
              alt="Study with AI"
              className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">
              Why Choose Flash.Ai?
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
              Flash.Ai leverages the power of artificial intelligence to
              transform your study experience. With our platform, you can create
              personalized quizzes, track your progress, and access your study
              materials from anywhere.
            </p>
            <div className="mt-8 flex space-x-4">
              <Link to="/register">
                <Button href="/register" className="w-48 h-12 text-lg">
                  Sign Up
                </Button>
              </Link>
              <Button
                href="/demo"
                className="w-48 h-12 text-lg bg-white text-gray-900 dark:bg-neutral-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-neutral-600"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 dark:bg-neutral-950 py-20 text-center px-4" id="about">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2 text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-primary">
              About Flash.Ai
            </h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
              Originally developed in a team of 2 as a project for <Link to="https://hackhive.ca/" className="text-secondary hover:underline">HackHive 2025</Link>, where we ranked second out of 86 teams, 
              the initial idea behind the project was driven by our desire to create a platform that would help students learn more effectively. The competition pushed us to develop something not only function but would also leave a mark.
              But this was just the start. 
              <br/>Since then, we&apos;ve been focusing on scaling the project across numerous areas. From a simple, single-purpose solution, is now evolving into a more robust and scalable product. We’ve been refining the technology stack, incorporating user feedback, and adding features that enhance the overall user experience. 
              The competition was the perfect testing ground, but now, we&apos;re looking at broader applications for our project, hoping to deploy it at a larger scale.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="src/assets/thegoats.JPG"
              alt="About Flash.Ai"
              className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </section>
      <section className="py-20 text-center px-4" id="contact">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-primary">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-400">
            We would love to hear your feedback and suggestions. Please fill out the form below to get in touch with us.
          </p>
          { sentEmail ? ( 
            <p className="text-primary">Email sent successfully! Thank you!</p> 
          ) : (
            <form className="mt-8 space-y-4 w-1/2 mx-auto" onSubmit={(e) => submitFeedback(e)}>
              <div>
                <label htmlFor="user_name" className="block text-left text-gray-700 dark:text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="user_name"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-900 dark:text-gray-100"
                  placeholder="Your Name"
                  name="user_name"
                />
              </div>
              <div>
                <label htmlFor="user_email" className="block text-left text-gray-700 dark:text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="user_email"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-900 dark:text-gray-100"
                  placeholder="Your Email"
                  name="user_email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-left text-gray-700 dark:text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:bg-neutral-900 dark:text-gray-100"
                  placeholder="Your Message"
                  rows="4"
                  name="message"
                ></textarea>
              </div>
              <Button type="submit" className="w-full h-12 text-lg">
                Submit
              </Button>
            </form>
          )}
        </div>
      </section>
      <AppFooter />
    </div>
  );
}

export default Home;
