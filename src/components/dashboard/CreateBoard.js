import React, { useContext, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { FaTimes } from "react-icons/fa";
import * as Yup from "yup";

import DashboardContext from "../../context/DashboardContext";

function handleCreateBoardValidation() {
  return Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    teamId: Yup.string().length(24, "Team has been tampered"),
  });
}

function handleSubmit({
  values,
  actions,
  setCbState,
  dispatchDashboard,
  close,
}) {
  setCbState((ps) => ({ ...ps, btnText: "Creating Board..." }));
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/boards`, { board: values })
    .then((res) => {
      console.log(res?.data?.board);
      if (res?.data?.board) {
        actions.setSubmitting(false);
        setCbState((ps) => ({ ...ps, btnText: "Create Board" }));
        actions.resetForm();
        close();
        dispatchDashboard({ type: "add-board", value: res?.data?.board });
      }
    })
    .catch((err) => {
      actions.setSubmitting(false);
      setCbState((ps) => ({
        btnText: "Create Board",
      }));
      actions.resetForm();
      dispatchDashboard({ type: "set-error", value: err?.response?.data?.msg });
    });
}

function CreateBoard(props) {
  const dashboardContext = useContext(DashboardContext);
  const { dashboardState, dispatchDashboard } = dashboardContext;
  const teams = dashboardState?.teams?.reduce(
    (teams, team) => [...teams, { id: team._id, name: team.name }],
    []
  );
  const [cbState, setCbState] = useState({
    pageErr: "",
    btnText: "Create Board",
  });
  return (
    <div className="create-board">
      <div className="relative">
        <button
          className="absolute top-0 right-0 focus:outline-none"
          onClick={props.close}
        >
          <FaTimes />
        </button>
        <Formik
          validationSchema={handleCreateBoardValidation}
          initialValues={{ name: "", teamId: props.team._id }}
          onSubmit={(values, actions) =>
            handleSubmit({
              values,
              actions,
              setCbState,
              dispatchDashboard,
              close: props.close,
            })
          }
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="p-3 pt-8">
              <div>
                <input
                  className="block w-full px-2 py-1 border-2 border-gray-800 rounded-sm"
                  type="text"
                  name="name"
                  placeholder="Add board title"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <small className="text-red-400">{formik.errors.name}</small>
                ) : null}
              </div>
              <div className="flex justify-between text-xs ">
                <select
                  value={props.team._id}
                  className="p-2 my-4 text-sm"
                  name="teamId"
                  {...formik.getFieldProps("teamId")}
                >
                  {teams?.map((team) => (
                    <option className="text-xs" key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {formik.touched.teamId && formik.errors.teamId ? (
                  <small className="text-red-400">{formik.errors.teamId}</small>
                ) : null}
                <button
                  type="submit"
                  className={`self-center px-3 py-2 text-blue-100 bg-blue-400 rounded-sm ${
                    formik.isSubmitting ? "cursor-not-allowed" : ""
                  } `}
                >
                  {cbState.btnText}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default CreateBoard;
