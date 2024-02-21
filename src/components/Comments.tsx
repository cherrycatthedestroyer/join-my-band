import { Container, Skeleton } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../store/actions";
import { getCurrentDateTime } from "../../scripts/helper";
import { Comment } from "./Comment";

interface Comment {
  content: string;
  visitor_name: string;
  time: string;
}

export interface CommentProps extends PropsFromRedux {
  sub_id: string;
}

const Comments: React.FC<CommentProps> = ({ sub_id, stateList }) => {
  const commentInput = useRef<HTMLInputElement>(null);
  const [commentList, setCommentList] = useState<Comment[]>();
  const [commentState, setCommentState] = useState("unloaded");
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (commentState === "unloaded") {
      setCommentState("loading");
      hydrateComments();
    }
  });

  const hydrateComments = async () => {
    try {
      const response = await axios.get(`/api/getComments?id=${sub_id}`);
      if (response.status === 200) {
        if (response.data.success) {
          setCommentList((prev) => {
            let responseList = response.data.data as Comment[];
            if (prev !== undefined && responseList.length > prev.length) {
              let updatedList: Comment[] = responseList.slice(prev.length);
              return [...prev, ...updatedList];
            } else {
              return responseList;
            }
          });
          setCommentState("loaded");
        }
      }
    } catch (error) {
      console.log("error fetching comments");
    }
  };

  const handleAdd = async () => {
    const entryText = commentInput.current!.value.trim();
    if (entryText.length > 0) {
      try {
        const response = await axios.get(
          `/api/getVisitors?ip=${stateList.ip_address}`
        );
        if (response.status === 200) {
          if (response.data.success) {
            try {
              const response2 = await axios.post("/api/postComment", {
                submissionId: sub_id,
                comment: {
                  content: entryText,
                  visitor_name: response.data.data.name,
                  time: getCurrentDateTime(),
                },
              });
              if (response2.data.success) {
                commentInput.current!.value = "";
                hydrateComments();
                console.log("posted comment");
              }
            } catch (error) {
              console.log("error posting comment");
            }
          }
        }
      } catch (error) {
        console.log("error checking ip");
      }
    }
  };

  function handleInputChange() {
    if (commentInput.current!.value !== null) {
      if (commentInput.current!.value.trim().length > 10) {
        setButtonState(true);
      } else {
        setButtonState(false);
      }
    }
  }

  return (
    <Container>
      <h2 className="text-xl md:mb-4 text-slate-700 mb-2 font-bold mt-8">
        {commentList !== undefined
          ? commentList.length === 1
            ? "1 Comment"
            : commentList.length + " Comments"
          : "0 Comments"}
      </h2>
      <div className="flex shadow mb-4 border rounded">
        <input
          ref={commentInput}
          type="text"
          onChange={handleInputChange}
          placeholder="add a comment"
          className={
            "rounded-l py-2 pl-3 w-4/5 text-gray-700 leading-tight focus:outline-stone-300"
          }
        />
        <button
          disabled={buttonState ? false : true}
          type="button"
          onClick={handleAdd}
          className={`w-1/5 rounded-r bg-stone-100 text-xs py-2 pr-3 ${
            buttonState ? "text-black" : ""
          }`}
        >
          add
        </button>
      </div>
      {commentList !== undefined
        ? commentList.map((comment, id) => (
            <Comment
              name={comment.visitor_name}
              content={comment.content}
              time={comment.time}
              key={id}
            />
          ))
        : undefined}
      {commentState === "loading" ? (
        <>
          <Skeleton
            width={"100%"}
            height={"100%"}
            animation="wave"
            variant="rounded"
          />
          <Skeleton
            width={"100%"}
            height={"100%"}
            animation="wave"
            variant="rounded"
          />
        </>
      ) : undefined}
    </Container>
  );
};

// Connect the component to the Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

// Generate props types for the connected component
type PropsFromRedux = ConnectedProps<typeof connector>;

// Export the connected component
export default connector(Comments);
