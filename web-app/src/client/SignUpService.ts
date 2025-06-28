import { postRequest } from "./RequestClient";
import type {
  ChallengeForm,
  SignUpChallengeRequest,
  SignUpFormPassword,
  SignUpStartRequest,
} from "./RequestTypes";
import type { ChallengeResponse } from "./ResponseTypes";

//handle start a sign-up flow
export const signupStart = async (payload: SignUpFormPassword) => {
  const payloadExt: SignUpStartRequest = {
    attributes: JSON.stringify({
      given_name: payload.name,
      surname: payload.surname,
    }),
    username: payload.username,
    password: payload.password,
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    challenge_type: "password oob redirect",
  };

  return await postRequest(
    `${import.meta.env.VITE_BASE_API_URL ?? ""}/signup/v1.0/start`,
    payloadExt
  );
};

//handle selecting an authentication method
export const signupChallenge = async (
  payload: ChallengeForm
): Promise<ChallengeResponse> => {
  const payloadExt: SignUpChallengeRequest = {
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    challenge_type: "password oob redirect",
    continuation_token: payload.continuation_token,
  };

  return await postRequest(
    `${import.meta.env.VITE_BASE_API_URL ?? ""}/signup/v1.0/challenge`,
    payloadExt
  );
};

//handle submit one-time passcode
export const signUpSubmitOTP = async (payload: ChallengeForm) => {
  const payloadExt = {
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    continuation_token: payload.continuation_token,
    oob: payload.oob,
    grant_type: "oob",
  };

  return await postRequest(
    `${import.meta.env.VITE_BASE_API_URL ?? ""}/signup/v1.0/continue`,
    payloadExt
  );
};
