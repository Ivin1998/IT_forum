export default function helpers() {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) return null; // Return null if no userInfo is found

  const userInfoParsed = JSON.parse(userInfo);
  const isAdmin = userInfoParsed?.isAdmin;
  const userEmail = userInfoParsed?.email;
  const loggedInName = userInfoParsed?.name;

  const isGuest = userInfoParsed?.email !== "guest@ivin.com" ? false : true;

  return { userInfoParsed, isAdmin, isGuest,userEmail,loggedInName };
}
