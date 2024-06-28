interface HistoryItem {
  userName: string;
  testName: string;
  points: number;
  time: string;
  grade: string;
}

interface HistoryTableProps {
  history: HistoryItem[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  const getColor = (grade: string) => {
    if (grade === "bad") return "bg-red-200";
    if (grade === "ok") return "bg-yellow-200";
    if (grade === "great") return "bg-green-200";
  };
  return (
    <div className="border border-gray-200 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Имя пользователя
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Название теста
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Очки
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Время прохождения
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Оценка
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {history.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.userName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.testName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.points}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.time}
              </td>
              <td
                className={`${getColor(item.grade)} px-6 py-4 whitespace-nowrap text-sm text-gray-500`}
              >
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
