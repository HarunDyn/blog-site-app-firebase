import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Typography,
} from "@mui/material";
import { common } from "@mui/material/colors";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { successNote } from "../helpers/toasNotify";

function Comment({ item, currentId, indexField, data }) {
  const db = getFirestore();
  const docRef = doc(db, "datas", currentId);
  const { currentUser } = React.useContext(AuthContext);

  const deleteComment = async () => {
    updateDoc(docRef, { countComment: data.countComment - 1 });
    const updateValue = data.comment.filter((com) => {
      return com.commentId !== item.commentId;
    });

    await updateDoc(docRef, {
      comment: [...updateValue],
    });
    successNote("Comment deleted successfully");
  };

  React.useEffect(() => {}, [item]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "90vw",
      }}
    >
      <Card
        sx={{
          width: "77%",
          boxShadow: "3px 3px 7px black",
          marginTop: "3rem",
          marginBottom: "3rem",
          position: "relative",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: common.black }} aria-label="recipe">
              {item.commentUser.length > 2
                ? item.commentUser[0]
                : item.commentUser}
            </Avatar>
          }
          subheader={item.commentDate}
        />

        <Typography variant="body2" color="text.secondary" sx={{ m: 2, mb: 4 }}>
          {item.commentContent}
        </Typography>
        {currentUser.displayName === item.commentUser ? (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="error"
            sx={{
              position: "absolute",
              margin: "1rem",
              bottom: "0",
              right: "0",
            }}
            onClick={() => {
              if (item.commentUser === currentUser.displayName) {
                deleteComment();
              } else {
                alert("You are not authorized");
              }
            }}
          >
            Delete
          </Button>
        ) : null}
      </Card>
    </Box>
  );
}

export default Comment;
