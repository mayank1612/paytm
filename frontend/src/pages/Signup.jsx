import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { BACKEND_BASE_URL } from "../assets/constants";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox
          placeholder="John"
          label={"First Name"}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <InputBox
          placeholder="Doe"
          label={"Last Name"}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <InputBox
          placeholder="mayank@gmail.com"
          label={"Email"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputBox
          placeholder="123456"
          label={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="pt-4">
          <Button
            label={"Sign up"}
            onClick={async () => {
              const response = await axios.post(
                BACKEND_BASE_URL + "/user/signup",
                {
                  firstName,
                  lastName,
                  username,
                  password,
                }
              );

              const token = response.data.token;

              if (token) {
                localStorage.setItem("token", token);
                navigate("/dashboard");
              }
            }}
          />
        </div>
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};
