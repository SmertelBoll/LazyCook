import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/Auth";

const noImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/no-image.png";

function ItemCard({ data, isAdded = false, handleClick = () => {} }) {
  const { token } = useAuth();

  return (
    <Box sx={{ position: "relative" }}>
      <NavLink to={`${data.id}`}>
        <Card
          bgcolor="bg.white"
          sx={{
            px: { xs: 2, sm: 3, xl: 4 },
            pt: { xs: 2, sm: 3, xl: 4 },
            borderRadius: 7,
            boxShadow: 2,
          }}
        >
          <CardMedia
            sx={{ height: "100%", aspectRatio: "1", borderRadius: 7 }}
            image={data.imageUrl || noImage}
          />
          <CardContent sx={{ textAlign: "center", pt: 2, px: 0 }}>
            <Tooltip
              title={
                <Typography fontSize={16}>{data.name || "no name"}</Typography>
              }
            >
              <Typography
                variant="p"
                sx={{
                  display: "-webkit-box",
                  wordWrap: "break-word",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  whiteSpace: "pre-line",
                }}
              >
                {`${data.name}\n\n` || "no name"}
              </Typography>
            </Tooltip>
          </CardContent>
        </Card>
      </NavLink>
      {token && (
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
