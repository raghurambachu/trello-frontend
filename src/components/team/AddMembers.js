import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// function validateAddMembersForm() {
//   return Yup.object({
//     members: Yup.string()
//       .matches(
//         /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/g,
//         "Enter valid email & they should be comma separated"
//       )
//       .required("Required"),
//   });
// }

function handleSubmit(values, actions, teamId, dispatchTeam) {
  console.log(values);
  axios
    .put(`${process.env.REACT_APP_BASE_URL}/teams/${teamId}`, {
      team: values.members.split(","),
    })
    .then((res) => {
      console.log(res);
      if (res?.data?.team) {
        console.log(res?.data?.team);
        actions.setSubmitting(false);
        dispatchTeam({ type: "reset" });
      }
    })
    .catch((err) => {
      actions.setSubmitting(false);
      actions.resetForm();
      console.log(err);
    });
}

function AddMembers(props) {
  return (
    <div>
      <Formik
        // validationSchema={validateAddMembersForm}
        initialValues={{ members: "" }}
        onSubmit={(values, actions) =>
          handleSubmit(values, actions, props.teamId, props.dispatchTeam)
        }
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="w-80"
              id="members"
              name="members"
              placeholder="Comma separated list of email addresses"
              {...formik.getFieldProps("members")}
            />
            {formik.touched.members && formik.errors.members ? (
              <small className="text-red-400">{formik.errors.members}</small>
            ) : null}

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className={`w-10/12 p-3 my-4 text-sm text-gray-100 bg-gray-500 ${
                formik.isSubmitting ? "cursor-not-allowed" : ""
              }`}
            >
              {formik.isSubmitting ? "Updating members..." : "Add Members"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default AddMembers;
