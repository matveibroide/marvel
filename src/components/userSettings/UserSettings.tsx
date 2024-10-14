import "./userSettings.scss";
import { Link } from "react-router-dom";

const UserSettings = () => {
  return (
    <div className="user-settings">
      <div>
        <h4>Settings:</h4>
      </div>
      <ul
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Link to="">
          <li>Favorite Comics</li>
        </Link>
        <li>Photo</li>
        <li>Email</li>
      </ul>
    </div>
  );
};

export default UserSettings;
