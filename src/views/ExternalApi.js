import React, { useState } from "react";
import { Button, Alert } from "reactstrap";
import Highlight from "../components/Highlight";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";

export const ExternalApiComponent = () => {
  const { apiOrigin = "http://54.167.99.187:8080/api" } = getConfig();

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const {
    getAccessTokenSilently,
    loginWithPopup,
    getAccessTokenWithPopup,
    user,
    getIdTokenClaims,
    isAuthenticated,
  } = useAuth0();

  const callPublicApi = async () => {
    try {
      const response = await fetch(`${apiOrigin}/public/user`);

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  const callPrivateApi = async () => {
    try {
      const token = (await getIdTokenClaims())?.__raw;

      const response = await fetch(`${apiOrigin}/private/user`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const responseData = await response.json();

      setState({
        ...state,
        showResult: true,
        apiMessage: responseData,
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        error: error.error,
      });
    }
  };

  return (
    <>
      <div className="mb-5">
        {!isAuthenticated ? (
          <Button color="primary" className="mt-5" onClick={callPublicApi}>
            Ping UnAuthenticated API
          </Button>
        ) : (
          <Button
            color="primary"
            className="mt-5"
            style={{ marginLeft: 40 }}
            onClick={callPrivateApi}
          >
            Ping Authenticated API
          </Button>
        )}
      </div>

      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
          </div>
        )}
      </div>
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
