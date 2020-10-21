import React, { useReducer, useState, useEffect } from "react";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

// import Home from "./home/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Board from "./board/Board";
import showCard from "./card/ShowCard";
// import Account from "./header/Account";
// import HeaderPlus from "./header/HeaderPlus";
import Dashboard from "./dashboard/Dashboard";
import HeaderContext, {
  initialHeaderState,
  headerReducer,
} from "../context/HeaderContext";
// import CreateLabel from "./label/CreateLabel";
// import DueDate from "./card/DueDate";
// import HeaderAfterLogin from "./header/HeaderAfterLogin";
// import CreateTeam from "./team/CreateTeam";

// Components built
// -Home Trello landing page.
require("dotenv").config();

function PublicRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/login"
        render={(routeProps) => <Login {...routeProps} />}
      />
      <Route
        exact
        path="/signup"
        render={(routeProps) => <Signup {...routeProps} />}
      />
    </Switch>
  );
}

function PrivateRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(routeProps) => <Dashboard {...routeProps} />}
      />
      <Route exact path="/login">
        <Redirect to="/" />
      </Route>
      <Route exact path="/signup">
        <Redirect to="/" />
      </Route>
      <Route
        exact
        path="/board"
        render={(routeProps) => <Board {...routeProps} />}
      />
      <Route
        exact
        path="/showcard"
        render={(routeProps) => <showCard {...routeProps} />}
      />
    </Switch>
  );
}

function App(props) {
  const [state, setState] = useState({ user: null });
  const [headerState, dispatchHeader] = useReducer(
    headerReducer,
    initialHeaderState
  );
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/verify`)
      .then((res) => setState({ user: res?.data?.user }))
      .catch((err) => props.history.push("/login"));
  }, []);
  return (
    <UserContext.Provider value={{ state, setState }}>
      <HeaderContext.Provider value={{ headerState, dispatchHeader }}>
        {state?.user?._id ? <PrivateRoutes /> : <PublicRoutes />}
      </HeaderContext.Provider>
    </UserContext.Provider>
  );
}

export default withRouter(App);
