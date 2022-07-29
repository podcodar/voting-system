import Cookies from 'universal-cookie';

type cookie = {
  key: string;
  value: string;
};

const cookies = new Cookies();

function storeCookie({ key, value }: cookie) {
  cookies.set(key, value, { path: '/' });
}
function getCookie(key: string) {
  const allCookies = cookies.getAll();
  return allCookies[key];
}

function saveApiKey(value: string) {
  storeCookie({ key: 'notionApiKey', value: value });
}

export { storeCookie, getCookie, saveApiKey };
