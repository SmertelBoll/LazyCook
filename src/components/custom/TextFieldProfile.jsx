import { InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState } from "react";

function TextFieldProfile({
  label,
  value,
  onChangeInput,
  isButtonClick,
  handleClick = () => {},
}) {
  const [focusedOnUserName, setFocusedOnUserName] = useState(false);

  const onFocus = () => setFocusedOnUserName(true);
  const onBlur = () =>
    setTimeout(() => {
      setFocusedOnUserName(false);
    }, 0);
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={label}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChangeInput}
      InputProps={{
        sx: {
          color: "text.black",
          fontSize: (theme) => theme.typography.p.fontSizeSx,
          fontWeight: (theme) => theme.typography.p.fontWeight,
          borderRadius: 7,
        },
        endAdornment: (
          <InputAdornment position="end">
            {isButtonClick && focusedOnUserName && (
              <Tooltip title={<Typography fontSize={16}>saved</Typography>}>
                <DoneIcon
                  fontSize="large"
                  onClick={handleClick}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
            )}
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        sx: {
          fontSize: (theme) => theme.typography.p.fontSizeSx,
          fontWeight: (theme) => theme.typography.p.fontWeight,
        },
      }}
    />
  );
}

export default TextFieldProfile;
