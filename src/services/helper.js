import secureLocalStorage from "react-secure-storage";

export const logedInUser = () => {
  return secureLocalStorage.getItem("userData");
};

