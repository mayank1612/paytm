export const Balance = ({ value }) => {
  return (
    <div className="flex p-4">
      <div className="font-bold text-lg">Your balance:</div>
      <div className="font-semibold ml-2 text-lg">Rs {value}</div>
    </div>
  );
};
