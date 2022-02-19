export const isEmpty = (data) => {
  return data === null || data === "" ? true : false;
};

export const status = (isBayar, isVerified, isTolak) => {
  if (isBayar && !isVerified) {
    return "Paid";
  } else if (isBayar && isVerified && !isTolak) {
    return "Completed";
  } else if (isBayar && isVerified && isTolak) {
    return "Cancelled";
  } else {
    return "Awaiting Payment";
  }
};

export const badgeEl = (isBayar, isVerified, isTolak) => {
  if (isBayar && !isVerified) {
    return "badge bg-primary p-1 mx-1";
  } else if (isBayar && isVerified && !isTolak) {
    return "badge bg-success p-1 mx-1";
  } else if (isBayar && isVerified && isTolak) {
    return "badge bg-danger p-1 mx-1";
  } else {
    return "badge bg-dark p-1 mx-1";
  }
};
