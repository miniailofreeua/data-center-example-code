import { NotFoundException } from '@nestjs/common';

export const handleApiError = (e) => {
  if (e.code === 'ECONNREFUSED') {
    console.error(e);
    return new NotFoundException('CRM API connection error');
  }
  const message = `API external error: ${
    e.message || e.response?.data?.message
  }`;
  console.error(message);
  throw e;
};
