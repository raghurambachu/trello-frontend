import React, { useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import BoardContext from "../../context/BoardContext";

function validateEditListForm() {
  return Yup.object({
    name: Yup.string().min(2).max(25).required(),
  });
}

function handleSubmit(
  values,
  _actions,
  dispatch,
  boardState,
  listId,
  dispatchBoard
) {
  const list = { _id: listId, name: values.name };
  axios
    .put(`${process.env.REACT_APP_BASE_URL}/lists/${boardState.boardId}`, {
      list,
    })
    .then((res) => {
      if (res?.data?.list?._id) {
        const { _id: listId, name } = res?.data?.list;
        dispatchBoard({ type: "edit-list-title", value: { listId, name } });
      } else {
        console.log("Error");
      }
      // todo need to take care of error that comes in res.data.list
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => dispatch({ type: "save-title" }));
}

// Todo: need to convert multiple parameters to object
function EditList(props) {
  const { boardState, dispatchBoard } = useContext(BoardContext);
  return (
    <Formik
      validationSchema={validateEditListForm}
      initialValues={{ name: props.listTitle }}
      onSubmit={(values, actions) =>
        handleSubmit(
          values,
          actions,
          props.dispatch,
          boardState,
          props.listId,
          dispatchBoard
        )
      }
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <input
            className="w-full p-1 px-2 border-2 border-gray-700"
            type="text"
            name="name"
            id="name"
            {...formik.getFieldProps("name")}
            onBlur={formik.handleSubmit}
          />
        </form>
      )}
    </Formik>
  );
}

export default EditList;
