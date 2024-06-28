import { useUnit } from "effector-react";
import { $testAttempts, $dataStore, $selectedTestId } from "../store/store";
import { Link } from "react-router-dom";
import Table from "../UI/Table";

const History: React.FC = () => {
  const { testAttempts, dataStore, selectedTestId } = useUnit({
    testAttempts: $testAttempts,
    dataStore: $dataStore,
    selectedTestId: $selectedTestId,
  });
  if (!testAttempts.length) return <div>Вы не прошли тест! 😅</div>;
  const lastAttempt = testAttempts[testAttempts.length - 1];
  const selectedTestObj = dataStore.find((el) => selectedTestId === el.testId);
  const selectedTestName = selectedTestObj?.testName;
  const maxTestPoints =
    selectedTestObj?.questions.reduce(
      (totalPoints, question) => totalPoints + question.points,
      0,
    ) ?? 0;

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto my-8 ">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Результаты последней попытки
        </h2>
        <p className="text-lg font-semibold mb-4">
          <span className="font-bold">Имя пользователя:</span>{" "}
          {lastAttempt.userName}
        </p>
        <p className="text-lg font-semibold mb-4">
          <span className="font-bold">Название теста:</span> {selectedTestName}
        </p>
        <p className="text-lg font-semibold mb-6">
          <span className="font-bold">Ваши баллы:</span> {lastAttempt.points} /{" "}
          {maxTestPoints} |{" "}
          {Math.round((lastAttempt.points / maxTestPoints) * 100)}%
        </p>
        <Link to="/" className="block mt-6">
          <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            На главную
          </button>
        </Link>
      </div>
      <Table history={testAttempts} />
    </>
  );
};

export default History;
