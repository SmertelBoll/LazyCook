import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/Auth";

const noImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/no-image.png";

export default React.memo(function ItemCard({
  item,
  userItemsId,
  setNewItemsId,
  setIsUpdate,
  component,
}) {
  const [isAdded, setIsAdded] = useState(
    component === "my-recipes" || component === "my-products" ? true : false
  );
  const { token } = useAuth();
  const isLink =
    component === "recipes" || component === "my-recipes" ? true : false;

  useEffect(() => {
    if (userItemsId?.includes(item.id)) {
      setIsAdded(true); // якщо якийсь рецепт у користувача є, то відображуємо його відповідно
    } else {
      setIsAdded(false);
    }
  }, [userItemsId]);

  const handleClick = () => {
    // додати рецепт до збережених
    if (!isAdded) {
      setNewItemsId([...userItemsId, item.id]);
      setIsUpdate(true);
    }
    // видалити рецепт із збережених
    else {
      setNewItemsId(
        userItemsId.filter(function (e) {
          return e !== item.id;
        })
      );
      setIsUpdate(true);
    }
    setIsAdded(!isAdded);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <NavLink to={isLink ? `/recipes/${item.id}` : null}>
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
            image={item.imageUrl || noImage}
          />
          <CardContent sx={{ textAlign: "center", pt: 2, px: 0 }}>
            <Tooltip
              title={
                <Typography fontSize={16}>{item.name || "no name"}</Typography>
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
                {`${item.name}\n\n` || "no name"}
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

            border: {
              xs: "3px solid #000000",
              md: "4px solid #000000",
            },
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
});
