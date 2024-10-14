import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Avatar } from "@mui/material";
import UserSettings from "../userSettings/UserSettings";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    isAuthenticated &&
    user && (
      <>
        <div className="user" onClick={handleClick}>
          <Avatar src={user.picture} />
          <p>{user.name}</p>
          {showMenu && <UserSettings />}
        </div>
      </>
    )
  );
};

export default Profile;
