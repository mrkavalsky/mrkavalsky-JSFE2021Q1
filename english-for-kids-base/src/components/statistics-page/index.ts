import { createHTMLElement } from '../../helpers/create-html-element';
import { getDatabase } from '../../local-storage';
import { IStatisticsCard } from '../../types/interfaces';
import { ASC_SORT, DESC_SORT } from './config';
import { sortDatabase } from './helpers/sort-database';
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

const addTableButtonHandler = (tableButton: Element, key: string): void => {
  const currentKey = key as keyof IStatisticsCard;
  const ascSort = ASC_SORT.toLowerCase();
  const descSort = DESC_SORT.toLowerCase();

  tableButton.addEventListener('click', () => {
    const tableButtons = document.getElementById('table-buttons');
    const isASC = tableButton.classList.contains(ascSort);
    const database = isASC
      ? sortDatabase(currentKey, ASC_SORT)
      : sortDatabase(currentKey, DESC_SORT);
    const tbody = renderTableBody(database);
    const table = document.getElementById('table');

    if (tableButtons) {
      [...tableButtons.children].forEach((btn) => {
        btn.className = ascSort;
      });
    }

    tableButton.className = isASC ? descSort : ascSort;

    if (table) {
      table.lastElementChild?.remove();
      table.append(tbody);
    }
  });
};

const renderTableButton = (key: string) => {
  const caption = key[0].toUpperCase() + key.slice(1);
  const tableButton = createHTMLElement(
    `
      <th class="asc_sort" role="button" scope="col">${caption}</th>
    `,
    'tr',
  );

  addTableButtonHandler(tableButton, key);

  return tableButton;
};

const renderTableHead = ([statisticsCard]: IStatisticsCard[]) => {
  const thead = createHTMLElement(
    `
      <thead>
        <tr id="table-buttons"></tr>
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

export const renderStatisticPage = (
  sortedDatabase: IStatisticsCard[] | null = null,
): void => {
  const database = sortedDatabase || getDatabase();
  const page = createHTMLElement(`
    <div class="table-wrapper">
      <div class="button-wrapper">
        <button type="button" class="btn btn-secondary">Repeat difficult words</button>
        <button type="button" class="btn btn-secondary">Reset</button>
      </div>
      <table class="table table-hover" id="table">
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
