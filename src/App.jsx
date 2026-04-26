import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";
import { ThemeContext } from "./context/theme-context";
import Login from "./components/login/Login";
import { AuthProvider } from "./components/authWrapper/authProvider";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <AuthProvider>
      <Router>
        <div
          className={`min-h-screen flex flex-col ${
            theme === "dark"
              ? "bg-[#0B162A] text-white"
              : "bg-[#F4F7F9] text-[#0B162A]"
          }`}
        >
          <Header />

          <main className="w-full flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPostsPage />} />
              <Route path="/post/:id" element={<IndividualPostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
