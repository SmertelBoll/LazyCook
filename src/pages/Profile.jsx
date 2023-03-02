import {
  Avatar,
  styled,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "../components/auth/Auth";
import { v4 as uuidv4 } from "uuid";
import {
  BoxBgBlue,
  BoxBgWhite,
  StyledButton,
  StyledContainer,
} from "../components/custom/customComponents";
import BlackButton from "../components/custom/BlackButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  getUserName,
  updatePassword,
  updateUserName,
} from "../services/user-profile-api";
import { useQuery } from "react-query";
import TextFieldProfile from "../components/custom/TextFieldProfile";
import {
  errorChangePasswordAlert,
  successChangePasswordAlert,
} from "../services/alerts";

const CDNURL =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/";
// CDNURL + userId + '/' + name

const getUrlAvatar = (userId, name) => {
  if (userId && name) return `${CDNURL}${userId}/${name}`;
  return null;
};

const Profile = () => {
  const [image, setImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    if (token) getImage();
  }, [token]);

  const getImage = async () => {
    const { data, error } = await supabase.storage
      .from("profiles")
      .list(token.user.id, {
        limit: 100,
        offset: 0,
        search: "avatar",
      });
    if (data !== null && data.length !== 0) setImage(data[0]);
  };

  const deleteImage = async (e) => {
    if (image) {
      e.preventDefault();
      await supabase.storage
        .from("profiles")
        .remove([token.user.id + "/" + image.name]);
      setImage(null);
    }
  };

  const uploadImage = async (e) => {
    deleteImage(e);
    let file = e.target.files[0];

    const { data } = await supabase.storage
      .from("profiles")
      .upload(token.user.id + "/avatar_" + uuidv4(), file);

    if (data) getImage();
  };

  const { data: userNameData, isFetched: isFetchedUserName } = useQuery({
    queryKey: ["getUserName"],
    queryFn: getUserName,
    staleTime: 0,
  });

  useEffect(() => {
    if (isFetchedUserName) setUserName(userNameData);
  }, [isFetchedUserName]);

  const { refetch: refetchUpdateUserName } = useQuery({
    queryKey: ["updateUserName", token?.user?.id, userName],
    queryFn: updateUserName,
    enabled: false,
  });
  const {
    data: dataUpdatePassword,
    isFetched: isFetchedUpdatePassword,
    refetch: refetchUpdatePassword,
  } = useQuery({
    queryKey: ["updatePassword", currentPassword, newPassword],
    queryFn: updatePassword,
    enabled: false,
    staleTime: 0,
  });

  const handleUpdateUserName = () => {
    refetchUpdateUserName();
  };

  const handleUpdatePassword = () => {
    refetchUpdatePassword();
  };

  useEffect(() => {
    if (isFetchedUpdatePassword) {
      if (dataUpdatePassword.error) {
        errorChangePasswordAlert(dataUpdatePassword.error.message);
      } else successChangePasswordAlert();
    }
  }, [isFetchedUpdatePassword]);

  return (
    <BoxBgWhite paddingTop={true} infinityScroll={false}>
      <BoxBgBlue infinityScroll={false}>
        <StyledContainer
          paddingY={true}
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {/* avatar */}
          <Box sx={{ flexBasis: "50%" }}>
            <Avatar
              alt="Avatar"
              src={getUrlAvatar(token?.user?.id, image?.name)}
              sx={{
                width: "min(50vh, 50vw)",
                height: "min(50vh, 50vw)",
                margin: "auto",
              }}
              imgProps={{
                style: {
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                },
              }}
            />
            <input
              accept="image/*"
              hidden
              id="avatar-image-upload"
              type="file"
              onChange={uploadImage}
            />
            <label htmlFor="avatar-image-upload">
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <StyledButton
                  component="span"
                  sx={{
                    color: "text.black",
                    borderRadius: 3,
                    px: 2,
                    py: 0,
                    "&:hover": {
                      color: "text.white",
                      bgcolor: "buttonbg.black",
                    },
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    upload
                    <FileUploadIcon />
                  </Typography>
                </StyledButton>
                <StyledButton
                  onClick={deleteImage}
                  sx={{
                    color: "text.black",
                    borderRadius: 3,
                    px: 2,
                    py: 0,
                    "&:hover": {
                      color: "text.white",
                      bgcolor: "buttonbg.black",
                    },
                  }}
                >
                  <Typography
                    variant="p"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    delete
                    <DeleteIcon />
                  </Typography>
                </StyledButton>
              </Box>
            </label>
          </Box>
          {/* username and password */}
          <Box sx={{ flexBasis: "50%" }}>
            {/* user name */}
            <Typography variant="p" sx={{ color: "text.black" }}>
              Change username
            </Typography>
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
              <TextFieldProfile
                label="user name"
                value={userName}
                onChangeInput={(e) => setUserName(e.target.value)}
                isButtonClick={true}
                handleClick={handleUpdateUserName}
              />
            </Box>

            {/* change password */}
            <Typography variant="p" sx={{ color: "text.black" }}>
              Change password
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <TextFieldProfile
                label="current password"
                value={currentPassword}
                onChangeInput={(e) => setCurrentPassword(e.target.value)}
                isButtonClick={false}
              />
              <TextFieldProfile
                label="new password"
                value={newPassword}
                onChangeInput={(e) => setNewPassword(e.target.value)}
                isButtonClick={false}
              />
              <StyledButton
                onClick={handleUpdatePassword}
                sx={{
                  maxWidth: "50%",
                  color: "text.black",
                  borderRadius: 3,
                  px: 2,
                  py: 0,
                  "&:hover": {
                    color: "text.white",
                    bgcolor: "buttonbg.black",
                  },
                }}
              >
                <Typography variant="p">change</Typography>
              </StyledButton>
            </Box>
          </Box>
        </StyledContainer>
      </BoxBgBlue>
    </BoxBgWhite>
  );
};

export default Profile;
