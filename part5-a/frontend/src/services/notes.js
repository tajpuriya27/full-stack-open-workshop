import axios from "axios";
const baseUrl = "http://localhost:3001/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const testingObj = {
    content: "HardCoded value",
    important: false,
    id: 100,
  };
  return axios.get(baseUrl).then((res) => res.data.concat(testingObj));
  /**
   Why I have to use 'then' twice:
   1. here within get function?
   2. where am I calling it?
   */
};

const create = (newObject) => {
  // const req = axios.post(baseUrl, newObject);
  // return req.then((res) => res.data);
  const config = {
    headers: { Authorization: token },
  };

  // const response = await axios.post(baseUrl, newObject, config)
  return axios.post(baseUrl, newObject, config).then((res) => res.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then();
};

export default { getAll, create, update, del, setToken };
