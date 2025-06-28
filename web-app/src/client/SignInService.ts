import { postRequest } from "./RequestClient";
import type {
  ChallengeRequest,
  SignInStartRequest,
  TokenRequestType,
  TokenSignInType,
} from "./RequestTypes";
import type { TokenResponseType } from "./ResponseTypes";

export const signInStart = async ({ username }: { username: string }) => {
  const payloadExt: SignInStartRequest = {
    username,
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    challenge_type: "password oob redirect",
  };

  return await postRequest(`/oauth2/v2.0/initiate`, payloadExt);
};

export const signInChallenge = async ({
  continuation_token,
}: {
  continuation_token: string;
}) => {
  const payloadExt: ChallengeRequest = {
    continuation_token,
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    challenge_type: "password oob redirect",
  };

  return await postRequest(`/oauth2/v2.0/challenge`, payloadExt);
};

export const signInTokenRequest = async (
  request: TokenSignInType
): Promise<TokenResponseType> => {
  const payloadExt: TokenRequestType = {
    ...request,
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    challenge_type: "password oob redirect",
    scope: "openid offline_access",
  };

  if (request.grant_type === "password") {
    payloadExt.password = request.password;
  }

  if (request.grant_type === "oob") {
    payloadExt.oob = request.oob;
  }

  return await postRequest(`/oauth2/v2.0/token`, payloadExt);
};
