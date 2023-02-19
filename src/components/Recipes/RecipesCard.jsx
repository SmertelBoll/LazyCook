import {
  Card,
  CardContent,
  CardMedia,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import bgImage from "../../assets/bg-home.png";

function RecipesCard({ name = "RecipeName", url = "" }) {
  return (
    <Card
      bgcolor="bg.white"
      sx={{
        px: { xs: 3, xl: 4 },
        pt: { xs: 3, xl: 4 },
        borderRadius: 7,
        boxShadow: 2,
      }}
    >
      <CardMedia
        sx={{ height: "100%", aspectRatio: "1", borderRadius: 7 }}
        image={bgImage}
        // title={name}
      />
      <CardContent sx={{ textAlign: "center", pt: 2, pb: 2, px: 0 }}>
        <Tooltip title={name}>
          <Typography
            variant="p"
            sx={{
              display: "-webkit-box",
              wordWrap: "break-word",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {name}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export default RecipesCard;
