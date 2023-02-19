import { Grid, Skeleton } from "@mui/material";
import React from "react";

function GridSkeleton({ size }) {
  return (
    <>
      {Array(size)
        .fill(0)
        .map((_, i) => (
          <Grid
            item
            sx={{ p: 2, height: "auto" }}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={i}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="auto"
              sx={{
                aspectRatio: "0.9",
                borderRadius: 7,
              }}
            />
          </Grid>
        ))}
    </>
  );
}

export default GridSkeleton;
