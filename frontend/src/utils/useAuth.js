export const useAuth = () => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const currDate = new Date();
    const tokenDate = new Date(localStorage.getItem("token_timestamp"));
    if (
      currDate.getFullYear() !== tokenDate.getFullYear() ||
      currDate.getMonth() !== tokenDate.getMonth() ||
      currDate.getDate() !== tokenDate.getDate() ||
      currDate.getHours() - tokenDate.getHours() > 4
    ) {
      //token expiry 4 hours
      localStorage.clear();
      return false;
    } else return true;
  } else {
    return false;
  }
};
