import instance from ".";

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const login = async (userInfo) => {
  const { data } = await instance.post("/users/signin", userInfo);
  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("/users/signup", formData);
  storeToken(data.token);
  return data;
};

const myProfile = async () => {
  const token = localStorage.getItem("token");
  const { data } = await instance.get("/users/myprofile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const upDateProfile = async (userInfo) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);
  const { data } = await instance.put("/users/myprofile", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(data);
  return data;
};

export { checkToken, register, login, myProfile, upDateProfile, storeToken };
