import { map } from 'lodash';

import { headerFields } from './headerFields';

export const formattedTableColumns = map(headerFields, (value, key) => ({
	Header: value,
	accessor: key,
	width: key.length * 12
}));
