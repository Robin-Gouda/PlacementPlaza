import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [positiveMessage, setPositiveMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Glass-Container">
          <div className="heading">
            <h1>SignUp</h1>
          </div>
          <form
            onSubmit={handleSubmit(async (data) => {
              setMessage(null);
              setPositiveMessage(null);
              const { confirmPassword, ...newData } = data;
              const url = "http://localhost:3001/auth/signup";
              const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newData),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              });

              const result = await response.json();
              const { success, message, error } = result;
              if (success) {
                setPositiveMessage(message);
              } else if (error) {
                const details = error?.details[0].message;
                setMessage(details);
              } else if (!success) {
                setMessage(message);
                console.log(result);
              }
            })}
          >
            <div className="Input-Container">
              <div className="icon">
                <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name")}
                required
              />
            </div>
            <div className="Input-Container">
              <div className="icon">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ color: "#000000" }}
                />
              </div>
              <input
                type="text"
                placeholder="Email ID"
                {...register("email", {
                  required: "email required",
                  pattern: {
                    value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                    message: "email not valid",
                  },
                })}
                required
              />
            </div>
            <div className="Input-Container">
              <div className="icon">
                <FontAwesomeIcon icon={faLock} style={{ color: "#000000" }} />
              </div>
              <input
                type="password"
                {...register("password", {
                  required: "password required",
                })}
                placeholder="Create a Password"
                required
              />
            </div>
            <div className="Input-Container">
              <div className="icon"></div>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                {...register("confirmPassword", {
                  required: "confirm password required",
                  validate: (value, formValues) =>
                    value === formValues.password || "password not matching",
                })}
                required
              />
              <div className="iconConfirmPassword">
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    style={{ color: "#000000", cursor: "pointer" }}
                    onClick={handleShowPassword}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    style={{ color: "#000000", cursor: "pointer" }}
                    onClick={handleShowPassword}
                  />
                )}
              </div>
            </div>
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
            {errors?.confirmPassword && (
              <p className="text-red-500">{errors?.confirmPassword?.message}</p>
            )}

            {message && <p className="text-red-500">{message}</p>}
            {positiveMessage && (
              <p className="text-green-500">{positiveMessage}</p>
            )}

            <div className="bottom">
              <button type="submit">Signup</button>
              <p>
                Already Have An Account? <a>Login</a>
              </p>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
