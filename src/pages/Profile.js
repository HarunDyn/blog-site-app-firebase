import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../contexts/AuthContext";

export default function BasicCard() {
  const { currentUser } = React.useContext(AuthContext);
  console.log(currentUser);
  return (
    <Card
      sx={{
        width: "30rem",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        margin: "auto",
        marginTop: "4rem",
        padding: "2rem",
        boxShadow: "3px 3px 10px black",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, mb: 1.5 }}
          color="text.secondary"
          gutterBottom
        >
          Email : {currentUser.email}
        </Typography>
        <hr />
        <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary">
          Creation Time: {currentUser.metadata.creationTime}
        </Typography>
        <hr />
        <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary">
          last Sign In Time: {currentUser.metadata.lastSignInTime}
        </Typography>
        <hr />
      </CardContent>
    </Card>
  );
}
