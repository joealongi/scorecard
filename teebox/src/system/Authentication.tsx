import * as React from "react";
import { useLocation } from "react-router";

import { AuthenticationContext } from "../context/AuthenticationProvider";

import type { User } from "../types/UserTypes";

import { parseJwt } from "../client/Utils";
import { getRequest, postRequest } from "../functions/request";
import { endpoints } from "../configurations/constants";
import { encrypt, decrypt, envelope, unenvelope } from "../functions/security";

export default function HomePage() {
  const { setUser } = React.useContext(AuthenticationContext);
  const { state } = useLocation();

  // Get User from API
  const getUser = async (userId: string) => {
    try {
      const response = await getRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.USER + userId
      );
      if (response) return response;
      else return null;
    } catch {
      console.error("Error getting user");
      return null;
    }
  };

  // Save User with API
  const saveUser = async (userData: object) => {
    try {
      const response = await postRequest(
        import.meta.env.VITE_CLUBHOUSE_BASE_API_URL ?? "",
        endpoints.USER,
        userData
      );
      if (response) return response;
      else return null;
    } catch {
      console.error("Error saving user");
      return null;
    }
  };

  // Get user
  const getAuthenticatedUser = async (): Promise<User | null> => {
    try {
      // Get encrypted user from local storage
      const encryptedUser = localStorage.getItem("user");
      if (encryptedUser) {
        const buffer = unenvelope(encryptedUser);
        if (buffer) {
          const decryptedUser = await decrypt(buffer);
          if (
            decryptedUser &&
            typeof decryptedUser === "object" &&
            !Array.isArray(decryptedUser) &&
            !(decryptedUser instanceof Error) &&
            Object.keys(decryptedUser)?.length > 0
          ) {
            return decryptedUser as User;
          }
        }
      }
      if (state?.access_token) {
        // Get user from login state
        const decodedToken = parseJwt(state.access_token);
        if (decodedToken) {
          return {
            oid: decodedToken.oid,
            idtyp: decodedToken.idtyp,
            name: decodedToken.name,
            given_name: decodedToken.given_name,
            family_name: decodedToken.family_name,
            unique_name: decodedToken.unique_name,
          };
        }
      }
      return null;
    } catch {
      console.error("Error getting user from storage or token");
      return null;
    }
  };

  // Set user to local storage and context
  const setAuthenticatedUser = async (userToSet: User) => {
    try {
      // Encrypt user data
      const encrypted = await encrypt(userToSet);
      if (encrypted) {
        const enveloped = await envelope(encrypted);
        if (enveloped) {
          localStorage.setItem("user", enveloped);
        }
      }
      setUser(userToSet);
    } catch {
      console.error("Error setting user");
      return null;
    }
  };

  // // Remove user from local storage and context
  // const removeAuthenticatedUser = () => {
  //   try {
  //     localStorage.removeItem("user");
  //     setUser(null);
  //   } catch {
  //     console.error("Error removing user");
  //   }
  // };

  React.useEffect(() => {
    const loadAuthentication = async () => {
      const user = await getAuthenticatedUser();
      if (user?.oid) {
        // Check for existing user
        const existingUser = await getUser(user.oid);
        if (!existingUser?.id) {
          // Create new user
          await saveUser({
            userId: user.oid,
            userName: user.name,
            userFirstName: user.given_name,
            userLastName: user.family_name,
            userEmail: user.unique_name,
            userCourseId: 0,
            userCourseName: "",
            userHandicap: 0,
            userRank: 0,
          });
        }
        await setAuthenticatedUser(user);
      }
    };

    loadAuthentication();

    return () => {};
  }, [state]);

  return <React.Fragment></React.Fragment>;
}
