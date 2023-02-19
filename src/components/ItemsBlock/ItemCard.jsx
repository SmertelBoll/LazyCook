import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const noImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/no-image.png";

function ItemCard({ isButtonAdd = false, name = "RecipeName", url = noImage }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(!isAdded);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Card
        bgcolor="bg.white"
        sx={{
          px: { xs: 3, xl: 4 },
          pt: { xs: 3, xl: 4 },
          borderRadius: 7,
          boxShadow: 2,
          overflow: "auto",
        }}
      >
        <CardMedia
          sx={{ height: "100%", aspectRatio: "1", borderRadius: 7 }}
          image={url}
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
      {isButtonAdd && (
        <IconButton
          onClick={handleClick}
          sx={{
            position: "absolute",
            top: { xs: -10, sm: -20 },
            right: { xs: -10, sm: -20 },

            border: "4px solid #000000",
            borderRadius: 4,
            color: isAdded ? "text.white" : "text.black",
            bgcolor: isAdded ? "buttonbg.black" : "buttonbg.whiteBlue",
            transition: "all 0.2s ease 0s",
            "&:hover": {
              color: "text.white",
              bgcolor: "buttonbg.black",
            },
          }}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      )}
    </Box>
  );
}

export default ItemCard;