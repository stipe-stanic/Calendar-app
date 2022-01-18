import React from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";

const Login = () => {
  const navigate = useNavigate();

  /* navigates to main page after login */
  const responseGoogle = (response) => {
    navigate("/home");
    console.log(response);
  };

  return (
    <div>
      <h2>Login page</h2>
      <GoogleLogin
        clientId="747061863296-f2hb1umn9dbp2lbmp27d5ac2mfmba3f3.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Login;
