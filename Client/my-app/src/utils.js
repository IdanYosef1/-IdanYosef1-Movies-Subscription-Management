import axios from "axios";

const getAll = (url) => axios.get(url);

const getById = (url, id) => axios.get(`${url}/${id}`);

const createData = (url , obj) => axios.post(url,obj);

const updateData = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteData = (url, id) => axios.delete(`${url}/${id}`);

export {getAll, getById, createData, updateData, deleteData};