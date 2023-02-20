import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import BlackButton from "../components/custom/BlackButton";
import {
  BoxBgWhite,
  BoxBgBlue,
  StyledContainerWithPadding,
} from "../components/custom/customComponents";
import IngredientCard from "../components/RecipeItem/IngredientCard";
import { getRecipeById } from "../services/recipes-api";

const noImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/no-image.png";

function RecipeItem() {
  const { id } = useParams();
  const { data, isFetched } = useQuery({
    queryKey: ["getRecipeById", id],
    queryFn: getRecipeById,
  });

  return (
    <BoxBgWhite paddingTop={true} infinityScroll={false}>
      <BoxBgBlue infinityScroll={false}>
        <StyledContainerWithPadding>
          {/* back */}
          <Box sx={{ display: "flex", mb: 4 }}>
            <BlackButton backArrow={true} link="/recipes">
              return back
            </BlackButton>
          </Box>

          {isFetched ? (
            <>
              {/* recipe and ingredients */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: { xs: 2, sm: 3, lg: 4 },
                  // maxHeight: "100%",
                  // height: "100%",
                  // minHeight: "100%",
                }}
              >
                {/* recipeCard */}
                <Card
                  bgcolor="bg.white"
                  sx={{
                    flexBasis: "75%",
                    px: { xs: 2, sm: 3, xl: 4 },
                    pt: { xs: 2, sm: 3, xl: 4 },
                    borderRadius: 7,
                    boxShadow: 2,
                    height: "100%",
                  }}
                >
                  <CardMedia
                    sx={{
                      aspectRatio: "1.4",
                      borderRadius: 7,
                    }}
                    image={data.imageUrl || noImage}
                    height="250px"
                  />
                  <CardContent sx={{ textAlign: "center", pt: 2, px: 0 }}>
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
                      {data.name || "no name"}
                    </Typography>
                  </CardContent>
                </Card>

                {/* ingredients */}
                <Box
                  sx={{
                    flexBasis: "25%",
                    p: { xs: 2, sm: 3, xl: 4 },
                    borderRadius: 7,
                    boxShadow: 2,
                    bgcolor: "bg.grey",
                    display: "flex",
                    alignItems: "stretch",
                    flexDirection: "column",
                    overflow: "auto",
                    position: "relative",
                    flex: "0 0 25%",

                    height: "100%",
                    gap: { xs: 2, sm: 3, lg: 4 },
                  }}
                >
                  {data.ingredients.map((name) => (
                    <IngredientCard key={name} name={name} />
                  ))}
                </Box>
              </Box>

              {/* instruction */}
              <Box>
                <Typography
                  sx={{
                    color: "text.black",
                    whiteSpace: "pre-line",
                    fontSize: "28px",
                    fontWeight: 400,
                  }}
                >
                  {data.instruction}
                </Typography>
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
              <CircularProgress sx={{ color: "text.grey" }} />
            </Box>
          )}
        </StyledContainerWithPadding>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default RecipeItem;
