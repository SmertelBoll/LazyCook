import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  NativeSelect,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import GreyButton from "./GreyButton";
import { useAuth } from "../auth/Auth";
import { getCategories } from "../../services/recipes-api";
import { useQuery } from "react-query";

const buttonsSearchProducts = [
  {
    name: "all products",
    link: "/products",
    notAuth: "/products",
  },
  {
    name: "my products",
    link: "/products/my-products",
    notAuth: "/log-in",
  },
];

const buttonsSearchRecipes = [
  {
    name: "all recipes",
    link: "/recipes",
    notAuth: "/recipes",
  },
  {
    name: "my recipes",
    link: "/recipes/my-recipes",
    notAuth: "/log-in",
  },
];

function SearchBlock({
  searchText,
  onChangeInput,
  component = "",
  category,
  setCategory,
}) {
  const { token } = useAuth();

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const { data: categories, isFetched: isFetchedCategories } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "auto", md: "center" },
        justifyContent: {
          xs: "auto",
          md: component === "WhatToCook" ? "flex-start" : "space-between",
        },
        gap: { xs: 2, sm: "none" },
      }}
    >
      <TextField
        variant="standard"
        placeholder="search"
        value={searchText}
        onChange={onChangeInput}
        sx={{
          width: { sx: "100%", md: "40%" },
          order: { xs: 2, md: 1 },
          display: component === "WhatToCook" ? "none" : "auto",
        }}
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
          alignItems: "center",
          order: { xs: 1, md: 2 },
          flexWrap: "wrap",
        }}
      >
        {component === "MyProducts" ||
        component === "Products" ||
        component === "WhatToCook" ? (
          <>
            {buttonsSearchProducts.map((obj) => (
              <GreyButton link={token ? obj.link : obj.notAuth} key={obj.link}>
                {obj.name}
              </GreyButton>
            ))}
            {token && (
              <GreyButton link="/what-to-cook">what to cook</GreyButton>
            )}
          </>
        ) : component === "MyRecipes" || component === "Recipes" ? (
          <>
            {buttonsSearchRecipes.map((obj) => (
              <GreyButton link={token ? obj.link : obj.notAuth} key={obj.link}>
                {obj.name}
              </GreyButton>
            ))}
            <Box>
              <Select
                value={category}
                onChange={handleChangeCategory}
                variant="standard"
                disableUnderline
                inputProps={{
                  sx: {
                    p: 0,
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                sx={{
                  fontSize: (theme) => theme.typography.p.fontSizeSx,
                  fontWeight: (theme) => theme.typography.p.fontWeight,

                  textTransform: "lowercase",
                  color: "text.grey",
                  borderRadius: 3,
                  py: "4px",
                  "&:hover": {
                    color: "text.white",
                    bgcolor: "buttonbg.grey",
                  },
                  "& .MuiInput-input": {
                    pl: 1,
                    pr: 3,
                    textAlign: "center",
                  },
                  "& .MuiInput-input:focus": { bgcolor: "unset" },
                  "& .MuiSelect-icon": {
                    color: "text.grey",
                  },
                  "&:hover .MuiSelect-icon": { color: "text.white" },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      p: 2,
                      height: "50vh",
                      bgcolor: "bg.grey",
                      borderRadius: 2,
                    },
                  },
                }}
              >
                <MenuItem
                  value={false}
                  sx={{
                    fontSize: (theme) => theme.typography.menuItem.fontSize,
                    fontWeight: (theme) => theme.typography.menuItem.fontWeight,
                    borderRadius: 2,
                  }}
                >
                  all
                </MenuItem>
                {isFetchedCategories &&
                  categories.map((name, index) => (
                    <MenuItem
                      value={name}
                      key={`${name}_${index}`}
                      sx={{
                        textTransform: "lowercase",
                        fontSize: (theme) => theme.typography.menuItem.fontSize,
                        fontWeight: (theme) =>
                          theme.typography.menuItem.fontWeight,
                        borderRadius: 2,
                      }}
                    >
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

export default SearchBlock;
