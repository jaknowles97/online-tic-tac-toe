import React from "react";

const Announcement = (props) => {
  return (
    <div>
      <h3>{props.children}</h3>
    </div>
  );
};

export default Announcement;
