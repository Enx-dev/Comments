import React from "react";
import Comments from "./Comments/Comments";
import InputComp from "./InputComp";
import { useAppSelector } from "../App/Store/store";
import { comments } from "../App/Slice/commentSlice";
type Props = {};

const Container = (props: Props) => {
  const commentsData = useAppSelector(comments);
  return (
    <section className='Container'>
      {commentsData.comments.map((comment) => (
        <Comments
          content={comment.content}
          createdAt={comment.createdAt}
          id={comment.id}
          replies={comment.replies}
          score={comment.score}
          user={comment.user}
          key={comment.id}
          currentUser={commentsData.currentUser}
        />
      ))}

      <InputComp currentUser={commentsData.currentUser} />
    </section>
  );
};

export default Container;
