import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { common } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ForumIcon from "@mui/icons-material/Forum";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { BlogContext } from "../contexts/BlogContext";
import { AuthContext } from "../contexts/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { getFirestore, deleteDoc, doc, updateDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { errorNote, successNote } from "../helpers/toasNotify";
import moment from "moment";
import Comment from "../components/Comment";

export default function Details(props) {
  const { data } = React.useContext(BlogContext);
  const { currentUser } = React.useContext(AuthContext);
  const [value, setValue] = React.useState(false);
  const [comment, setComment] = React.useState(null);
  const likeButton = React.useRef();
  const navigate = useNavigate();
  let { id: currentId } = useParams();
  const commentElement = React.useRef();
  const db = getFirestore();
  const docRef = doc(db, "datas", currentId);
  const deleteItem = () => {
    if (
      currentUser.displayName === value.displayName ||
      currentUser.displayName[0] === value.displayName
    ) {
      deleteDoc(docRef);
      errorNote("Deleted item.. ");
      navigate("/");
    } else {
      alert("You are not authorized");
    }
  };
  const updateItem = () => {
    if (
      currentUser.displayName === value.displayName ||
      currentUser.displayName[0] === value.displayName
    ) {
      navigate(`/update/${value.id}`);
    } else {
      console.log(currentUser.displayName, value.displayName);
      alert("You are not authorized");
    }
  };

  React.useEffect(() => {
    data.filter((item) => (item.id === currentId ? setValue(item) : null));
    const color = async () => {
      await data;
      if (value.like.includes(currentUser.email)) {
        likeButton.current.style.color = "red";
      } else {
        likeButton.current.style.color = "grey";
      }
    };

    color();
  }, [data, currentUser, value, currentId]);

  return value ? (
    <div>
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
            width: "75%",
            boxShadow: "3px 3px 7px black",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: common.black }} aria-label="recipe">
                {value.displayName.length > 2
                  ? value.displayName[0]
                  : value.displayName}
              </Avatar>
            }
            title={value.title}
            subheader="September 14, 2016"
          />
          <CardMedia
            component="img"
            height="194"
            src={value.url}
            sx={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {value.content}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            disableSpacing
          >
            <div>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon
                  ref={likeButton}
                  onClick={() => {
                    if (
                      currentUser.email &&
                      !value.like.includes(currentUser.email)
                    ) {
                      updateDoc(docRef, { countLiked: value.countLiked + 1 });
                      updateDoc(docRef, {
                        like: [...value.like, currentUser.email],
                      });
                    } else if (
                      currentUser.email &&
                      value.like.includes(currentUser.email)
                    ) {
                      updateDoc(docRef, { countLiked: value.countLiked - 1 });
                      updateDoc(docRef, {
                        like: [
                          ...value.like.filter(
                            (item) => item !== currentUser.email
                          ),
                        ],
                      });
                    }
                  }}
                />
              </IconButton>
              {value.countLiked}
              <IconButton aria-label="share">
                <ForumIcon />
              </IconButton>
              {value.countComment}
              <Button
                color="success"
                style={{ fontWeight: "600", cursor: "pointer" }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Return
              </Button>
            </div>

            {currentUser.displayName === value.displayName ||
            currentUser.displayName[0] === value.displayName ? (
              <div>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  color="error"
                  sx={{ marginRight: "1rem", mt: 2 }}
                  onClick={deleteItem}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  component="span"
                  sx={{ mt: 2 }}
                  onClick={updateItem}
                >
                  Upload
                </Button>
              </div>
            ) : null}
          </CardActions>
        </Card>
      </Box>
      <Box
        component="form"
        ref={commentElement}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "90vw",
          mb: 2,
        }}
      >
        <TextField
          id="outlined-multiline-flexible"
          label="Comment"
          sx={{ width: "60%", mr: "2rem" }}
          multiline
          maxRows={4}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          variant="outlined"
          component="span"
          color="success"
          style={{ fontWeight: "600", cursor: "pointer", width: "13%" }}
          onClick={() => {
            const createDate = moment().format("llll");
            const commentSecond = moment().format();
            updateDoc(docRef, { countComment: value.countComment + 1 });
            updateDoc(docRef, {
              comment: [
                ...value.comment,
                {
                  commentUser: currentUser.displayName,
                  commentContent: comment,
                  commentUserEmail: currentUser.email,
                  commentDate: createDate,
                  commentId: commentSecond,
                },
              ],
            }).then(() => {
              successNote("Comment added successfully..");
              commentElement.current.reset();
            });
          }}
        >
          Add
        </Button>
      </Box>

      <Box>
        {value.comment.map((valueComments, index) => {
          return (
            <Comment
              item={valueComments}
              currentId={currentId}
              indexField={index}
              data={value}
              id={currentId}
            />
          );
        })}
      </Box>
    </div>
  ) : (
    <Loading />
  );
}
