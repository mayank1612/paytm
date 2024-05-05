import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_BASE_URL } from "../assets/constants";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(BACKEND_BASE_URL + "/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  return (
    <div className="p-4">
      <div className="font-bold text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
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
  const navigate = useNavigate();

  const { firstName, lastName, username } = user;

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
        <Button
          label={"Send Money"}
          onClick={() => {
            navigate(`/send?username=${username}&name=${firstName}`);
          }}
        />
      </div>
    </div>
  );
}
