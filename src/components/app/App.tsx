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
import Profile from "../profile/Profile";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../loadingSreen/LoadingScreen";
import { RootState } from "../../store/store";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const charList = useSelector((state: RootState) => state.charList.chars);

  const render = useRef(0);
  render.current += 1;
  console.log(`App render:${render.current}`);

  useEffect(() => {
    dispatch(setIsAuthenticated(isAuthenticated));
  }, [isAuthenticated, dispatch]);

  return (
    <>
      {charList.length === 0 && <LoadingScreen />}
      <div className="app">
        <div className="dashboard">
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          {isAuthenticated && <Profile />}
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
    </>
  );
};

export default App;
