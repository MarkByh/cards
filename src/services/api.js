import axios from "axios";
axios.defaults.baseURL = "https://6469b13a03bb12ac2090ecaf.mockapi.io";

export const fetchUsers = async (page = 1) => {
  let url;
  url = `/users?page=${page}&limit=4`;
  const response = await axios.get(url);

  return response.data;
};

export const fetchAllUsers = async () => {
  let url;
  url = `/users`;
  const response = await axios.get(url);

  return response.data.length;
};

export const updateUser = async (id, following, followers) => {
  const response = await axios.put(`/users/${id}`, { following, followers });
  return response.data;
};

