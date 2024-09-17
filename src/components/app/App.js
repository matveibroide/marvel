import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../../shared/errorBoundary/ErrorBoundary";
import LoginButton from "../login/Login";
import LogoutButton from "../logout/Logout";
import { setIsAuthenticated } from "./App.slice";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    dispatch(setIsAuthenticated(isAuthenticated));
  }, [isAuthenticated, dispatch]);

  return (
    <div className="app">
      <div className="dashboard">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        {isAuthenticated && (
          <div className="user">
            <Avatar src={user?.picture} />
            {user?.name}
          </div>
        )}
      </div>
      <ErrorBoundary>
        <AppHeader />
      </ErrorBoundary>
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary ui={CharList}>
            <CharList />
          </ErrorBoundary>

          <ErrorBoundary>
            <CharInfo />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
