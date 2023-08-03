import axios from "axios";
const baseUrl = `api/notes`;

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
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then((res) => res.data);
};

export default { getAll, create, update };
