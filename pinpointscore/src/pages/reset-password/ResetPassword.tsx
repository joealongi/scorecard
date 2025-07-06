import React, { useState } from "react";

import { NavLink } from "react-router";

import {
  resetChallenge,
  resetStart,
  resetSubmitNewPassword,
  resetSubmitOTP,
} from "../../client/ResetPasswordService";
import type {
  ChallengeResetResponse,
  ChallengeResponse,
  ErrorResponseType,
} from "../../client/ResponseTypes";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";

export const ResetPassword: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [tokenRes, setTokenRes] = useState<ChallengeResponse>({
    binding_method: "",
    challenge_channel: "",
    challenge_target_label: "",
    challenge_type: "",
    code_length: 0,
    continuation_token: "",
    interval: 0,
  });
  const [otpRes, setOTPRes] = useState<ChallengeResetResponse>({
    expires_in: 0,
    continuation_token: "",
  });

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      setError("Username is required");
      return;
    }
    setError("");
    try {
      setIsloading(true);
      const res1 = await resetStart({ username });
      const tokenRes = await resetChallenge({
        continuation_token: res1.continuation_token,
      });
      setTokenRes(tokenRes);
      setStep(2);
    } catch (err) {
      setError(
        "An error occurred during password reset " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      setIsloading(true);
      const res = await resetSubmitOTP({
        continuation_token: tokenRes.continuation_token,
        oob: otp,
      });
      setOTPRes(res);
      setStep(3);
    } catch (err) {
      setError(
        "An error occurred while submitting the otp code " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmitNewPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newPassword) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      setIsloading(true);
      await resetSubmitNewPassword({
        continuation_token: otpRes.continuation_token,
        new_password: newPassword,
      });
      setStep(4);
    } catch (err) {
      setError(
        "An error occurred while submitting the new password " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="reset-password-form">
        {/* Collect username to initiate password reset flow */}
        {step === 1 && (
          <section className="reset-password-form">
            <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
              Reset Password
            </h1>
            <h3 className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-light subpixel-antialiased">
              Enter your username to regain access to your account.
            </h3>
            <form onSubmit={handleResetPassword}>
              <div className="my-3 md:my-9 mx-auto">
                <Fieldset className="space-y-6">
                  <Field>
                    <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                      Username:
                    </Label>
                    <Input
                      className={clsx(
                        "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                      )}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Field>
                  {error && <div className="error">{error}</div>}
                  {isLoading && (
                    <div className="warning">Sending request...</div>
                  )}
                  <Button
                    className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all cursor-pointer"
                    type="submit"
                  >
                    Reset Password
                  </Button>
                </Fieldset>
              </div>
            </form>
          </section>
        )}
        {/* Collect OTP */}
        {step === 2 && (
          <section className="reset-password-form">
            <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
              Reset Password
            </h1>
            <h3 className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-light subpixel-antialiased">
              Submit your one time code received via email at{" "}
              {tokenRes.challenge_target_label} .
            </h3>
            <form onSubmit={handleSubmitCode}>
              <div className="my-3 md:my-9 mx-auto">
                <Fieldset className="space-y-6">
                  <Field>
                    <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                      One Time Code:
                    </Label>
                    <Input
                      className={clsx(
                        "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                      )}
                      type="text"
                      maxLength={tokenRes.code_length}
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      required
                    />
                  </Field>
                  {error && <div className="error">{error}</div>}
                  {isLoading && (
                    <div className="warning">Sending request...</div>
                  )}
                  <Button
                    className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all cursor-pointer"
                    type="submit"
                  >
                    Submit Code
                  </Button>
                </Fieldset>
              </div>
            </form>
          </section>
        )}
        {/* Collect new password */}
        {step === 3 && (
          <section className="reset-password-form">
            <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
              Reset Password
            </h1>
            <h3 className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-light subpixel-antialiased">
              Create a new password for your account.
            </h3>
            <form onSubmit={handleSubmitNewPassword}>
              <div className="my-3 md:my-9 mx-auto">
                <Fieldset className="space-y-6">
                  <Field>
                    <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                      New Password:
                    </Label>
                    <Input
                      className={clsx(
                        "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                        "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                      )}
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </Field>
                  {error && <div className="error">{error}</div>}
                  {isLoading && (
                    <div className="warning">Sending request...</div>
                  )}
                  <Button
                    className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all cursor-pointer"
                    type="submit"
                  >
                    Create New Password
                  </Button>
                </Fieldset>
              </div>
            </form>
          </section>
        )}
        {/* Report success after password reset is successful */}
        {step === 4 && (
          <section className="sign-up-form">
            <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
              Reset Password
            </h1>
            <h3 className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-light subpixel-antialiased">
              Your password has been successfully reset!
            </h3>
            <div className="my-3 md:my-9 mx-auto">
              <NavLink
                rel="noopener noreferrer"
                target="_self"
                to="/signin"
                className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all cursor-pointer"
              >
                Sign In
              </NavLink>
            </div>
          </section>
        )}
      </div>
    </>
  );
};
