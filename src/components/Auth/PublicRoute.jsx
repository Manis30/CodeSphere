import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { account } from "../../BackendServices/AppWrite";
import Loading from "../Loader";
export default function PublicRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        await account.get();

        setAuthenticated(true);

      } catch {

        setAuthenticated(false);

      } finally {

        setLoading(false);

      }

    };

    fetchUser();

  }, []);

  if (loading) {

     return <Loading fullScreen={true}/>;

  }

  if (authenticated) {

    return <Navigate to="/" replace />;

  }

  return children;

}