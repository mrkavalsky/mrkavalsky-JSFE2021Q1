import { createHTMLElement } from '../../helpers/create-html-element';
import { getDatabase } from '../../local-storage';
import { ICards } from '../../types/interfaces';
import './styles.css';

const renderCategory = ({ cardsList, category }: ICards): DocumentFragment => {
  const fragment = document.createDocumentFragment();

  cardsList.forEach(({ word, translation, train, hit, miss }) => {
    const errors = Math.floor(miss / (hit + miss)) || 0;
    const tableRow = createHTMLElement(
      `
      <tr class="table-active">
        <td>${category}</td>
        <td>${word}</td>
        <td>${translation}</td>
        <td>${train}</td>
        <td>${hit}</td>
        <td>${miss}</td>
        <td>${errors}</td>
      </tr>
    `,
      'tbody',
    );

    fragment.append(tableRow);
  });

  return fragment;
};

export const renderStatisticPage = (): void => {
  const database = getDatabase();
  const page = createHTMLElement(`
    <div class="table-wrapper">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Word</th>
            <th scope="col">Translation</th>
            <th scope="col">Category</th>
            <th scope="col">Train</th>
            <th scope="col">Hit</th>
            <th scope="col">Miss</th>
            <th scope="col">% errors</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  `);
  const tbody = page.querySelector('tbody');

  database.forEach((cardCategory) =>
    tbody?.append(renderCategory(cardCategory)),
  );

  document.body.append(page);
};
