import { postRequest } from "./RequestClient";
import type {
  ChallengeForm,
  ChallengeRequest,
  ResetPasswordStartRequest,
  ResetPasswordSubmitForm,
  ResetPasswordSubmitRequest,
} from "./RequestTypes";
import type {
  ChallengeResetResponse,
  ChallengeResponse,
  ResetPasswordSubmitResponse,
} from "./ResponseTypes";

export const resetStart = async ({ username }: { username: string }) => {
  const payloadExt: ResetPasswordStartRequest = {
    username,
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    challenge_type: "password oob redirect",
  };

  return await postRequest(
    `${import.meta.env.VITE_BASE_API_URL ?? ""}/resetpassword/v1.0/start`,
    payloadExt,
  );
};

export const resetChallenge = async ({
  continuation_token,
}: {
  continuation_token: string;
}): Promise<ChallengeResponse> => {
  const payloadExt: ChallengeRequest = {
    continuation_token,
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    challenge_type: "oob redirect",
  };

  return await postRequest(
    `${import.meta.env.VITE_BASE_API_URL ?? ""}/resetpassword/v1.0/challenge`,
    payloadExt,
  );
};

export const resetSubmitOTP = async (
  payload: ChallengeForm,
): Promise<ChallengeResetResponse> => {
  const payloadExt = {
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    continuation_token: payload.continuation_token,
    oob: payload.oob,
    grant_type: "oob",
  };

  return await postRequest(
    `${import.meta.env.VITE_BASE_API_URL ?? ""}/resetpassword/v1.0/continue`,
    payloadExt,
  );
};

export const resetSubmitNewPassword = async (
  payload: ResetPasswordSubmitForm,
): Promise<ResetPasswordSubmitResponse> => {
  const payloadExt: ResetPasswordSubmitRequest = {
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    continuation_token: payload.continuation_token,
    new_password: payload.new_password,
  };

  return await postRequest(
    `${import.meta.env.VITE_BASE_API_URL ?? ""}/resetpassword/v1.0/submit`,
    payloadExt,
  );
};

export const resetPoll = async (
  continuation_token: string,
): Promise<ChallengeResetResponse> => {
  const payloadExt = {
    client_id: import.meta.env.VITE_CLIENT_ID ?? "",
    continuation_token,
  };
  return await postRequest(
    `${
      import.meta.env.VITE_BASE_API_URL ?? ""
    }/resetpassword/v1.0/poll_completion`,
    payloadExt,
  );
};
