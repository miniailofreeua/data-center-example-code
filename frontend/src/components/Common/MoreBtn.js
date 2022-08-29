import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import './styles.scss';

const MoreBtn = ({ actions }) => {
  const renderAction = ({ onAction, icon, text }) => {
    return (
      <DropdownItem onClick={onAction}>
        <i className="dropdown-icon">
          <FontAwesomeIcon icon={icon} color="success" cursor="pointer" />
        </i>
        {text}
      </DropdownItem>
    );
  };

  return (
    <button className="list-inline-item dropdown pointer">
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-muted font-size-18 px-2">
          <i className="uil uil-ellipsis-h"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-left" tabIndex={5}>
          {actions.map(renderAction)}
        </DropdownMenu>
      </UncontrolledDropdown>
    </button>
  );
};

export default MoreBtn;
