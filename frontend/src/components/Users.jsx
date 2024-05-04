import { useState } from "react";
import { Button } from "./Button";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([
    {
      firstName: "Harkirat",
      lastName: "Singh",
      _id: 1,
    },
  ]);

  return (
    <div className="p-4">
      <div className="font-bold text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user, index) => (
          <User user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const { firstName, lastName } = user;

  return (
    <div className="flex justify-between my-4">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
          <div className="flex items-center text-xl">{firstName?.[0]}</div>
        </div>
        <div className="flex items-center">
          <div>
            {firstName} {lastName}
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <Button label={"Send Money"} />
      </div>
    </div>
  );
}
