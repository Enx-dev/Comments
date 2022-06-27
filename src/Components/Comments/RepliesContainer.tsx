import React from "react";
import Replies from "./Replies";

type Props = {
  replies: {
    id: string;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: {
      image: {
        png: string;
        webp: string;
      };
      username: string;
    };
  }[];
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  parentId: string;
};

const RepliesContainer = ({ replies, currentUser, parentId }: Props) => {
  return (
    <div className='ReplyContainer'>
      {replies.map((reply) => (
        <Replies
          currentUser={currentUser}
          content={reply.content}
          createdAt={reply.createdAt}
          id={reply.id}
          replyingTo={reply.replyingTo}
          score={reply.score}
          user={reply.user}
          parentId={parentId}
        />
      ))}
    </div>
  );
};

export default RepliesContainer;
