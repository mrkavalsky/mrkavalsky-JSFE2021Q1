export const createHTMLElement = (HTML: string): Element => {
  const elem = document.createElement('div');

  elem.innerHTML = HTML;

  return elem.firstElementChild || elem;
};
