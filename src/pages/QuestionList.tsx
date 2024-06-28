import { useUnit } from "effector-react";
import { $dataStore } from "../store/store";

const Question: React.FC = () => {
  const data = useUnit($dataStore);
  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className=" text-sm font-medium text-gray-700">Тест:</h1>
      <ul className="mt-5">
        {data.map((item) => (
          <li key={item.testId}>{item.testName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
