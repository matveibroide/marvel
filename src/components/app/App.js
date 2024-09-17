import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../../shared/errorBoundary/ErrorBoundary";
import LoginButton from "../login/Login";
import LogoutButton from "../logout/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="app">
      <LoginButton />
      <LogoutButton />
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
