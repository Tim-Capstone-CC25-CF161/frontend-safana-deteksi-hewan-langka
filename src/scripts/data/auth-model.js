import CONFIG from '../config';

const ENDPOINTS = {
  LOGIN: `${CONFIG.BASE_URL}/login`,
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGOUT: `${CONFIG.BASE_URL}/logout`,

  // Profile
  UPDATE_PROFILE: (id) => `${CONFIG.BASE_URL}/users/${id}`,
  DELETE_PROFILE: (id) => `${CONFIG.BASE_URL}/users/${id}`,
};

export async function getLogin({ username, password }) {
  const data = JSON.stringify({ username, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogout() {
  const fetchResponse = await fetch(ENDPOINTS.LOGOUT, {
    method: 'POST',
    credentials: 'include',
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getRegister({ name, username, password }) {
  const data = JSON.stringify({ name, username, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getUpdateProfile({id, name, username, password }) {
  const data = JSON.stringify({ name, username, password });

  const fetchResponse = await fetch(ENDPOINTS.UPDATE_PROFILE(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getDeleteProfile(id) {
  const fetchResponse = await fetch(ENDPOINTS.DELETE_PROFILE(id), {
    method: 'DELETE',
    credentials: 'include',
  })
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  }
}
