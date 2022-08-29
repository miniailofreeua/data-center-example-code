import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const expanderCell = ({ expanded, isAnyExpands }) =>
  expanded || isAnyExpands ? (
    <FontAwesomeIcon
      data-widgster="close"
      icon={faMinus}
      color="#5d8fc2"
      cursor="pointer"
    />
  ) : (
    <FontAwesomeIcon
      data-widgster="close"
      icon={faPlus}
      color="#5d8fc2"
      cursor="pointer"
    />
  );
