import { createStore, createEvent, sample, combine } from 'effector';

import data from '../data.json';

import { ITestAttempt } from './types';
import { getGrade } from './utils';

// Функция для сохранения состояния в localStorage
const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Функция для восстановления состояния из localStorage
const loadFromLocalStorage = (key: string, defaultValue: unknown) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

// Создание событий
const changeUserName = createEvent<string>();
const changeSelectedTest = createEvent<number>();
const changeQuestionNumber = createEvent<number>();
const changePoints = createEvent<number>();
const changeCurrentUserAnswer = createEvent<number | null>();
const saveTestAttempt = createEvent<ITestAttempt>();
const finishTestEvent = createEvent();

// Cобытия для сброса состояний
const resetPoints = createEvent();
const resetCurrentUserAnswer = createEvent();
const resetCurrentQuestionNumber = createEvent();

// Создание хранилищ
const $dataStore = createStore(data);
const $userName = createStore<string>(loadFromLocalStorage('userName', ''));
const $selectedTestId = createStore<number>(
  loadFromLocalStorage('selectedTestId', 1)
);
const $currentQuestionNumber = createStore<number>(
  loadFromLocalStorage('currentQuestionNumber', 0)
);
const $currentUserAnswer = createStore<number | null>(
  loadFromLocalStorage('currentUserAnswer', null)
);
const $points = createStore<number>(loadFromLocalStorage('points', 0));
const $testAttempts = createStore<Array<ITestAttempt>>(
  loadFromLocalStorage('testAttempts', [])
);

// Создание вычисляемых значений из состояний
const $selectedTestObj = combine(
  $selectedTestId,
  $dataStore,
  ($selectedTestId, $dataStore) => {
    return $dataStore.find(({ testId }) => $selectedTestId === testId);
  }
);
const $totalTestPoints = combine($selectedTestObj, ($selectedTestObj) => {
  return (
    $selectedTestObj?.questions.reduce(
      (totalPoints, question) => totalPoints + question.points,
      0
    ) ?? 0
  );
});

$userName.on(changeUserName, (_, newValue) => newValue);
$selectedTestId.on(changeSelectedTest, (_, newValue) => newValue);
$currentQuestionNumber.on(changeQuestionNumber, (_, newValue) => newValue);
$points.on(changePoints, (_, newValue) => newValue);
$currentUserAnswer.on(changeCurrentUserAnswer, (_, newValue) => newValue);
$testAttempts.on(saveTestAttempt, (state, newAttempt) => [
  ...state,
  newAttempt,
]);

//Сброс состояний до значений по умолчанию
$points.reset(resetPoints);
$currentQuestionNumber.reset(resetCurrentQuestionNumber);
$currentUserAnswer.reset(resetCurrentUserAnswer);

//Наблюдатели за изменением состояний
$userName.watch((state) => saveToLocalStorage('userName', state));
$selectedTestId.watch((state) => saveToLocalStorage('selectedTestId', state));
$currentQuestionNumber.watch((state) =>
  saveToLocalStorage('currentQuestionNumber', state)
);
$points.watch((state) => saveToLocalStorage('points', state));
$testAttempts.watch((state) => saveToLocalStorage('testAttempts', state));

// Логика для завершения теста
sample({
  clock: finishTestEvent,
  source: {
    points: $points,
    userName: $userName,
    $selectedTestObj: $selectedTestObj,
    totalTestPoints: $totalTestPoints,
  },
  fn: ({
    points,
    userName,
    $selectedTestObj,
    totalTestPoints,
  }): ITestAttempt => {
    const now = new Date().toLocaleString();

    return {
      userName,
      testName: $selectedTestObj?.testName || '',
      points,
      time: now,
      grade: getGrade(points, totalTestPoints),
    };
  },
  target: saveTestAttempt,
});

export {
  changeUserName,
  changeSelectedTest,
  changeQuestionNumber,
  changePoints,
  changeCurrentUserAnswer,
  saveTestAttempt,
  finishTestEvent,
  resetPoints,
  resetCurrentUserAnswer,
  resetCurrentQuestionNumber,
  $dataStore,
  $userName,
  $selectedTestId,
  $selectedTestObj,
  $currentQuestionNumber,
  $points,
  $currentUserAnswer,
  $totalTestPoints,
  $testAttempts,
};
