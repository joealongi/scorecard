import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";

import HeadingOneComponent from "../components/HeadingOneComponent";
import IntroductionComponent from "../components/IntroductionComponent";

import { signupChallenge, signupStart } from "../client/SignUpService";

export const SignUpPage: React.FC = () => {
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
        setError("It looks like you have an account with this email address.");
        setIsloading(false);
        return;
      }
      if (res1?.error === "invalid_grant") {
        setError("Your new password is not complex enough.");
        setIsloading(false);
        return;
      }
      if (res1?.error && !res1?.continuation_token) {
        setError("Something went wrong, please try again.");
        setIsloading(false);
        return;
      }
      const res2 = await signupChallenge({
        continuation_token: res1.continuation_token,
      });
      navigate("/signup/challenge", { state: { ...res2 } });
      setIsloading(false);
    } catch (err) {
      console.log("Error submitting sign up form");
      setError("The putt just missed the hole, please try again.");
      setIsloading(false);
      return err;
    }
  };
  return (
    <>
      <section className="sign-up-form">
        <HeadingOneComponent text={"Sign Up"} />
        <IntroductionComponent text={"Get started with your account!"} />
        <form onSubmit={handleSubmit}>
          <div className="my-3 md:my-9 mx-auto">
            <Fieldset className="space-y-6">
              <Field>
                <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                  Username:
                </Label>
                <Input
                  className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left subpixel-antialiased appearance-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Field>
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
                  First Name:
                </Label>
                <Input
                  className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left subpixel-antialiased appearance-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <Label className="mx-auto text-lg font-medium subpixel-antialiased text-neutral-300">
                  Last Name:
                </Label>
                <Input
                  className="h-auto w-full p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-left subpixel-antialiased appearance-none"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
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
                Create Account
              </Button>
            </Fieldset>
          </div>
        </form>
      </section>
    </>
  );
};
