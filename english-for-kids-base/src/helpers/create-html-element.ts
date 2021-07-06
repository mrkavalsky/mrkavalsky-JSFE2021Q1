export const createHTMLElement = (HTML: string, tag = 'div'): Element => {
  const elem = document.createElement(tag);

  elem.innerHTML = HTML;

  return elem.firstElementChild || elem;
};
