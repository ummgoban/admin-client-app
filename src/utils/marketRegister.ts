export const isError = (value: string | undefined, validLength?: number) => {
  if (value === undefined) {
    return false;
  }

  if (value.length === 0) {
    return true;
  }

  return !!validLength && value?.length !== validLength;
};

export const isLocalNumber = (value: string) => {
  return /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/g.test(value);
};

export const isPhoneNumber = (value: string) => {
  return /^(01[0|1|6|7|8|9])(\d{3,4})(\d{4})$/g.test(value);
};

export const isValidStartDate = (value: string) => {
  return /^\d{8}$/.test(value);
};

export const isValidBusinessNumber = (value: string) => {
  return /^\d{10}$/.test(value);
};

export const formatPhoneNumber = (value: string): string => {
  if (isPhoneNumber(value)) {
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (isLocalNumber(value)) {
    return value.replace(/(\d{2,3})(\d{3,4})(\d{4})/, '$1-$2-$3');
  }
  return value;
};

export const deleteHyphen = (value: string) => {
  return value.replaceAll(/-/g, '');
};
