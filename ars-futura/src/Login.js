import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

const Login = () => {
  const navigate = useNavigate();

  /* navigates to main page after login */
  const responseGoogle = (response) => {
    navigate("/home");
    const { code } = response;
    console.log(code);
  };

  const responseError = (error) => {
    console.log(error);
  };

  return (
    <div className="center-login">
      <h2>Login page</h2>
      <GoogleLogin
        clientId="747061863296-f2hb1umn9dbp2lbmp27d5ac2mfmba3f3.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseError}
        cookiePolicy="single_host_origin"
        responseType="code"
        accessType="offline"
      />
    </div>
  );
};

export default Login;
