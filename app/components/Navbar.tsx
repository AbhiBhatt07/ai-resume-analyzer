// ============= Navbar.tsx =============
import { Link } from 'react-router';
import { Upload } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-white">RESUMIND</p>
      </Link>
      <Link to="/upload" className="primary-button w-auto flex items-center gap-2">
        <Upload className="w-4 h-4" />
        Upload Resume
      </Link>
    </nav>
  );
};

export default Navbar;