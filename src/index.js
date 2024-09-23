import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/app/App";
import "./style/style.scss";
import ErrorBoundary from "./shared/errorBoundary/ErrorBoundary";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./store/store";
import { Provider } from "react-redux";
import { lazy, Suspense } from "react";


const container = document.getElementById("root");
const root = createRoot(container);

const LazyComicsInfo = lazy(() => import("./components/comicsInfo/ComicsInfo"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Auth0Provider
        domain="dev-y1otq7mjob4dop3b.us.auth0.com"
        clientId="oCJCTAGsyHqggiX3QSiN0WdPtVe7TLim"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <ErrorBoundary>
          <Provider store={store}>
            <App/>
          </Provider>
        </ErrorBoundary>
      </Auth0Provider>
    ),
  },
  {
    path: "/comicsinfo/:id",
    element: (
      <Provider store={store}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading Comics Info...</div>}>
            <LazyComicsInfo />
          </Suspense>
        </ErrorBoundary>
      </Provider>
    ),
  },
]);

root.render(<RouterProvider router={router} />);
