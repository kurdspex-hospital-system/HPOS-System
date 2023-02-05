import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "../store";

import MainComponent from "../components/MainComponent";

import "../styles/globals.css";
import "../styles/bootstrap.min.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <MainComponent>
          <Component {...pageProps} />
        </MainComponent>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
