import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  const linkStyle = "px-3 py-2 text-gray-800 rounded hover:bg-gray-200";
  return (
    <>
      <nav className="mb-5 mt-5">
        <ul className="flex justify-center">
          <li>
            <Link className={linkStyle} to="/">
              Главная страница
            </Link>
          </li>
          <li>
            <Link className={linkStyle} to="/question">
              Список тестов
            </Link>
          </li>
          <li>
            <Link className={linkStyle} to="/result">
              Результаты
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
