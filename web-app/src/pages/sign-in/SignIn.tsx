import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  signInStart,
  signInChallenge,
  signInTokenRequest,
} from "../../client/SignInService";
import type { ErrorResponseType } from "../../client/ResponseTypes";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);

  const navigate = useNavigate();
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    setError("");
    setIsloading(true);
    try {
      const res1 = await signInStart({
        username: email,
      });
      const res2 = await signInChallenge({
        continuation_token: res1.continuation_token,
      });
      const res3 = await signInTokenRequest({
        continuation_token: res2.continuation_token,
        grant_type: "password",
        password: password,
      });
      // navigate("/user", { state: res3 });
      navigate("/", { state: res3 });
    } catch (err) {
      console.log("Submitting sign in form", err);
      setError(
        "An error has occured " + (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <section className="sign-in-form">
        <h1 className="mx-auto text-3xl md:text-6xl font-light subpixel-antialiased">
          Sign In
        </h1>
        <h3 className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-light subpixel-antialiased">
          Welcome back! Please sign in to your account.
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="my-3 md:my-9 mx-auto">
            <Fieldset className="space-y-6">
              <Field>
                <Label className="text-sm/6 font-medium text-white">
                  Email:
                </Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label className="text-sm/6 font-medium text-white">
                  Password:
                </Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                  )}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                />
              </Field>
              {error && <div className="error">{error}</div>}
              {isLoading && <div className="warning">Sending request...</div>}
              <Button className="button py-3 px-3 md:px-9" type="submit">
                Sign In
              </Button>
            </Fieldset>
          </div>
        </form>
      </section>
    </>
  );
};
