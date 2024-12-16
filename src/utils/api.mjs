//==============================
// Consts
//==============================
const SERVER_URK = 'http://localhost:3000/osv';

//==============================
// Export functions
//==============================

/**
 * 
 * @param {Object} args 
 * @param {String} args.body
 * @returns
 */
export async function apiRequestOsvData( {body} ) {
  const options = _getApiOptions({
    method: "POST",
    body: JSON.stringify( body ),
  });
  return await _executeApi( {options} );
}

//==============================
// Private
//==============================

async function _executeApi({ url = SERVER_URK, options }) {
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
    mode: mode || "no-cors",
    cache: cache || "no-cache",
    credentials: credentials || "same-origin",
    body: body || undefined,
    accept: accept,
    headers: {
      ...headers,
      // "Authorization": `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    redirect: redirect || "follow",
    referrerPolicy: referrerPolicy || "origin",
  };
}