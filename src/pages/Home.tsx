// Компонент Home.tsx
import {
  $dataStore,
  changeUserName,
  changeSelectedTest,
  $userName,
  $selectedTestId,
} from "../store/store";
import { useUnit } from "effector-react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const { userName, tests, selectedTestId } = useUnit({
    userName: $userName,
    tests: $dataStore,
    selectedTestId: $selectedTestId,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/question");
  };
  return (
    <div className="flex items-center justify-center mt-16">
      <div className="bg-white p-10 rounded-lg shadow-md w-1/2 border border-gray">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Выберите тест:
            </label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedTestId}
              onChange={(event) =>
                changeSelectedTest(Number(event.target.value))
              }
            >
              {tests.map((test) => (
                <option key={test.testId} value={test.testId}>
                  {test.testName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700"></label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Введите имя"
              value={userName}
              onChange={(event) => changeUserName(event.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Начать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
