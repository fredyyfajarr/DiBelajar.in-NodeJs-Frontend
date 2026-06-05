export const getApiErrorMessage = (error, fallback = 'Terjadi kesalahan.') =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;
