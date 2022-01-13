import { Box } from "@mui/material";
import React from "react";
import CardComp from "../components/BlogCard";
import { BlogContext } from "../contexts/BlogContext";
import Loading from "../components/Loading";

function Dashboard() {
  const { data } = React.useContext(BlogContext);
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    setValue(data);
  }, [data]);

  return value ? (
    <Box
      component="grid"
      sx={{
        width: "95vw",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        my: "5rem ",
        ml: "3rem",
      }}
    >
      {value?.map((item) => (
        <CardComp key={item.id} item={item} />
      ))}
    </Box>
  ) : (
    <Loading />
  );
}

export default Dashboard;
