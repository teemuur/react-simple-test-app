import { Link, Outlet } from 'react-router-dom';

const Navbar: React.FC = (): React.ReactElement => {
  return (
    <>
      <nav className="mb-5 mt-5">
        <ul className="flex justify-center">
          <li>
            <Link
              className="px-3 py-2 text-gray-800 rounded hover:bg-gray-200"
              to="/"
            >
              Главная страница
            </Link>
          </li>
          <li>
            <Link
              className="px-3 py-2 text-gray-800 rounded hover:bg-gray-200"
              to="/result"
            >
              Результаты
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
