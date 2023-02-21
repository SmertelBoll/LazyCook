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

function IngredientCard({ name, measure }) {
  const { data, isFetched } = useQuery({
    queryKey: ["getIngredientByName", name],
    queryFn: getIngredientByName,
  });

  const [show, setShow] = React.useState(false);

  const handleClickToolTip = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  };
  return (
    <>
      {isFetched ? (
        <Box
          bgcolor="bg.white"
          sx={{
            p: { xs: 2, sm: 3, xl: 4 },
            borderRadius: 7,
            boxShadow: 2,
            display: !data?.name ? "none" : "auto",
          }}
        >
          <CardMedia
            sx={{
              width: { xs: "200px", md: "100%" },
              aspectRatio: "1",
              borderRadius: 7,
            }}
            image={data?.imageUrl || noImage}
          />
          <Box
            sx={{
              textAlign: "center",
              py: 1,
              bgcolor: "bg.grey",
              borderRadius: 3,
            }}
          >
            <Tooltip
              onMouseOver={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              title={
                <Typography fontSize={16}>
                  {`${measure} ${name}` || "no name"}
                </Typography>
              }
              open={show}
              onClick={handleClickToolTip}
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
                {`${measure} ${name}` || "no name"}
              </Typography>
            </Tooltip>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", pt: 5 }}>
          <CircularProgress sx={{ color: "text.grey" }} />
        </Box>
      )}
    </>
  );
}

export default IngredientCard;
