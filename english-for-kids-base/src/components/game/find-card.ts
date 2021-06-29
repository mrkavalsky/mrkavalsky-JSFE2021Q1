export const findCard = (cards: any): any => {
  return cards.find(({ hit }: any) => hit === 0);
};
