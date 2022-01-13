import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { colRef } from "../contexts/BlogContext";
import { AuthContext } from "../contexts/AuthContext";
import { successNote } from "../helpers/toasNotify";
import moment from "moment";
import { BlogContext } from "../contexts/BlogContext";

const Newblog = () => {
  const { currentUser } = React.useContext(AuthContext);
  const { google } = React.useContext(BlogContext);

  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [content, setContent] = React.useState("");
  const formElement = React.useRef();
  const createDate = moment().format("LL");
  const like = [];
  const comment = [];
  const countLiked = 0;
  const countComment = 0;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const displayName = google
      ? currentUser.displayName[0]
      : currentUser.displayName;
    addDoc(colRef, {
      title,
      url,
      content,
      createDate,
      displayName,
      countLiked,
      like,
      countComment,
      comment,
    }).then(() => {
      successNote("Added successfully");
      formElement.current.reset();
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "30rem" },

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "3rem",
      }}
      noValidate
      autoComplete="off"
      ref={formElement}
      onSubmit={handleSubmitForm}
    >
      <div>
        <img
          src={`https://media.istockphoto.com/vectors/new-post-3d-text-bubble-sticker-for-video-blog-blogging-story-social-vector-id1181372332`}
          alt={"blog"}
          loading="lazy"
          style={{
            width: "10rem",
            marginBottom: "1rem",
            borderRadius: "50%",
          }}
        />
      </div>

      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Title"
          multiline
          maxRows={4}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-textarea"
          label="URL"
          placeholder="Placeholder"
          multiline
          rows={2}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={14}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" type="submit">
          SEND
        </Button>
      </div>
    </Box>
  );
};

export default Newblog;
