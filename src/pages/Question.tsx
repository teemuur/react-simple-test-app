import { useUnit } from "effector-react";
import {
  $currentQuestionNumber,
  $dataStore,
  $selectedTestId,
  $currentUserAnswer,
  $points,
  $userName,
  changePoints,
  resetPoints,
  changeQuestionNumber,
  changeCurrentUserAnswer,
  saveTestAttempt,
} from "../store/store";
import { useNavigate } from "react-router-dom";

const Question: React.FC = () => {
  const {
    selectedTestId,
    dataStore,
    currentQuestionNumber,
    currentUserAnswer,
    points,
    userName,
  } = useUnit({
    selectedTestId: $selectedTestId,
    dataStore: $dataStore,
    currentQuestionNumber: $currentQuestionNumber,
    currentUserAnswer: $currentUserAnswer,
    points: $points,
    userName: $userName,
  });
  const navigate = useNavigate();

  const handleToNextQuestion = () => {
    if (currentUserAnswer === currentQuestion?.correctOption) {
      changePoints(currentQuestion.points);
    }
    if (currentQuestionNumber + 1 < questionCount) {
      changeQuestionNumber(currentQuestionNumber + 1);
      changeCurrentUserAnswer(null);
    } else {
      finishTest();
      resetFields();
      navigate("/result");
    }
  };

  const finishTest = () => {
    const now = new Date().toLocaleString();
    saveTestAttempt({
      userName: userName,
      testName: selectedTestName || "",
      points,
      time: now,
      grade: getGrade(points, totalPoints),
    });
  };

  const resetFields = () => {
    resetPoints();
    changeQuestionNumber(0);
    changeCurrentUserAnswer(null);
  };

  const getGrade = (points: number, total: number): string => {
    const percentage = points / total;

    if (percentage < 0.5) {
      return "bad";
    } else if (percentage < 0.75) {
      return "ok";
    } else {
      return "great";
    }
  };

  const selectedTestObj = dataStore.find((el) => selectedTestId === el.testId);
  const selectedTestName = selectedTestObj?.testName;
  const questionList = selectedTestObj?.questions;
  const questionCount = questionList?.length ?? 0;
  const currentQuestion = questionList
    ? questionList[currentQuestionNumber]
    : null;
  const totalPoints =
    questionList?.reduce(
      (totalPoints, question) => totalPoints + question.points,
      0,
    ) ?? 0;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl w-full">
        <p className="text-lg font-semibold mb-4">
          <span className="font-bold">Название теста:</span> {selectedTestName}
        </p>
        <p className="text-lg font-semibold mb-4">
          <span className="font-bold">Номер вопроса:</span>{" "}
          {currentQuestionNumber + 1} / {questionCount}
        </p>
        <p className="text-lg font-semibold mb-6">
          <span className="font-bold">Текст вопроса:</span>{" "}
          <span className="text-indigo-600">{currentQuestion?.question}</span>
        </p>
        <div className="grid grid-cols-2 gap-4 mt-10">
          {currentQuestion?.options.map((answer, index) => (
            <button
              key={index}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => changeCurrentUserAnswer(index)}
            >
              {answer}
            </button>
          ))}
        </div>{" "}
        {currentUserAnswer !== null && (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full mt-10"
            onClick={handleToNextQuestion}
          >
            {currentQuestionNumber + 1 < questionCount
              ? "Следующий вопрос"
              : "Закончить тестирование"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
