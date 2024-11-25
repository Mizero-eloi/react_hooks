import React, {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Profile from "../profile/Profile";

export const AuthContext = createContext("");

const UseReducerTutorial = () => {
  const formReducer = (state, action) => {
    switch (action.type) {
      case "set_username":
        return { ...state, username: action.payload };
      case "set_password":
        return { ...state, password: action.payload };
      case "reset":
        return { username: "", password: "" };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(formReducer, {
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isDisplayProfile, setIsDisplayProfile] = useState(false);
  const firstInput = useRef(null);

  const ref = useRef();

  const isFormValid = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };
    if (!state.username) {
      newErrors.username = "Username is required!";
      isValid = false;
    }

    if (!state.password) {
      newErrors.password = "Password is required!";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log("Submitted");
      console.log(state);
      //   dispatch({ type: "reset" });
      setIsDisplayProfile(true);
    }
  };

  useEffect(() => {
    firstInput.current.focus();
  }, []);

  return (
    <AuthContext.Provider value={{ username: state.username }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            ref={firstInput}
            value={state.username}
            onChange={(e) =>
              dispatch({ type: "set_username", payload: e.target.value })
            }
          />
          {errors.username && (
            <span style={{ color: "red" }}>{errors.username}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "set_password", payload: e.target.value })
            }
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </form>

      {isDisplayProfile && <Profile ref={ref} />}

      <button onClick={() => ref.current.style()}>Style profile</button>
    </AuthContext.Provider>
  );
};

export default UseReducerTutorial;
