import React from "react";

const PageLayout = (props) => {
  return (
    <div id={props.id} className="container-fluid">
      <div className="row">
        {/* <div className="text-center text-light mt-2 display-5">
          {props.title}
        </div> */}
        <div className="container mb-2">
          <div className="row mt-3">
            <div className="col-xl-11 mx-auto">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
