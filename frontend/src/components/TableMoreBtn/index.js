import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

const TableMoreBtn = ({ actions }) => {
  const renderDropDownItem = ({ onClick, icon, text }) => {
    return (
      <DropdownItem onClick={onClick}>
        <i className="me-2">
          <FontAwesomeIcon
            icon={icon}
            color="success"
            cursor="pointer"
            className="dropdown-icon"
          />
        </i>
        {text}
      </DropdownItem>
    );
  };
  return (
    <li className="list-inline-item dropdown pointer">
      <UncontrolledDropdown>
        <DropdownToggle tag="a" className="text-center font-size-16">
          <i className="uil uil-ellipsis-h" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          {actions.map(renderDropDownItem)}
        </DropdownMenu>
      </UncontrolledDropdown>
    </li>
  );
};

export default TableMoreBtn;
