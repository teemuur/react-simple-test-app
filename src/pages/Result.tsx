import { useUnit } from 'effector-react';
import { Link } from 'react-router-dom';

import {
  $testAttempts,
  $selectedTestObj,
  $totalTestPoints,
} from '../store/store';

import NoTestAttempts from './NoTestAttempts';
import Table from '../ui/Table';

const History: React.FC = (): React.ReactElement => {
  const { testAttempts, selectedTestObj, totalTestPoints } = useUnit({
    testAttempts: $testAttempts,
    selectedTestObj: $selectedTestObj,
    totalTestPoints: $totalTestPoints,
  });

  const lastAttempt = testAttempts[testAttempts.length - 1];
  const selectedTestName = selectedTestObj?.testName;

  if (!testAttempts.length) return <NoTestAttempts />;

  return (
    <>
      <div className="mt-5">
        <div className=" bg-white p-10 rounded-lg shadow-md w-3/4 border border-gray-200 mx-auto my-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Результаты последней попытки
          </h2>
          <div className="space-y-4">
            <p className="text-lg font-semibold text-center">
              <span className="font-bold">Имя пользователя:&nbsp;</span>
              <span className="text-indigo-600">{lastAttempt.userName}</span>
            </p>
            <p className="text-lg font-semibold text-center">
              <span className="font-bold">Название теста:&nbsp;</span>
              <span className="text-indigo-600">{selectedTestName}</span>
            </p>
            <p className="text-lg font-semibold text-center">
              <span className="font-bold">Ваши баллы:&nbsp;</span>
              <span className="text-green-600">
                {lastAttempt.points}
              </span> / {totalTestPoints}
            </p>
            <p className="text-lg font-semibold text-center">
              <span className="font-bold">Процент прохождения:&nbsp;</span>
              <span className="text-indigo-600">
                {Math.round((lastAttempt.points / totalTestPoints) * 100)}%
              </span>
            </p>
          </div>
          <Link to="/" className="block mt-6 text-center">
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              На главную
            </button>
          </Link>
        </div>
        <Table history={testAttempts} />
      </div>
    </>
  );
};

export default History;
