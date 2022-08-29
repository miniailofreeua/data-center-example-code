import history from '../history';
import urljoin from 'url-join';
import { prefix } from '../constants/path';

export function historyPush(url: string) {
  history.push(urljoin(`${prefix}/`, url));
}
