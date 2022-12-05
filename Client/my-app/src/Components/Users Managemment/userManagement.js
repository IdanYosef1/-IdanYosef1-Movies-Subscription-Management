import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateMessage } from "../../Redux/actions";
import Navbar from "../Navbar/navbar";

function UserManagemnt() {
  let history = useHistory();
  const dispatch = useDispatch();

  /* Go to the Add User and updating the message in the redux Store
       that indicates whether a username exists in the system. */
  const addUser = () => {
    dispatch(updateMessage(""));
    history.push("/addUser");
  };

  // Go to the User Management.
  // All Users (default).
  const allUsers = () => {
    history.push("/userManagement/admin");
  };

  let colorAddUser = "clickAllAdd",
    colorEditUser = "clickAllAdd";
  window.location.pathname === "/addUser"
    ? (colorAddUser = "AllAddButtons")
    : (colorEditUser = "AllAddButtons");

  return (
    <div className="text-center">
      <Navbar />
      <button className={colorAddUser} onClick={allUsers}>
        All Users
      </button>
      <button className={colorEditUser} onClick={addUser}>
        Add User
      </button>{" "}
      <br />
      <br />
    </div>
  );
}

export default UserManagemnt;
