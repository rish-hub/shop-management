import React, { Suspense } from "react";

import { Route as RRR } from "react-router-dom";

const AppRoute = ({ as: Component, ...props }) => {
  const routeElement = (
    <RRR
      {...props}
      render={(renderProps) => (
        <Suspense fallback={"Loading..."}>
          <Component
            {...renderProps}
            {...props}
            {...renderProps.location.state}
          />
        </Suspense>
      )}
    />
  );

  return routeElement;
};

export default AppRoute;
