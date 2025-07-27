import * as React from "react";

import { useFormik } from "formik";
import type { FormikProps } from "formik";
import * as yup from "yup";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";
import HeadingSixComponent from "./HeadingSixComponent";

import type { Scorecard, SubmitScorecard } from "../types/ScorecardTypes";

const validationSchema = yup.object({
  userScores: yup.array().of(yup.number().min(0).required()),
});

export default function ScorecardEditorComponent({
  handleSubmitScorecard,
  activity,
  text,
  userId,
  userScores,
  golfCourseId,
}: Readonly<{
  activity?: string;
  handleSubmitScorecard?: (
    submitScorecard: SubmitScorecard
  ) => Promise<unknown>;
  text?: string;
  userId?: number;
  userScores?: number[];
  golfCourseId?: number;
}>) {
  const formik = useFormik<Scorecard>({
    initialValues: {
      userScores: userScores ?? [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (handleSubmitScorecard) {
          await handleSubmitScorecard({
            activity: activity ?? "",
            userId,
            userScores: values?.userScores,
            golfCourseId,
          });
        }
      } catch (error) {
        console.log("Error adding new scorecard");
        return error;
      }
    },
  });

  const handleIncrementScore = (
    index: number,
    formik: FormikProps<Scorecard>
  ) => {
    const userScores = [...(formik?.values?.userScores ?? [])];
    const score = userScores?.[index];
    if (!isNaN(score)) {
      userScores[index] = Math.abs(score + 1);
    }
    formik.setFieldValue("userScores", userScores);
  };

  const handleDecrementScore = (
    index: number,
    formik: FormikProps<Scorecard>
  ) => {
    const userScores = [...(formik?.values?.userScores ?? [])];
    const score = userScores?.[index];
    if (!isNaN(score)) {
      userScores[index] = Math.abs(score - 1);
    }
    formik.setFieldValue("userScores", userScores);
  };

  const handleUserScores = async () => {
    try {
      if (Array.isArray(userScores) && userScores?.length > 0) {
        formik.setFieldValue("userScores", userScores);
      }
    } catch (error) {
      console.error("Error loading user scores");
      return error;
    }
  };

  React.useEffect(() => {
    const loadScorecard = async () => {
      await handleUserScores();
    };
    loadScorecard();
    return () => {};
  }, [userScores]);

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Fieldset className="space-y-6">
          <HeadingSixComponent text={"Hole One (1)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(0, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[0]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[0]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(0, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Two (2)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(1, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[1]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[1]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(1, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Three (3)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(2, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[2]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[2]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(2, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Four (4)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(3, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[3]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[3]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(3, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Five (5)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(4, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[4]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[4]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(4, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Six (6)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(5, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[5]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[5]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(5, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Seven (7)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(6, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[6]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[6]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(6, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Eight (8)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(7, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[7]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[7]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(7, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Nine (9)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(8, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[8]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[8]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(8, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Ten (10)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(9, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[9]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[9]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(9, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Eleven (11)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(10, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[10]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[10]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(10, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Twelve (12)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(11, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[11]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[11]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(11, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Thirteen (13)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(12, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[12]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[12]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(12, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Fourteen (14)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(13, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[13]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[13]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(13, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Fifteen (15)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(14, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[14]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[14]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(14, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Sixteen (16)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(15, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[15]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[15]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(15, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Seventeen (17)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(16, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[16]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[16]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(16, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <hr className="my-3 border-t border-lime-600" />
          <HeadingSixComponent text={"Hole Eighteen (18)"} />
          <Field>
            <Label className="invisible hidden">Score:</Label>
            <div className="flex flex-row flex-auto justify-center content-evenly items-stretch my-3">
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-r-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleDecrementScore(17, formik)}
                disabled={activity === "delete"}
              >
                -
              </Button>
              <Input
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center subpixel-antialiased"
                value={formik?.values?.userScores?.[17]}
                onChange={(e) =>
                  formik.setFieldValue("userScores[17]", e?.target?.value)
                }
                type="number"
                required={activity !== "delete"}
                disabled={activity === "delete"}
              />
              <Button
                className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-l-1 border-neutral-950 subpixel-antialiased cursor-pointer"
                onClick={() => handleIncrementScore(17, formik)}
                disabled={activity === "delete"}
              >
                +
              </Button>
            </div>
          </Field>
          <Button
            className="block w-full mx-auto my-3 p-3 text-xl text-center font-bold text-neutral-950 hover:text-neutral-950 bg-lime-600 hover:bg-neutral-300 transition-all cursor-pointer"
            type="submit"
          >
            {text}
          </Button>
        </Fieldset>
      </form>
    </React.Fragment>
  );
}
