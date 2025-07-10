//SignUp
export interface SignUpStartRequest {
  client_id: string;
  username: string;
  challenge_type: string;
  password?: string;
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  attributes?: Object;
}

export interface SignUpChallengeRequest {
  client_id: string;
  continuation_token: string;
  challenge_type?: string;
}

export interface SignUpFormPassword {
  name: string;
  surname: string;
  username: string;
  password: string;
}

//OTP
export interface ChallengeForm {
  continuation_token: string;
  oob?: string;
  password?: string;
}

export interface TokenRequestType {
  continuation_token: string;
  client_id: string;
  grant_type: string;
  scope: string;
  password?: string;
  oob?: string;
  challenge_type?: string;
}

// Sign in
export interface TokenSignInType {
  continuation_token: string;
  grant_type: string;
  password?: string;
  oob?: string;
}

export interface ChallengeRequest {
  client_id: string;
  challenge_type: string;
  continuation_token: string;
}

export interface SignInStartRequest {
  client_id: string;
  challenge_type: string;
  username: string;
}

export interface SignInTokenRequest {
  client_id: string;
  grant_type: string;
  continuation_token: string;
  scope: string;
  challenge_type?: string;
  password?: string;
  oob?: string;
}

export interface ResetPasswordStartRequest {
  username: string;
  challenge_type: string;
  client_id: string;
}

export interface ResetPasswordSubmitRequest {
  client_id: string;
  continuation_token: string;
  new_password: string;
}

export interface ResetPasswordSubmitForm {
  continuation_token: string;
  new_password: string;
}
