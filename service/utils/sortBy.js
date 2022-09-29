const { model } = require("mongoose");

const sortByCreatedAtAscending = (a, b) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  } else if (a.createdAt > b.createdAt) {
    return 1;
  } else {
    return 0;
  }
};
const sortByCreatedAtDescending = (a, b) => {
  if (a.createdAt < b.createdAt) {
    return 1;
  } else if (a.createdAt > b.createdAt) {
    return -1;
  } else {
    return 0;
  }
};
module.exports = { sortByCreatedAtAscending, sortByCreatedAtDescending };
