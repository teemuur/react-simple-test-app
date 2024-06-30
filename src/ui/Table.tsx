import { IHistoryTableProps } from './types';

const HistoryTable: React.FC<IHistoryTableProps> = ({
  history,
}): React.ReactElement => {
  const getColor = (grade: string): string => {
    if (grade === 'bad') return 'bg-red-200';
    if (grade === 'ok') return 'bg-yellow-200';
    else return 'bg-green-200';
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md w-3/4 mx-auto mb-5">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
          <tr>
            <th scope="col" className="px-6 py-3">
              Имя пользователя
            </th>
            <th scope="col" className="px-6 py-3">
              Название теста
            </th>
            <th scope="col" className="px-6 py-3">
              Очки
            </th>
            <th scope="col" className="px-6 py-3">
              Время прохождения
            </th>
            <th scope="col" className="px-6 py-3">
              Процент прохождения
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-gray-500 text-sm text-center whitespace-nowrap">
          {history.map((item, index) => (
            <tr key={`${index}_${item.userName}`}>
              <td className="px-6 py-4 font-medium text-gray-900 ">
                {item.userName}
              </td>
              <td className="px-6 py-4">{item.testName}</td>
              <td className="px-6 py-4">{item.points}</td>
              <td className="px-6 py-4">{item.time}</td>
              <td className={`${getColor(item.grade)} px-6 py-4`}>
                {item.grade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
