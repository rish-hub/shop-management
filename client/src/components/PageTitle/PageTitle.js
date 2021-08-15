import React from "react";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={`${classes.pageTitleContainer} heading`}>
      <Typography className={`${classes.typo} text`} variant="h2" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  );
}
