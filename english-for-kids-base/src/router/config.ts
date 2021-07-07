import { renderCategoryPage } from '../components/category-page';
import { CATEGORY } from '../components/category-page/config';
import { renderDifficultWordsPage } from '../components/category-page/difficult-words-page';
import { DIFFICULT_WORDS_PAGE } from '../components/category-page/difficult-words-page/config';
import { renderMainPage } from '../components/main-page';
import { MAIN_PAGE } from '../components/main-page/config';
import { renderStatisticPage } from '../components/statistics-page';
import { STATISTICS_PAGE } from '../components/statistics-page/config';
import { IConfig } from '../types/interfaces';

export const config: IConfig = {
  [MAIN_PAGE]: renderMainPage,
  [CATEGORY]: renderCategoryPage,
  [STATISTICS_PAGE.hash]: renderStatisticPage,
  [DIFFICULT_WORDS_PAGE.hash]: renderDifficultWordsPage,
};
