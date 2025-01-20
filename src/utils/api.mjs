//==============================
// Consts
//==============================
const BASE_URL  = "http://localhost:5000/api";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

//==============================
// Export functions
//==============================

/**
 * 
 * @param {Object} args 
 * @param {String} args.from 
 * @param {Subject} args.subject 
 * @param {Message} args.message
 * @returns response object 
 */
export async function apiTest() {
  const url = `${BASE_URL}/data`;
  const options = _getApiOptions({
    method: "GET",
  });
  return await _executeApi({ url, options });
}

export async function apiGetCategories() {
  const url = `${BASE_URL}/get_categories`;
  const options = _getApiOptions({
    method: "GET",
  });
  return await _executeApi({ url, options });
}

export async function apiGetCategory( {name, page} ) {
  const url = `${BASE_URL}/get_category`;
  const options = _getApiOptions({
    method: "POST",
    body: JSON.stringify( {name, page} ),
  });
  return await _executeApi({ url, options });
}


//==============================
// Private
//==============================
async function _executeApi({ url, options }) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    return error;
  }
}

function _getApiOptions({
  method,
  mode,
  cache,
  credentials,
  headers,
  redirect,
  referrerPolicy,
  body,
  accept,
} = {}) {
  return {
    method: method || "GET",
    mode: mode || "cors",
    cache: cache || "no-cache",
    credentials: credentials || "same-origin",
    body: body || undefined,
    accept: accept,
    headers: {
      ...headers,
      "Authorization": `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    redirect: redirect || "follow",
    referrerPolicy: referrerPolicy || "origin",
  };
}