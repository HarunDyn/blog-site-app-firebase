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
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { errorNote, warnNote } from "../helpers/toasNotify";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import Loading from "./Loading";

// <CardActions>
//   <Button size="small">Learn More</Button>
// </CardActions>;

export default function CardComp({ item }) {
  const { currentUser } = React.useContext(AuthContext);
  const likeButton = React.useRef();
  const navigate = useNavigate();
  const {
    content,
    title,
    url,
    id,
    displayName,
    createDate,
    countLiked,
    countComment,
    like,
  } = {
    ...item,
  };
  const db = getFirestore();
  const docRef = doc(db, "datas", id);

  const navigateDetails = (id) => {
    if (content.length > 200 && currentUser) {
      navigate(`/details/${id}`);
    } else {
      if (!currentUser) {
        errorNote("Login for Details");
        navigate("/register");
      } else {
        navigate(`/details/${id}`);
      }
    }
  };

  React.useEffect(() => {
    if (currentUser && like.includes(currentUser.email)) {
      likeButton.current.style.color = "red";
    } else {
      likeButton.current.style.color = "grey";
    }
  }, [like, currentUser]);

  return displayName ? (
    <Card
      sx={{
        width: "22rem",
        boxShadow: "3px 3px 7px black",
        position: "relative",
        mb: "2rem",
        mr: "3rem",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: common.black }} aria-label="recipe">
            {displayName.length > 2 ? displayName[0] : displayName}
          </Avatar>
        }
        title={title}
        subheader={createDate}
      />
      <CardMedia
        component="img"
        height="300"
        src={url}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "3rem" }}
        >
          {content.slice(0, 200)}...
          {content.length > 200 ? (
            <Button
              color="success"
              style={{ fontWeight: "600", cursor: "pointer" }}
              onClick={() => navigateDetails(id)}
            >
              more
            </Button>
          ) : null}
          {currentUser &&
          (displayName === currentUser.displayName ||
            displayName === currentUser.displayName[0]) ? (
            <Button
              style={{ fontWeight: "600", cursor: "pointer", color: "orange" }}
              component="span"
              onClick={() => navigateDetails(id)}
            >
              edit
            </Button>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
        }}
        disableSpacing
      >
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            if (currentUser.email && !like.includes(currentUser.email)) {
              updateDoc(docRef, { countLiked: countLiked + 1 });
              updateDoc(docRef, { like: [...like, currentUser.email] });
            } else if (currentUser.email && like.includes(currentUser.email)) {
              updateDoc(docRef, { countLiked: countLiked - 1 });
              updateDoc(docRef, {
                like: [...like.filter((item) => item !== currentUser.email)],
              });
            } else if (!currentUser.email) {
              warnNote("Login for liked items..");
              navigate("/login");
            }
          }}
        >
          <FavoriteIcon ref={likeButton} />
        </IconButton>
        {countLiked}
        <IconButton
          aria-label="comment"
          onClick={() => {
            if (currentUser.email) {
              navigateDetails(id);
            } else if (!currentUser.email) {
              warnNote("Login for comment items..");
              navigate("/login");
            }
          }}
        >
          <ForumIcon />
        </IconButton>
        {countComment}
      </CardActions>
    </Card>
  ) : (
    <Loading />
  );
}
