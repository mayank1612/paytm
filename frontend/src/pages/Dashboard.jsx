import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
  return (
    <div className="p-2">
      <Appbar />
      <Balance value={1500} />
      <Users />
    </div>
  );
};

export default Dashboard;
