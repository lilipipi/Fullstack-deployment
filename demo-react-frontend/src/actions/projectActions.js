import axios from "axios";
import { GET_ERRORS, GET_PROJECTS } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    let url = "http://localhost:8080/api/project";
    const res = await axios.post(url, project);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProjects = () => async (dispatch) => {
  let url = "http://localhost:8080/api/project/all";
  const res = await axios.get(url);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};
