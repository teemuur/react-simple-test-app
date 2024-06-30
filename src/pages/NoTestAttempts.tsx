const NoTestAttempts: React.FC = (): React.ReactElement => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center bg-white p-10 rounded-lg shadow-md border border-gray-200">
        <p className="text-2xl font-semibold mb-4">Вы не прошли тест! 😅</p>
        <p className="text-lg">
          Попробуйте пройти тест, чтобы увидеть результаты.
        </p>
      </div>
    </div>
  );
};

export default NoTestAttempts;
