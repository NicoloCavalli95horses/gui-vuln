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
  return await _executeApi( {url, options} );
}

export async function apiGetCVEsInfo() {
  const url = `${BASE_URL}/get_cves_info`;
  const options = _getApiOptions({
    method: "GET",
  });
  return await _executeApi( {url, options} );
}

export async function apiGetCVE( {name, page, filter, getAll = false} ) {
  const url = `${BASE_URL}/get_cve`;
  const options = _getApiOptions({
    method: "POST",
    body: JSON.stringify( {name, page, filter, getAll} ),
  });
  return await _executeApi( {url, options} );
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