import "./footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-black bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          <Link to="/intro" className="mr-6 hover:underline">
            Intro
          </Link>
          <Link to="/privacypolicy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
        <p className="text-center mt-4">
          &copy; {currentYear} YourWebsiteName. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
