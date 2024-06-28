import { createStore, createEvent } from 'effector';
import data from '../data.json';

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
const resetPoints = createEvent();
const saveTestAttempt = createEvent<{
  userName: string;
  testName: string;
  points: number;
  time: string;
  grade: string;
}>();

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
const $testAttempts = createStore<
  Array<{
    userName: string;
    testName: string;
    points: number;
    time: string;
    grade: string;
  }>
>(loadFromLocalStorage('testAttempts', []));

$userName.on(changeUserName, (_, newValue) => newValue);
$selectedTestId.on(changeSelectedTest, (_, newValue) => newValue);
$currentQuestionNumber.on(changeQuestionNumber, (_, newValue) => newValue);
$points.on(changePoints, (_, newValue) => newValue);
$points.on(resetPoints, () => 0);
$currentUserAnswer.on(changeCurrentUserAnswer, (_, newValue) => newValue);
$testAttempts.on(saveTestAttempt, (state, newAttempt) => [
  ...state,
  newAttempt,
]);

$userName.watch((state) => saveToLocalStorage('userName', state));
$selectedTestId.watch((state) => saveToLocalStorage('selectedTestId', state));
$currentQuestionNumber.watch((state) =>
  saveToLocalStorage('currentQuestionNumber', state)
);
$points.watch((state) => saveToLocalStorage('points', state));
$testAttempts.watch((state) => saveToLocalStorage('testAttempts', state));

export {
  changeUserName,
  changeSelectedTest,
  changeQuestionNumber,
  changePoints,
  resetPoints,
  changeCurrentUserAnswer,
  saveTestAttempt,
  $dataStore,
  $userName,
  $selectedTestId,
  $currentQuestionNumber,
  $points,
  $currentUserAnswer,
  $testAttempts,
};
