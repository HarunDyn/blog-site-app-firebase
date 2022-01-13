import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { BlogContext } from "../contexts/BlogContext";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { successNote } from "../helpers/toasNotify";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const { data } = React.useContext(BlogContext);
  const { currentUser } = React.useContext(AuthContext);
  const { id: currentId } = useParams();
  const [title, setTitle] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [content, setContent] = React.useState("");
  const formElement = React.useRef();
  const db = getFirestore();
  const docRef = doc(db, "datas", currentId);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const displayName = currentUser.displayName;

    console.log({
      title: title,
      url: url,
      content: content,
      displayName: currentUser.displayName,
    });

    updateDoc(docRef, {
      title,
      url,
      content,
      displayName,
    }).then(() => {
      formElement.current.reset();
      successNote("Updated Successfully");
      navigate("/");
    });
  };

  React.useEffect(() => {
    data.filter((item) =>
      item.id === currentId
        ? (setTitle(item.title), setUrl(item.url), setContent(item.content))
        : null
    );
  }, [data, currentId]);

  return data ? (
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
          value={title}
          // onFocus
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Content"
          multiline
          rows={14}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <Button
          variant="contained"
          color="success"
          type="submit"
          sx={{ mr: 2 }}
        >
          SEND
        </Button>
        <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </Box>
  ) : (
    <Loading />
  );
};

export default UpdateBlog;
