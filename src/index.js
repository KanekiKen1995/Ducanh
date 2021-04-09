import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./index.scss";


// Logging short hand
var { ["log"]: l } = console;
window.l = l;

const Home = lazy(() => import("./pages/Home"));
const GettingStarted = lazy(() => import("./pages/GettingStarted"));
const Review = lazy(() => import("./pages/Review"));
const Careers = lazy(() => import("./pages/Careers"));
const TermOfUse = lazy(() => import("./pages/TermOfUse"));
const AccessibilityStatement = lazy(() => import("./pages/AccessibilityStatement"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Impressum = lazy(() => import("./pages/Impressum"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Router>
      <Switch>
        <Suspense fallback={<div>
            <div className="pre-js-spinner-container">
              <div className="pre-js-spinner">
                <svg className="cube1" width={15} height={15}>
                  <path fill="#FF0072" d="M0 0H15V15H0z" />
                </svg>
                <svg className="cube2" width={15} height={15}>
                  <path fill="#FF0072" d="M0 0H15V15H0z" />
                </svg>
              </div>
            </div>
          </div>}>
          <Route exact path={"/get-started"} component={GettingStarted} />
          <Route exact path={"/review"} component={Review} />
          <Route exact path={"/careers"} component={Careers} />
          <Route exact path={"/terms-of-service"} component={TermOfUse} />
          <Route exact path={"/accessibility-statement"} component={AccessibilityStatement} />
          <Route exact path={"/privacy-notice"} component={PrivacyPolicy} />
          <Route exact path={"/impressum"} component={Impressum} />
          <Route exact path={"/thankyou"} component={ThankYou} />
          <Route exact path={"/"} component={Home} />
        </Suspense>
      </Switch>
    </Router>
  </I18nextProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
