import { camelCase } from 'lodash';

export const getSchemaField = (elementToFind, headerFields) => {
  return Object.keys(headerFields).find(
    (schemaField) =>
      schemaField ===
      camelCase(
        elementToFind.includes('.')
          ? elementToFind.slice(elementToFind.indexOf('.')).trim()
          : elementToFind.trim(),
      ),
  );
};
