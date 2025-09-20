import React, { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";
import {
  signInStart,
  signInChallenge,
  signInTokenRequest,
} from "../client/SignInService";

export const SignInPage: React.FC = () => {
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
    try {
      e.preventDefault();
      if (!validateEmail(email)) {
        setError("Invalid email format");
        return;
      }
      setError("");
      setIsloading(true);
      const start = await signInStart(email);
      if (start?.continuation_token) {
        const challenge = await signInChallenge(
          await start?.continuation_token
        );
        if (challenge?.continuation_token) {
          const token = await signInTokenRequest({
            continuation_token: await challenge?.continuation_token,
            grant_type: "password",
            password: password,
          });
          if (token?.error === "invalid_grant") {
            setError("Invalid username or password.");
            setIsloading(false);
            return;
          }
          if (token) {
            navigate("/scoreboard", { state: token });
            setIsloading(false);
          }
        }
      }
    } catch (err) {
      console.log("Error submitting sign in form");
      setError("The putt just missed the hole, please try again.");
      setIsloading(false);
      return err;
    }
  };
  return (
    <>
      <section className="sign-in-form">
        <HeadingOneComponent text={"Sign In"} />
        <IntroductionComponent
          text={"Welcome back! Sign in to your account."}
        />
        <form onSubmit={handleSubmit}>
          <div className="my-3 md:my-9 mx-auto">
            <Fieldset className="space-y-6">
              <Field>
                <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                  Email:
                </Label>
                <Input
                  className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left subpixel-antialiased appearance-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                  Password:
                </Label>
                <Input
                  className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left subpixel-antialiased appearance-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                />
              </Field>
              {error && <div className="error">{error}</div>}
              {isLoading && <div className="warning">Sending request...</div>}
              <Button
                className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 transition-all cursor-pointer"
                type="submit"
              >
                Sign In
              </Button>
            </Fieldset>
          </div>
        </form>
      </section>
    </>
  );
};
