export const generateId = () => {
  return Math.floor(Math.random() * 10001);
};

export const formatResponsibleNames = (responsible: Array<string>) => {
  if (!responsible || responsible.length === 0) return "";
  if (responsible.length === 1) return responsible[0];

  const lastItem = responsible[responsible.length - 1];
  const otherItems = responsible.slice(0, -1);

  return `${otherItems.join(", ")} e ${lastItem}`;
};
