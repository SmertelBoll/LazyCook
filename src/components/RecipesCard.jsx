import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import bgImage from "../assets/bg-home.png";

function RecipesCard({ name = "RecipeName", url = "", ...props }) {
  return (
    <Card
      bgcolor="bg.white"
      sx={{ px: 4, pt: 4, borderRadius: 7, boxShadow: 2 }}
    >
      <CardMedia
        sx={{ height: "250px", aspectRatio: "1", borderRadius: 7 }}
        image={bgImage}
        title="green iguana"
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="p">{name}</Typography>
      </CardContent>
    </Card>
  );
}

export default RecipesCard;
