import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// import { useUserAuth } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Database/Firebase";
import CMPLoader from "../../Components/CMPLoader/CMPLoader";
import { setAuthLoading } from "../../Redux/Slices/AuthSlice";

const Login = () => {

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  // const [loading, setAuthLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);


  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth);

  // const { logIn } = useUserAuth();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError("");
    if (!data.email) {
      setEmailError("Email is required");
      setVisible(true);
      return;
    }
    if (!data.password) {
      setPasswordError("Password is required");
      setVisible(true);
      return;
    }
    setAuthLoading(true);
    try {
      // await logIn(data.email, data.password);
     await signInWithEmailAndPassword(auth, data.email, data.password);
      // if(user){
      //   navigate("/providers");
  
      // }else{
      //   navigate("/login");
  
      // }
      setAuthLoading(false);

      toast.success("Login successful!", {
        position: "top-right",
      });
      navigate("/");
    } catch (err) {
      console.log(error);
      toast.error("Invalid email or password", {
        position: "top-right",
      });
      setAuthLoading(false);
      setError("Invalid email or password");
      setVisible(true);
      // setError(err.message);
    }
 
  };
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <>
    {
      isLoading ? <CMPLoader/>
      :
      <>
    <div
      className="bg-gray-900 text-white w-full min-h-screen flex justify-center items-center "
      style={{
        padding: "20px",
      }}
    >
      <div className="container mx-auto h-full">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="md:w-3/5 w-full px-5 flex flex-col justify-center items-center">
            <p className="text-3xl text-center text-white tracking-wider font-bold">
              Welcome to
            </p>
            <h3 className="bg-secondry px-4 py-2 rounded-xl text-white mt-3 text-center font-bold tracking-wider md:text-3xl text-2xl">
              The Cleaning Service
            </h3>
            <p className="mt-3"> Login to join </p>
            <div className="md:w-3/4 w-full mx-auto">
              <form className="p-5 space-y-6" onSubmit={handleLogin}>
                {visible && emailError && (
                  <div className="text-red-400">{emailError}</div>
                )}
                {passwordError && (
                  <div className="text-red-400">{passwordError}</div>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(event) =>
                    setData({ ...data, email: event.target.value })
                  }
                  className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(event) =>
                    setData({ ...data, password: event.target.value })
                  }
                  className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent"
                />

                <div className="flex justify-center">
                  <button
                    type="submit"
                    // disabled={loading}
                    className=" border bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-white w-full py-3 rounded-2xl"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
   </>
  }
  </>
  );
};

export default Login;
