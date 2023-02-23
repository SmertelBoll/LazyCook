import { Box, Typography } from "@mui/material";
import React from "react";

function EmptyData({ title = "", text = "" }) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          color: "text.black",
        }}
      >
        <Typography variant="h2">Oh..</Typography>
        <Typography variant="p">{title}</Typography>
        <Typography variant="p" sx={{ mb: 3 }}>
          {text}
        </Typography>
      </Box>
    </>
  );
}

export default EmptyData;
