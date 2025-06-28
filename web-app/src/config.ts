export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID ?? "";
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL ?? "";
export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI ?? "";
export const ENV = {
  REDIRECT_URI,
  urlOauthInit: `${BASE_API_URL}/oauth2/v2.0/initiate`,
  urlOauthChallenge: `${BASE_API_URL}/oauth2/v2.0/challenge`,
  urlOauthToken: `${BASE_API_URL}/oauth2/v2.0/token`,
  urlSignupStart: `${BASE_API_URL}/signup/v1.0/start`,
  urlSignupChallenge: `${BASE_API_URL}/signup/v1.0/challenge`,
  urlSignupContinue: `${BASE_API_URL}/signup/v1.0/continue`,
  urlResetPwdStart: `${BASE_API_URL}/resetpassword/v1.0/start`,
  urlResetPwdChallenge: `${BASE_API_URL}/resetpassword/v1.0/challenge`,
  urlResetPwdContinue: `${BASE_API_URL}/resetpassword/v1.0/continue`,
  urlResetPwdSubmit: `${BASE_API_URL}/resetpassword/v1.0/submit`,
  urlResetPwdPollComp: `${BASE_API_URL}/resetpassword/v1.0/poll_completion`,
};
