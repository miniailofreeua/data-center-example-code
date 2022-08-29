import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import { prefix } from '../../constants/path';

const CustomLink = ({ children, to, className }) => {
  const link = urljoin(`${prefix}/`, to);
  return (
    <Link to={link} className={className}>
      {children}
    </Link>
  );
};

export default CustomLink;
