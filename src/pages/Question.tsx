import { useNavigate } from 'react-router-dom';
import { useUnit } from 'effector-react';

import {
  $currentQuestionNumber,
  $selectedTestObj,
  $currentUserAnswer,
  $points,
  changePoints,
  changeQuestionNumber,
  changeCurrentUserAnswer,
  finishTestEvent,
  resetPoints,
  resetCurrentUserAnswer,
  resetCurrentQuestionNumber,
} from '../store/store';

const Question: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();

  const { selectedTestObj, currentQuestionNumber, currentUserAnswer, points } =
    useUnit({
      selectedTestObj: $selectedTestObj,
      currentQuestionNumber: $currentQuestionNumber,
      currentUserAnswer: $currentUserAnswer,
      points: $points,
    });

  const handleToNextQuestion = (): void => {
    if (currentUserAnswer === currentQuestion?.correctOption) {
      changePoints(currentQuestion.points + points);
    }
    if (currentQuestionNumber + 1 < questionCount) {
      resetCurrentUserAnswer();
      changeQuestionNumber(currentQuestionNumber + 1);
    } else {
      finishTestEvent();
      resetFields();
      navigate('/result');
    }
  };

  const resetFields = (): void => {
    resetCurrentQuestionNumber();
    resetCurrentUserAnswer();
    resetPoints();
  };

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
              <label
                key={`${index}-${answer}`}
                className="inline-flex items-center bg-indigo-100 px-4 rounded-md py-2"
              >
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  className="form-radio text-indigo-600"
                  onChange={() => changeCurrentUserAnswer(index)}
                />
                <span className="ml-2 text-black">{answer}</span>
              </label>
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
