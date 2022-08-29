export const getDesksLabel = (user) => {
  return Array.isArray(user.desks) && user.desks.length
    ? user.desks.map((d) => d.name).join(', ')
    : null;
};
