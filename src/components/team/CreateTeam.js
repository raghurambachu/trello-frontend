import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import axios from "axios";
import createTeam from "../../images/team/createTeam.svg";
import { useContext } from "react";
import DashboardContext from "../../context/DashboardContext";
import TeamContext from "../../context/TeamContext";

function validateTeamForm() {
  return Yup.object({
    name: Yup.string()
      .min(2, "Must be 2 characters or more")
      .max(25, "Must be 25 characters or less")
      .required("Required"),
    description: Yup.string()
      .min(5, "Must be 5 char or more")
      .required("Required"),
  });
}

function handleSubmit(
  values,
  actions,
  dispatchTeam,
  dispatchDashboard,
  setTeamId
) {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/teams`, { team: values })
    .then((res) => {
      if (res?.data?.team) {
        actions.setSubmitting(false);
        dispatchDashboard({ type: "set-team", value: res?.data?.team });
        setTeamId(res?.data?.team?._id);
        dispatchTeam({ type: "team-created" });
      }
    })
    .catch((err) => {
      actions.setSubmitting(false);
      actions.resetForm();
    });
}

function CreateTeam(props) {
  const { dispatchDashboard } = useContext(DashboardContext);
  const { dispatchTeam } = useContext(TeamContext);

  return (
    <div className="container text-gray-700 bg-gray-200 rounded-lg create-team">
      <div className="grid grid-cols-2 ">
        <div className="col-span-1 px-24 py-16">
          <h2 className="text-2xl font-bold">Let's Build a Team</h2>
          <p className="my-2 text-lg">
            Boost your productivity by making it easier for everyone to access
            boards in one location.
          </p>
          <Formik
            validationSchema={validateTeamForm}
            initialValues={{ name: "", description: "" }}
            onSubmit={(values, actions) =>
              handleSubmit(
                values,
                actions,
                dispatchTeam,
                dispatchDashboard,
                props.setTeamId
              )
            }
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit} className="my-8">
                <div className="my-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-xs font-bold"
                  >
                    Team Name
                  </label>
                  <input
                    className="block w-11/12 p-2 rounded"
                    type="text"
                    placeholder="Taco's co."
                    id="name"
                    name="name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <small className="text-red-400">{formik.errors.name}</small>
                  ) : null}
                </div>
                <div className="my-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-xs font-bold"
                  >
                    Team Description
                  </label>
                  <textarea
                    className="block w-11/12 h-40 p-2 rounded resize-none"
                    placeholder="Our team organizes everything here."
                    id="description"
                    name="description"
                    {...formik.getFieldProps("description")}
                  ></textarea>
                  {formik.touched.description && formik.errors.description ? (
                    <small className="text-red-400">
                      {formik.errors.description}
                    </small>
                  ) : null}

                  <small className="block mt-4">
                    Get your members on board with a few words about your team.
                  </small>
                </div>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`w-10/12 p-3 my-4 text-sm text-gray-100 bg-gray-500 ${
                    formik.isSubmitting ? "cursor-not-allowed" : ""
                  }`}
                >
                  {formik.isSubmitting ? "Creating team..." : "Continue"}
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="col-span-1 px-24 py-40 bg-gradient-to-b from-green-100 via-green-200 to-green-100 ">
          <img src={createTeam} alt="Create Team" />
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
