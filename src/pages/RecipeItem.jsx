import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import BlackButton from "../components/custom/BlackButton";
import {
  BoxBgWhite,
  BoxBgBlue,
  StyledContainer,
} from "../components/custom/customComponents";
import IngredientCard from "../components/RecipeItem/IngredientCard";
import { getRecipeById } from "../services/recipes-api";

const noImage =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/no-image.png";

function RecipeItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isFetched } = useQuery({
    queryKey: ["getRecipeById", id],
    queryFn: getRecipeById,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <BoxBgWhite paddingTop={true} infinityScroll={false}>
      <BoxBgBlue infinityScroll={false}>
        <StyledContainer paddingY={true}>
          {/* back button */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mb: 4 }}>
            <BlackButton backArrow={true} onClick={handleBack}>
              return back
            </BlackButton>
          </Box>

          {isFetched ? (
            <>
              {/* recipe and ingredients */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: 3, md: 2 },
                  maxHeight: { xs: "auto", md: "min(80vh, 1000px)" },
                  mb: 4,
                }}
              >
                {/* recipeCard */}
                <Box
                  bgcolor="bg.white"
                  sx={{
                    pt: { xs: 2, sm: 3, xl: 4 },
                    px: { xs: 2, sm: 3, xl: 4 },
                    borderRadius: 7,
                    boxShadow: 2,
                    width: { xs: "auto", md: "100%" },
                    maxHeight: "100%",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 7,
                      width: "100%",
                      height: "calc(100% - 70px)",
                      objectFit: "cover",
                      verticalAlign: "bottom",
                    }}
                    component="img"
                    src={data.imageUrl || noImage}
                  />
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "70px",
                      p: 0,
                    }}
                  >
                    <Tooltip
                      title={
                        <Typography fontSize={16}>
                          {data.name || "no name"}
                        </Typography>
                      }
                    >
                      <Typography
                        variant="p"
                        sx={{
                          display: "-webkit-box",
                          wordWrap: "break-word",
                          overflow: "hidden",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          color: "text.black",
                        }}
                      >
                        {data.name || "no name"}
                      </Typography>
                    </Tooltip>
                  </Box>
                </Box>

                {/* back button */}
                <BlackButton
                  backArrow={true}
                  onClick={handleBack}
                  sx={{ display: { xs: "flex", md: "none", width: "100%" } }}
                >
                  return back
                </BlackButton>

                {/* ingredients */}
                <Box
                  sx={{
                    p: { xs: 2, sm: 3, xl: 4 },
                    borderRadius: 7,
                    boxShadow: 2,
                    bgcolor: "bg.grey",
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    overflow: "auto",
                    gap: { xs: 2, md: 3 },
                  }}
                >
                  {data.ingredients.map((name, i) => (
                    <IngredientCard
                      key={name}
                      name={data.ingredients[i]}
                      measure={data.measure[i]}
                    />
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
            // loading
            <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
              <CircularProgress sx={{ color: "text.grey" }} />
            </Box>
          )}
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
}

export default RecipeItem;
