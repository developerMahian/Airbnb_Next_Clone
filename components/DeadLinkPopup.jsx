const DeadLinkPopup = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <div
      className={`${
        isModalOpen ? "-translate-y-0 visible" : "-translate-y-[300%] invisible"
      } absolute top-24 right-1/2 translate-x-1/2 mx-auto p-3 border w-[400px] shadow-2xl rounded-md bg-white transition-all duration-500`}
    >
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Dead End...
        </h3>
        <div className="mt-2 px-7 py-3">
          <p>But Definately Explore features like search, map, listings etc.</p>
        </div>
        <div className="items-center px-4 py-3">
          <button
            className="px-6 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            Close Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeadLinkPopup;
