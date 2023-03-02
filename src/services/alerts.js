import Swal from "sweetalert2";
import "../styles/swal.css";


const defaultProp = {
  showConfirmButton: false,
  color: "#000000",
  background: "#FDFDFD",
}

export const errorAuthAlert = (error) => {
  Swal.fire({
    ...defaultProp,
    icon: "error",
    title: "Authorization error",
    text: error,
  });
}

export const verificationAuthAlert = () => {
  Swal.fire({
    ...defaultProp,
    icon: "info",
    title: "Verification",
    text: "check your mail and confirm registration"
  });
}

export const errorSignInAlert = (error) => {
  Swal.fire({
    ...defaultProp,
    icon: "error",
    title: "Login error",
    text: error,
  });
}

export const successSignInAlert = () => {
  Swal.fire({
    ...defaultProp,
    timer: 2500,
    icon: "success",
    title: "Login successful",
  });
}

export const SignOutAlert = (logOutFunc) => {
  Swal.fire({
    ...defaultProp,
    icon: "question",
    title: "Are you sure?",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out'
  }).then(result => {
    if(result.isConfirmed) {
      logOutFunc()
      successLogOutAlert()}
  })
}

export const successLogOutAlert = () => {
  Swal.fire({
    ...defaultProp,
    timer: 2500,
    icon: "success",
    title: "Log out successful",
  });
}

export const alreadyRegisteredAlert = () => {
  Swal.fire({
    ...defaultProp,
    timer: 2500,
    icon: "info",
    title: "You are already registered",
  });
}

export const errorChangePasswordAlert = (error) => {
  Swal.fire({
    ...defaultProp,
    icon: "error",
    title: "Change password error",
    text: error,
  });
}

export const successChangePasswordAlert = () => {
  Swal.fire({
    ...defaultProp,
    timer: 2500,
    icon: "success",
    title: "Changed password successful",
  });
}

