import React from "react";
import { Routes, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Home = loadable(() =>
  import(/* webpackChunkName: "WelcomeChunk" */ "Pages/welcome/Home")
);
const About = loadable(() =>
  import(/* webpackChunkName: "AboutChunk" */ "Pages/about/about")
);
const User = loadable(() =>
  import(/* webpackChunkName: "UserChunk" */ "Pages/user/User")
);
const Report = loadable(() =>
  import(/* webpackChunkName: "Report1Chunk" */ "Pages/report/Report")
);
class AppRoutes extends React.Component {
  render() {
    return (
      <Routes>
        <Route path={ROUTES.WELCOME} element={<Home />}></Route>
        <Route path={ROUTES.ABOUT} element={<About />}></Route>
        <Route path={ROUTES.USER} element={<User />}></Route>
        <Route path={ROUTES.REPORT1} element={<Report />}></Route>
        <Route path={ROUTES.REPORT2} element={<Report />}></Route>
      </Routes>
    );
  }
}

export default AppRoutes;
