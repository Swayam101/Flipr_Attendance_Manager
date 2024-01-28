import { Link } from "react-router-dom";
import useSocketStore from "../contexts/SocketStore.js";
import { useEffect } from "react";
import useAuthStore from "../contexts/AuthStore.js";
import { toast } from "react-toastify";

function Student_approval() {
  const socket = useSocketStore((state) => state.socket);
  const user = useAuthStore((state) => state.userData);
  const setUserData = useAuthStore((state) => state.setUserData);

  useEffect(() => {
    socket.on("approved", (data) => {
      console.log("Approved Event Fired!");
      if (user._id == data.student._id) {
        toast.info(
          "Your Account Has Been Approved! Kinly Re-Login To Continue!"
        );
      }
    });
  }, []);

  return (
    <div className="card approval-box">
      <h4>Approval Pending</h4>
      <p>
        Your application is under review, once the adim approved it, you will be
        able to access the dashboard
      </p>
      <Link to={`/profile`}>
        <button className="profileOptionButton">Update Profile</button>
      </Link>
    </div>
  );
}

export default Student_approval;
