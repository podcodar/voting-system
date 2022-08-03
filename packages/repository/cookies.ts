function saveApiKey(value: string) {
  setCookie('notionApiKey', value, 50);
}

function getCookie(name: string) {
  const nameEQ = name + '=';
  for (const cookie of document.cookie.split('; ')) {
    if (cookie.indexOf(nameEQ) === 0) {
      const value = cookie.substring(nameEQ.length);
      return decodeURIComponent(value); // returns first found cookie
    }
  }
  return null;
}

function setCookie(
  name: string,
  value: string = '',
  days: number | false = false, // session length if not provided
  path: string = '/', // provide an empty string '' to set for current path (managed by a browser)
  sameSite: 'none' | 'lax' | 'strict' = 'lax', // required by Firefox
  isSecure?: boolean,
) {
  let expires = '';
  if (days) {
    const date = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000,
    ).toUTCString();
    expires = '; expires=' + date;
  }
  const secure = isSecure || sameSite === 'none' ? `; Secure` : '';
  const encodedValue = encodeURIComponent(value);
  document.cookie = `${name}=${encodedValue}${expires}; path=${path}; SameSite=${sameSite}${secure}`;
}

export { getCookie, saveApiKey };
