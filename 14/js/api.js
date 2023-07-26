const SERVER_URL = 'https://29.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте перезагрузить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};
const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return await response.json();
};

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const data = await fetchData(`${SERVER_URL}${route}`, {method, body});
    return data;
  } catch (error) {
    throw new Error(errorText);
  }
};

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
