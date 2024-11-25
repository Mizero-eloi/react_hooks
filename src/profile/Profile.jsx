import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
} from "react";
import { AuthContext } from "../useReducerTutorial/UseReducerTutorial";

const Profile = forwardRef((props, ref) => {
  const divRef = useRef();

  useImperativeHandle(ref, () => ({
    style: () => (divRef.current.style.backgroundColor = "red"),
  }));
  const { username } = useContext(AuthContext);

  console.log("Username from profile", { username });
  return <div ref={divRef}>Username {username}</div>;
});

export default Profile;
