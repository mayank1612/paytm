export const SendMoney = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="border h-min p-4 w-96 bg-white shadow-lg rounded-lg">
        <div className="flex justify-center p-2">
          <h2 className="text-3xl font-bold">Send Money</h2>
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mr-3">
              <span className="text-2xl text-white">A</span>
            </div>
            <h3 className="text-2xl font-semibold">Friends Name</h3>
          </div>
          <div className="py-2">
            <div className="py-2">
              <label className="text-sm font-medium" htmlFor="amount">
                Amount (in Rs)
              </label>
              <input
                type="number"
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
              />
            </div>
            <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
