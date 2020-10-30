import React from "react";
import CommentItem from "./CommentItem";

function CommentList(props) {
  return (
    <ul className="my-2 comments-list">
      {props?.comments?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentList;
