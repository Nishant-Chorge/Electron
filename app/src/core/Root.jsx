import React from "react";
import { HistoryRouter } from "redux-first-history/rr6";
import { useDispatch } from "react-redux";
import AppRoutes from "Core/routes";
import Nav from "./nav";
import "./root.css";
import { loadUsersState } from "Redux/components/user";
import { readConfigRequest, readConfigResponse } from "secure-electron-store";
import { useEffect } from "react";

const Root = ({ history }) => {
  const disptach = useDispatch();

  useEffect(() => {
    window.api.store.send(readConfigRequest, "user");
    window.api.store.onReceive(readConfigResponse, function (args) {
      if (args.success) {
        console.log("args", args?.value);
        disptach(loadUsersState(args?.value));
      }
    });
  }, []);

  return (
    <React.Fragment>
      <HistoryRouter history={history}>
        <Nav history={history}></Nav>
        <AppRoutes></AppRoutes>
      </HistoryRouter>
    </React.Fragment>
  );
};

export default Root;
