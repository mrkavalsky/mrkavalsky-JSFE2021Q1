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

const renderTableButton = (key: string) => {
  const caption = key[0].toUpperCase() + key.slice(1);
  const tableButton = createHTMLElement(
    `
      <th scope="col">${caption}</th>
    `,
    'tr',
  );

  return tableButton;
};

const renderTableHead = ([statisticsCard]: IStatisticsCard[]) => {
  const thead = createHTMLElement(
    `
      <thead>
        <tr></tr>
      </thead>
    `,
    'table',
  );
  const errorsButton = createHTMLElement(
    `
      <th scope="col">Errors, %</th>
    `,
    'tr',
  );
  const tableRow = thead.querySelector('tr');

  Object.keys(statisticsCard).forEach((key) =>
    tableRow?.append(renderTableButton(key)),
  );
  tableRow?.append(errorsButton);

  return thead;
};

const renderTableBody = (database: IStatisticsCard[]): Element => {
  const tbody = createHTMLElement(
    `
      <tbody></tbody>
    `,
    'table',
  );

  database.forEach((card) => tbody.append(renderCard(card)));

  return tbody;
};

export const renderStatisticPage = (
  sortDatabase: IStatisticsCard[] | null = null,
): void => {
  const database = sortDatabase || getDatabase();
  const page = createHTMLElement(`
    <div class="table-wrapper">
      <div class="button-wrapper">
        <button type="button" class="btn btn-secondary">Repeat difficult words</button>
        <button type="button" class="btn btn-secondary">Reset</button>
      </div>
      <table class="table table-hover">
      </table>
    </div>
  `);
  const thead = renderTableHead(database);
  const tbody = renderTableBody(database);
  const table = page.querySelector('table');

  table?.append(thead);
  table?.append(tbody);

  document.body.append(page);
};
