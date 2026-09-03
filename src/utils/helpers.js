export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() +
  text.slice(1);

export const truncateText = (
  text,
  length = 60
) => {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length)}...`;
};

export const generateId = () =>
  crypto.randomUUID();