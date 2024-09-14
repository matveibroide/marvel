import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import { Provider } from "react-redux";
import decoration from "../../resources/img/vision.png";
import store from "../../store/store";
import ErrorBoundary from "../../shared/errorBoundary/ErrorBoundary";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <ErrorBoundary>
              <CharList />
            </ErrorBoundary>
            <CharInfo />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    </Provider>
  );
};

export default App;
