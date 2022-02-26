import React from "react";
import {
  useAuth0,
  withAuthenticationRequired,
  isAuthenticated,
} from "@auth0/auth0-react";
import logo from "../assets/logo.svg";
import { ExternalApiComponent } from "../views/ExternalApi";

function Hero() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className="text-center hero my-5">
      <img
        className="mb-3 app-logo"
        src="https://cdn.mindbowser.com/wp-content/uploads/2020/10/28081728/mindbowser-logo.svg"
        alt="React logo"
        width="120"
      />
      <h1 className="mb-4">Learning Saturday Demo</h1>

      <p className="lead">
        {isAuthenticated
          ? "Authenticated Homepage"
          : "Unauthenticated Homepage"}
      </p>

      <ExternalApiComponent></ExternalApiComponent>
    </div>
  );
}

export default Hero;
