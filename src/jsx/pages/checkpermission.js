const checkPermission = (history, permission) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo.user.permissions.includes(permission)) {
    history.push("/error");
    return;
  }
};

export const checkPermissionOnSubmit = ( permission) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo.user.permissions.includes(permission)) {
    return true;
  }
};

export default checkPermission;
