import Box from "../UI/Box";

const Home: React.FC = () => {
  return (
    <Box>
      <div className="flex items-center justify-center  h-[80vh]">
        <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md border border-gray">
          <form>
            <div className="mb-6">
              <label
                htmlFor="testName"
                className="block text-sm font-medium text-gray-700"
              >
                Название теста: X
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700"></label>
              <input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="text-center">
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Начать
              </button>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
};

export default Home;
