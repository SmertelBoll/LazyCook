import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import GreyButton from "../custom/GreyButton";

function SearchBlock({ searchText, onChangeInput }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "auto", sm: "center" },
        justifyContent: { xs: "auto", sm: "space-between" },
        gap: { xs: 2, sm: "none" },
      }}
    >
      <TextField
        variant="standard"
        placeholder="search"
        value={searchText}
        onChange={onChangeInput}
        sx={{ width: { sx: "100%", sm: "40%" }, order: { xs: 2, sm: 1 } }}
        InputProps={{
          disableUnderline: true,
          sx: {
            fontSize: (theme) => theme.typography.p.fontSize,
            fontWeight: (theme) => theme.typography.p.fontWeight,
            bgcolor: "bg.main",
            color: "text.black",
            boxShadow: 2,
            borderRadius: 7,
            py: 1,
            pl: 3,
            pr: 2,
          },
          endAdornment: (
            <InputAdornment position="end">
              {searchText ? (
                <ClearIcon
                  fontSize="large"
                  onClick={() => onChangeInput("", true)}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                <SearchIcon fontSize="large" />
              )}
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, sm: 2 },
          justifyContent: "center",
          order: { xs: 1, sm: 2 },
        }}
      >
        <GreyButton link="/recipes">all recipes</GreyButton>
        <GreyButton link="/recipes/my-recipes">my recipes</GreyButton>
      </Box>
    </Box>
  );
}

export default SearchBlock;
