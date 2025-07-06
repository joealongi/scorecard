import React, { useState } from "react";

import { useNavigate } from "react-router";

import { signupChallenge, signupStart } from "../../client/SignUpService";
import type { ErrorResponseType } from "../../client/ResponseTypes";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";

export const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
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
    if (!name || !surname || !email) {
      setError("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    try {
      setIsloading(true);
      const res1 = await signupStart({
        name,
        surname,
        username: email,
        password,
      });
      if (res1?.error === "user_already_exists") {
        setError(
          "An error occurred during sign up, it looks like you have an account with this email address."
        );
        setIsloading(false);
        return;
      }
      if (res1?.error === "invalid_grant") {
        setError(
          "An error occurred during sign up, your new password is not complex enough."
        );
        setIsloading(false);
        return;
      }
      const res2 = await signupChallenge({
        continuation_token: res1.continuation_token,
      });
      navigate("/signup/challenge", { state: { ...res2 } });
    } catch (err) {
      console.log("Submitting sign up form", err);
      setError(
        "An error occurred during sign up " +
          (err as ErrorResponseType).error_description
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <>
      <section className="sign-up-form">
        <h1 className="mx-auto text-3xl md:text-6xl font-bold subpixel-antialiased text-neutral-300">
          Sign Up
        </h1>
        <h3 className="my-3 md:my-9 mx-auto text-xl md:text-3xl font-light subpixel-antialiased">
          Get started with your account!
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="my-3 md:my-9 mx-auto">
            <Fieldset className="space-y-6">
              <Field>
                <Label className="text-lg font-medium text-white">
                  Username:
                </Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                  )}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label className="text-lg font-medium text-white">Email:</Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label className="text-lg font-medium text-white">
                  First Name:
                </Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                  )}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label className="text-lg font-medium text-white">
                  Last Name:
                </Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                  )}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label className="text-lg font-medium text-white">
                  Password:
                </Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full border-none bg-white/5 px-3 py-1.5 text-base text-white",
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
              <Button
                className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-800 bg-lime-600 hover:text-neutral-900 hover:bg-neutral-300 transition-all cursor-pointer"
                type="submit"
              >
                Create Account
              </Button>
            </Fieldset>
          </div>
        </form>
      </section>
    </>
  );
};
