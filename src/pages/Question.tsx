import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';

import {
  $currentQuestionNumber,
  $dataStore,
  $selectedTestId,
  $currentUserAnswer,
  $points,
  changePoints,
  resetPoints,
  changeQuestionNumber,
  changeCurrentUserAnswer,
  finishTestEvent,
} from '../store/store';

const Question: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();

  const {
    selectedTestId,
    dataStore,
    currentQuestionNumber,
    currentUserAnswer,
    points,
  } = useUnit({
    selectedTestId: $selectedTestId,
    dataStore: $dataStore,
    currentQuestionNumber: $currentQuestionNumber,
    currentUserAnswer: $currentUserAnswer,
    points: $points,
  });

  const handleToNextQuestion = (): void => {
    if (currentUserAnswer === currentQuestion?.correctOption) {
      changePoints(currentQuestion.points + points);
    }
    if (currentQuestionNumber + 1 < questionCount) {
      changeCurrentUserAnswer(null);
      changeQuestionNumber(currentQuestionNumber + 1);
    } else {
      finishTestEvent();
      resetFields();
      navigate('/result');
    }
  };

  const resetFields = (): void => {
    changeQuestionNumber(0);
    changeCurrentUserAnswer(null);
    resetPoints();
  };

  const selectedTestObj = dataStore.find((el) => selectedTestId === el.testId);
  const selectedTestName = selectedTestObj?.testName;
  const questionList = selectedTestObj?.questions;
  const questionCount = questionList?.length ?? 0;
  const currentQuestion = questionList
    ? questionList[currentQuestionNumber]
    : null;

  return (
    <div className="flex justify-center mt-20">
      <div className="w-3/4 border border-gray-200 rounded-lg shadow-md max-w-full">
        <div className="p-6 bg-white rounded-lg shadow-md max-w-6xl w-full">
          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold">
              <span className="font-bold">Название теста:&nbsp;</span>
              <span className="text-indigo-700">{selectedTestName}</span>
            </p>
            <p className="text-lg font-semibold">
              <span className="font-bold">Номер вопроса:&nbsp;</span>
              <span className="text-indigo-700">
                {currentQuestionNumber + 1} / {questionCount}
              </span>
            </p>
          </div>
          <p className="text-xl font-bold mb-6 bg-indigo-100 p-4 rounded-md">
            <span className="font-bold">Текст вопроса:&nbsp;</span>
            <span className="text-indigo-600">{currentQuestion?.question}</span>
          </p>
          <div className="grid grid-cols-2 gap-5 mt-10">
            {currentQuestion?.options.map((answer, index) => (
              <button
                key={`${index}-${answer}`}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => changeCurrentUserAnswer(index)}
              >
                {answer}
              </button>
            ))}
          </div>
          {currentUserAnswer !== null && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full mt-10"
              onClick={handleToNextQuestion}
            >
              {currentQuestionNumber + 1 < questionCount
                ? 'Следующий вопрос'
                : 'Закончить тестирование'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
