import { Redirect } from "react-router-dom";

const Success = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Thank You For Submission</h2>
        <p className="card-text">
          You will get and email confirmation about your product
        </p>
        <Redirect to="/"/>
      </div>
    </div>
  );
};

export default Success;
