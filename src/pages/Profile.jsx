import { Box, Typography } from "@mui/material";
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

const noAvatar =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/static/no-avatar.png";
const CDNURL =
  "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/";
// CDNURL + userId + '/' + name

const getUrlAvatar = (userId, name) => {
  if (userId && name) return `${CDNURL}${userId}/${name}`;
  return noAvatar;
};

const Profile = () => {
  const [localUserName, setLocalUserName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { token, image, setImage, setUserName } = useAuth();

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
    let file = e.target.files[0];

    if (file) {
      deleteImage(e);
      const { data } = await supabase.storage
        .from("profiles")
        .upload(token.user.id + "/avatar_" + uuidv4(), file);

      if (data) getImage();
    }
  };

  const {
    data: userNameData,
    isFetched: isFetchedUserName,
    isFetching: isFetchingUserName,
  } = useQuery({
    queryKey: ["getUserName"],
    queryFn: getUserName,
    staleTime: 0,
  });

  useEffect(() => {
    if (isFetchedUserName) {
      if (!localUserName) setUserName(userNameData);
      setLocalUserName(userNameData);
    }
  }, [isFetchedUserName]);

  const { refetch: refetchUpdateUserName } = useQuery({
    queryKey: ["updateUserName", token?.user?.id, localUserName],
    queryFn: updateUserName,
    enabled: false,
    staleTime: 0,
  });
  const {
    data: dataUpdatePassword,
    isFetched: isFetchedUpdatePassword,
    isFetching,
    refetch: refetchUpdatePassword,
  } = useQuery({
    queryKey: ["updatePassword", currentPassword, newPassword],
    queryFn: updatePassword,
    enabled: false,
    staleTime: 0,
  });

  const handleUpdateUserName = () => {
    setUserName(localUserName);
    refetchUpdateUserName();
  };

  const handleUpdatePassword = () => {
    setIsClickButton(true);
    refetchUpdatePassword();
  };

  //! useEffect нижче спрацьовує, якщо помилка була зробена раніше, та користувач знову зайшов у профіль.
  //! Хоча не повинна. Потрібна допрацювати
  const [isClickButton, setIsClickButton] = useState(false);
  useEffect(() => {
    if (isClickButton && isFetchedUpdatePassword && !isFetching) {
      if (dataUpdatePassword.error) {
        errorChangePasswordAlert(dataUpdatePassword.error.message);
      } else successChangePasswordAlert();
    }
  }, [isFetchedUpdatePassword, isFetching]);

  return (
    <BoxBgWhite paddingTop={true} infinityScroll={false}>
      <BoxBgBlue infinityScroll={false}>
        <StyledContainer
          paddingY={true}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, lg: 4 },
          }}
        >
          {/* avatar */}
          <Box
            sx={{
              flexBasis: "50%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <label
              htmlFor="image"
              style={{ display: "flex", cursor: "pointer" }}
            >
              <input
                type="file"
                name="image"
                id="image"
                style={{ display: "none", width: "100%" }}
                onChange={uploadImage}
              />
              <Box
                component="img"
                src={getUrlAvatar(token?.user?.id, image?.name)}
                sx={{
                  width: "min(100%, 50vw, 50vh)",
                  aspectRatio: "1",
                  objectFit: "cover",
                  borderRadius: "50%",
                  m: "0 auto",
                }}
              />
            </label>
            <StyledButton
              onClick={deleteImage}
              sx={{
                m: "0 auto",
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
          {/* username and password */}
          <Box sx={{ flexBasis: "50%" }}>
            {/* user name */}
            <Typography variant="p" sx={{ color: "text.black" }}>
              Change username
            </Typography>
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
              <TextFieldProfile
                label="user name"
                value={localUserName}
                onChangeInput={(e) => setLocalUserName(e.target.value)}
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
                alignItems: { xs: "center", md: "flex-end" },
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
