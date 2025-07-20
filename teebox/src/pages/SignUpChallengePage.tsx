import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router";

import { signUpSubmitOTP } from "../client/SignUpService";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import clsx from "clsx";
import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

export const SignUpChallengePage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { challenge_target_label, continuation_token, code_length } = state;
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      setIsloading(true);
      const res = await signUpSubmitOTP({ continuation_token, oob: code });
      navigate("/signup/completed");
      setIsloading(false);
      return res;
    } catch (err) {
      console.log("Error submitting sign up form challenge");
      setError("The putt just missed the hole, please try again.");
      setIsloading(false);
      return err;
    }
  };

  return (
    <>
      <section className="sign-up-form">
        <HeadingOneComponent text={"Sign Up Challenge"} />
        <IntroductionComponent
          text={"Enter the one time one time code you received via email."}
        />
        <form onSubmit={handleSubmit}>
          <div className="my-3 md:my-9 mx-auto">
            <Fieldset className="space-y-6">
              <Field>
                <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                  Code:
                </Label>
                <Input
                  className={clsx(
                    "mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-base text-white",
                    "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
                  )}
                  maxLength={code_length}
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </Field>
              {error && <div className="error">{error}</div>}
              {isLoading && <div className="warning">Sending request...</div>}
              <Button
                className="block w-full mx-auto p-3 text-xl text-center font-bold text-neutral-950 bg-lime-600 hover:text-neutral-950 hover:bg-neutral-300 transition-all cursor-pointer"
                type="submit"
              >
                Sign Up
              </Button>
            </Fieldset>
          </div>
        </form>
      </section>
    </>
  );
};
