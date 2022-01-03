import React from "react";
import classes from "./Loader.module.css";

function ShowDetail() {
  return (
    <div className={(classes.loader, classes.center)}>
      <i className="fa fa-cog fa-spin" />
    </div>
  );
}

export default ShowDetail;
