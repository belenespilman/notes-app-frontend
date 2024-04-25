import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

export const signUpUser = async (username, password) => {
  const {
    data: { accessToken },
  } = await axios.post(`${backendUrl}/user/signup`, {
    username,
    password,
  });
  return accessToken;
};

export const signInUser = async (username, password) => {
  const {
    data: { accessToken },
  } = await axios.post(`${backendUrl}/user/signin`, {
    username,
    password,
  });
  return accessToken;
};

export const getUserData = async (accessToken) => {
  const { data } = await axios.get(`${backendUrl}/user/profile`, {
    headers: { Authorization: accessToken },
  });

  return data;
};

export const createCategory = async (accessToken, name) => {
  const { data } = await axios.post(
    `${backendUrl}/category`,
    {
      name,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );

  return data;
};

export const createNote = async (accessToken, title, categories) => {
  const { data } = await axios.post(
    `${backendUrl}/note`,
    {
      title,
      categories,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );

  return data;
};

export const archiveNote = async (accessToken, id) => {
  const { data } = await axios.patch(
    `${backendUrl}/note/${id}`,
    { active: false },
    { headers: { Authorization: accessToken } }
  );
  return data;
};

export const deleteNote = async (accessToken, id) => {
  const { data } = await axios.delete(`${backendUrl}/note/${id}`, {
    headers: { Authorization: accessToken },
  });
  return data;
};

export const editNoteTitle = async (accessToken, id, title) => {
  const { data } = await axios.patch(
    `${backendUrl}/note/${id}`,
    { title },
    { headers: { Authorization: accessToken } }
  );
  return data;
};

export const addCategoriesToNote = async (
  accessToken,
  noteId,
  categoriesIds
) => {
  const promises = categoriesIds.map((id) => {
    return axios.patch(
      `${backendUrl}/note/${noteId}/category/${id}/add`,
      null,
      {
        headers: { Authorization: accessToken },
      }
    );
  });
  await Promise.all(promises);
};

export const removeCategoriesFromNote = async (
  accessToken,
  noteId,
  categoriesIds
) => {
  const promises = categoriesIds.map((id) => {
    return axios.patch(
      `${backendUrl}/note/${noteId}/category/${id}/remove`,
      null,
      {
        headers: { Authorization: accessToken },
      }
    );
  });
  await Promise.all(promises);
};
