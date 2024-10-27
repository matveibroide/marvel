import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/app/App.tsx";
import "./style/style.scss";
import ErrorBoundary from "./shared/errorBoundary/ErrorBoundary";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./store/store";
import { Provider } from "react-redux";
import FavoriteComics from "./components/favoriteComics/favoriteComics";
import ComicsInfo from "./components/comicsInfo/ComicsInfo";

const container = document.getElementById("root");
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/comicsinfo/:id",
    element: <ComicsInfo />,
  },
  {
    path: "/favorite-comics",
    element: <FavoriteComics />,
  },
]);

root.render(
  <Auth0Provider
    domain="dev-y1otq7mjob4dop3b.us.auth0.com"
    clientId="oCJCTAGsyHqggiX3QSiN0WdPtVe7TLim"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </Auth0Provider>
);
