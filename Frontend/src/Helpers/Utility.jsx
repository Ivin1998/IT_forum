export default function helpers() {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) return null; // Return null if no userInfo is found

  const userInfoParsed = JSON.parse(userInfo);
  const isAdmin = userInfoParsed?.isAdmin;
  const userEmail = userInfoParsed?.email;
  const loggedInName = userInfoParsed?.name;

  const isGuest = userInfoParsed?.email !== "guest@ivin.com" ? false : true;

  const  capitalizeFirstLetter=(str)=> {
    if (!str) return "";
    return str.replace(/^./, (char) => char.toUpperCase());
  }

  return { userInfoParsed, isAdmin, isGuest,userEmail,loggedInName,capitalizeFirstLetter };
}
