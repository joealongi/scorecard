import * as React from "react";

import { useFormik } from "formik";
import type { FormikProps } from "formik";
import * as yup from "yup";

import { Field, Fieldset, Input, Label, Button } from "@headlessui/react";

import type { Scorecard, SubmitScorecard } from "../types/ScorecardTypes";
import type { CoursecardHole } from "../types/CoursecardTypes";

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
  userId?: string;
  userScores?: number[];
  golfCourseId?: number;
}>) {
  const [holesPlayed, setHolesPlayed] = React.useState<CoursecardHole[]>();

  // Form validation and submission
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

  // Handle adding to score (increment)
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

  // Handle subtracting from score (decrement)
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

  // Handle loading user scores for scorecard
  const handleLoadingUserScores = async () => {
    try {
      if (Array.isArray(userScores) && userScores?.length > 0) {
        formik.setFieldValue("userScores", userScores);
      }
    } catch (error) {
      console.error("Error loading user scores");
      return error;
    }
  };

  // Load on refresh / reload
  React.useEffect(() => {
    const load = async () => {
      await handleLoadingUserScores();
      // Default eighteen holes
      setHolesPlayed([
        { hole: "Hole One (1)" },
        { hole: "Hole Two (2)" },
        { hole: "Hole Three (3)" },
        { hole: "Hole Four (4)" },
        { hole: "Hole Five (5)" },
        { hole: "Hole Six (6)" },
        { hole: "Hole Seven (7)" },
        { hole: "Hole Eight (8)" },
        { hole: "Hole Nine (9)" },
        { hole: "Hole Ten (10)" },
        { hole: "Hole Eleven (11)" },
        { hole: "Hole Twelve (12)" },
        { hole: "Hole Thirteen (13)" },
        { hole: "Hole Fourteen (14)" },
        { hole: "Hole Fifteen (15)" },
        { hole: "Hole Sixteen (16)" },
        { hole: "Hole Seventeen (17)" },
        { hole: "Hole Eighteen (18)" },
      ]);
    };
    load();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Fieldset className="my-9 border-1 border-neutral-950">
          {Array?.isArray(holesPlayed) && holesPlayed.length > 0 ? (
            holesPlayed.map((item, index) => (
              <Field key={`hole-${item?.hole}-${index}`}>
                <Label className="flex flex-row flex-auto justify-start p-3 text-lg font-bold text-neutral-300 bg-neutral-300/6 text-left subpixel-antialiased">
                  {item.hole}
                </Label>
                <div className="flex flex-row flex-auto justify-center content-evenly items-stretch">
                  <Button
                    className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 hover:bg-lime-600 text-center border-1 border-l-0 border-neutral-950 subpixel-antialiased cursor-pointer"
                    onClick={() => handleDecrementScore(index, formik)}
                    disabled={activity === "delete"}
                  >
                    -
                  </Button>
                  <Input
                    className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-300 text-center border-t-1 border-b-1 border-neutral-950 subpixel-antialiased"
                    value={formik?.values?.userScores?.[index]}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `userScores[${index}]`,
                        e?.target?.value
                      )
                    }
                    type="number"
                    required={activity !== "delete"}
                    disabled={activity === "delete"}
                  />
                  <Button
                    className="flex flex-col flex-1 justify-self-center self-stretch min-w-[1/3] max-w-[1/3] p-3 text-xl font-bold text-neutral-950 bg-neutral-400 bg-lime-950 hover:bg-lime-600 text-center border-1 border-r-0 border-neutral-950 subpixel-antialiased cursor-pointer"
                    onClick={() => handleIncrementScore(index, formik)}
                    disabled={activity === "delete"}
                  >
                    +
                  </Button>
                </div>
              </Field>
            ))
          ) : (
            <React.Fragment></React.Fragment>
          )}

          <Button
            className="block w-full mx-auto mt-9 p-3 text-xl text-center font-bold text-neutral-950 hover:text-neutral-950 bg-lime-600 hover:bg-neutral-300 transition-all cursor-pointer"
            type="submit"
          >
            {text}
          </Button>
        </Fieldset>
      </form>
    </React.Fragment>
  );
}
