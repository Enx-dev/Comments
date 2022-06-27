import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store/store";

type commentData = {
  data: {
    comments: {
      id: string;
      content: string;
      createdAt: string;
      score: number;
      user: {
        image: {
          png: string;
          webp: string;
        };
        username: string;
      };

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
    }[];
    currentUser: {
      image: {
        png: string;
        webp: string;
      };
      username: string;
    };
  };
};

const initialState: commentData = {
  data: {
    currentUser: {
      image: {
        png: "../../images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    comments: [
      {
        id: "1",
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: "1 month ago",
        score: 12,
        user: {
          image: {
            png: "../../images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "amyrobson",
        },
        replies: [],
      },
      {
        id: "2",
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: "2 weeks ago",
        score: 5,
        user: {
          image: {
            png: "../../images/avatars/image-maxblagun.png",
            webp: "./images/avatars/image-maxblagun.webp",
          },
          username: "maxblagun",
        },
        replies: [
          {
            id: "3",
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: "1 week ago",
            score: 4,
            replyingTo: "maxblagun",
            user: {
              image: {
                png: "../../images/avatars/image-ramsesmiron.png",
                webp: "./images/avatars/image-ramsesmiron.webp",
              },
              username: "ramsesmiron",
            },
          },
          {
            id: "4",
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: "2 days ago",
            score: 2,
            replyingTo: "ramsesmiron",
            user: {
              image: {
                png: "../../images/avatars/image-juliusomo.png",
                webp: "./images/avatars/image-juliusomo.webp",
              },
              username: "juliusomo",
            },
          },
        ],
      },
    ],
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action) {
      state.data.comments.push({
        id: action.payload.id,
        content: action.payload.content,
        createdAt: action.payload.date,
        score: 0,
        user: {
          image: {
            png: " ../../images/avatars/image-juliusomo.png",
            webp: " ../../images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },

        replies: [],
      });
    },
    replyComment(state, action) {
      const ele = state.data.comments;
      if (action.payload.type === "reply") {
        const currentComment = ele.filter(
          (comment) => comment.id === action.payload.parentId
        );
        const replies = currentComment[0].replies;
        const currentReply = replies.filter(
          (reply) => reply.id === action.payload.userId
        );
        const newComment = {
          id: action.payload.id,
          content: action.payload.content,
          replyingTo: action.payload.username,
          createdAt: action.payload.date,
          score: 0,
          user: {
            image: {
              png: "../../images/avatars/image-juliusomo.png",
              webp: "../../images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        };
        const index = replies.indexOf(currentReply[0]) + 1;
        currentComment[0].replies.splice(index, 0, newComment);
        return;
      }
      const currentComment = state.data.comments.filter(
        (comment) => comment.id === action.payload.userId
      );
      currentComment[0].replies.unshift({
        id: action.payload.id,
        content: action.payload.content,
        replyingTo: action.payload.username,
        createdAt: action.payload.date,
        score: 0,
        user: {
          image: {
            png: "../../images/avatars/image-juliusomo.png",
            webp: "../../images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      });
    },
    deleteComment(state, action) {
      const ele = state.data.comments;
      if (action.payload.type === "reply") {
        const currentComment = ele.filter(
          (comment) => comment.id === action.payload.parentId
        );
        const replies = currentComment[0].replies;
        const currentReply = replies.filter(
          (reply) => reply.id === action.payload.id
        );
        replies.splice(replies.indexOf(currentReply[0]), 1);
        return;
      }

      const currentComment = ele.filter(
        (comment) => comment.id === action.payload.id
      );
      ele.splice(ele.indexOf(currentComment[0]), 1);
    },
    updateComment(state, action) {
      const ele = state.data.comments;
      if (action.payload.type === "reply") {
        const currentComment = ele.filter(
          (comment) => comment.id === action.payload.parentId
        );
        const replies = currentComment[0].replies;
        const currentReply = replies.filter(
          (reply) => reply.id === action.payload.id
        );
        currentReply[0].content = action.payload.content;
        return;
      }
      const currentComment = ele.filter(
        (comment) => comment.id === action.payload.id
      );
      currentComment[0].content = action.payload.content;
    },
    increaseScore(state, action) {
      const ele = state.data.comments;
      if (action.payload.type === "reply") {
        const currentComment = ele.filter(
          (comment) => comment.id === action.payload.parentId
        );
        const replies = currentComment[0].replies;
        const currentReply = replies.filter(
          (reply) => reply.id === action.payload.id
        );
        currentReply[0].score += 1;
        return;
      }
      const currentComment = state.data.comments.filter(
        (comment) => comment.id === action.payload.id
      );
      currentComment[0].score += 1;
    },
    DecreaseScore(state, action) {
      const ele = state.data.comments;
      if (action.payload.type === "reply") {
        const currentComment = ele.filter(
          (comment) => comment.id === action.payload.parentId
        );
        const replies = currentComment[0].replies;
        const currentReply = replies.filter(
          (reply) => reply.id === action.payload.id
        );
        currentReply[0].score -= 1;
        return;
      }

      const currentComment = state.data.comments.filter(
        (comment) => comment.id === action.payload.id
      );

      currentComment[0].score -= 1;
    },
  },
});
export const {
  addComment,
  replyComment,
  deleteComment,
  updateComment,
  DecreaseScore,
  increaseScore,
} = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
export const comments = (state: RootState) => state.data;
