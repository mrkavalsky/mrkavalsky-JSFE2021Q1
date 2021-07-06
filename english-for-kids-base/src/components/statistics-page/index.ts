import { createHTMLElement } from '../../helpers/create-html-element';
import { getDatabase } from '../../local-storage';
import { IStatisticsCard } from '../../types/interfaces';
import './styles.css';

const renderCard = ({
  category,
  word,
  translation,
  train,
  hit,
  miss,
}: IStatisticsCard): Element => {
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

  return tableRow;
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

  database.forEach((card) => tbody?.append(renderCard(card)));

  document.body.append(page);
};
