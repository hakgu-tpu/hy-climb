import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav className="h-[52px] bg-white border-b border-zinc-200 flex items-center px-4 sticky top-0 z-10">
    <Link to="/" className="text-[18px] font-extrabold text-zinc-900 tracking-tight">
      Hy-Climb
    </Link>
  </nav>
)

export default Navbar
