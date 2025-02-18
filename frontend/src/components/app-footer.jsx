const footerRoutes = [
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
  { title: "Sign Up", href: "/register" },
]

function AppFooter() {
  return (
    <footer className="py-8 text-center bg-white dark:bg-neutral-900 border-t border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-gray-100 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <p>&copy; 2025 Flash.AI.</p>
        <div className="space-x-4">
          {footerRoutes.map((route) => (
            <a key={route.title} href={route.href}>
              <button className="text-gray-900 dark:text-gray-100 transition-colors hover:text-primary dark:hover:text-primary">
                {route.title}
              </button>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
