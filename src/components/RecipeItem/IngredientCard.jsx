import {
  Box,
  Card,
  CardMedia,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { getIngredientByName } from "../../services/ingredient-api";

const noImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/no-image.png";

function IngredientCard({ name }) {
  const { data, isFetched } = useQuery({
    queryKey: ["getIngredientByName", name],
    queryFn: getIngredientByName,
  });
  // console.log(name);
  return (
    <>
      {isFetched ? (
        <Card
          bgcolor="bg.white"
          sx={{
            p: { xs: 2, sm: 3, xl: 4 },
            borderRadius: 7,
            boxShadow: 2,
            minHeight: "100%",
            display: !data?.name ? "none" : "auto",
          }}
        >
          {/* {console.log(data)} */}
          <CardMedia
            sx={{ width: "100%", aspectRatio: "1", borderRadius: 7 }}
            image={data?.imageUrl || noImage}
          />
          <Box
            sx={{
              textAlign: "center",
              py: 2,
              // pb: 4,
              px: 4,
              bgcolor: "bg.grey",
              borderRadius: 3,
            }}
          >
            <Tooltip title={data?.name || "no name"}>
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
                {data?.name || "no name"}
              </Typography>
            </Tooltip>
          </Box>
        </Card>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
          <CircularProgress sx={{ color: "text.grey" }} />
        </Box>
      )}
    </>
  );
}

export default IngredientCard;
