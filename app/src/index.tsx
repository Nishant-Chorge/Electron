import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import i18n from "I18n/i18n.config";
import { I18nextProvider } from "react-i18next";
import Root from "Core/Root";
import { store, history } from "Redux/store/store";
import "bulma/css/bulma.css";
import "Styles/index.css";
import { Provider } from "react-redux";

const container = document.getElementById("target");
const root = createRoot(container);
root.render(
  <I18nextProvider i18n={i18n}>
    <Suspense fallback="loading">
      <Provider store={store}>
        <Root history={history}></Root>
      </Provider>
    </Suspense>
  </I18nextProvider>
);
