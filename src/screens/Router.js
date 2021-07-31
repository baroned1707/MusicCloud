import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./HomePage";

const router = [
  {
    exact: true,
    component: () => <HomePage />,
    endpoint: "/",
  },
];

const Router = () => {
  const [mapRouter, setMapRouter] = useState(null);

  const handleMapRouter = () => {
    var temprender = [];
    router.map((cur, i) => {
      temprender.push(<Route key={i} exact={cur.exact} path={cur.endpoint} component={cur.component} />);
    });
    setMapRouter(temprender);
  };

  useEffect(() => {
    handleMapRouter();
  }, []);

  return (
    <BrowserRouter>
      <Switch>{mapRouter}</Switch>
    </BrowserRouter>
  );
};

export default Router;
