import classNames from 'classnames';
import { Form } from 'formik';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { FormField } from '../../components';
import CustomLink from '../../components/Common/CustomLink';
import BrandPullApisTable from './BrandPullApisTable';
import BrandUpdateApisTable from './BrandUpdateApisTable';

const formFields = () =>
  [
    {
      id: 'name',
      name: 'name',
      label: 'Name:',
      type: 'text',
      className: 'form-control',
      placeholder: 'Brand Name',
      show: true,
    },
    {
      id: 'userDetailsUrl',
      name: 'userDetailsUrl',
      label: 'User Details URL:',
      type: 'text',
      className: 'form-control',
      placeholder: 'User Details URL',
      show: true,
    },
    {
      id: 'brandUrl',
      name: 'brandUrl',
      label: 'Brand Url:',
      type: 'text',
      className: 'form-control',
      placeholder: 'Brand Url',
      show: true,
    },
  ].filter(({ show }) => show);

const brandUpdateAPIFormFields = () =>
  [
    {
      id: 'brandUpdateApis',
      name: 'brandUpdateApis',
      label: 'Brand Update API:',
      component: BrandUpdateApisTable,
      show: true,
    },
  ].filter(({ show }) => show);

const brandPullAPIFormFields = () =>
  [
    {
      id: 'brandPullApis',
      name: 'brandPullApis',
      label: 'Brand Pull API:',
      component: BrandPullApisTable,
      show: true,
    },
  ].filter(({ show }) => show);

const renderFormField = ({ show, ...fieldProps }) => (
  <FormField key={fieldProps.name} {...fieldProps} />
);

const BrandForm = ({ initialValues, isEdit, loading }) => {
  const search = useLocation().search;
  const tab = new URLSearchParams(search).get('tab');
  const mappedTab = typeof tab === 'string' ? Number(tab) : 0;
  const [activeTab, setActiveTab] = useState(mappedTab);

  return (
    <Form autoComplete="off">
      <Nav pills>
        <NavItem>
          <NavLink
            style={{ cursor: 'pointer' }}
            className={classNames({
              active: activeTab === 0,
            })}
            onClick={() => setActiveTab(0)}
          >
            <span className="d-none d-sm-block">Main</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: 'pointer' }}
            className={classNames({
              active: activeTab === 1,
            })}
            onClick={() => setActiveTab(1)}
          >
            <span className="d-none d-sm-block">Trader Update API</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: 'pointer' }}
            className={classNames({
              active: activeTab === 2,
            })}
            onClick={() => setActiveTab(2)}
          >
            <span className="d-none d-sm-block">Trader Pull API</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="p-3 text-muted w-100">
        <TabPane tabId={0}>
          {formFields({
            initialValues,
          }).map(renderFormField)}
        </TabPane>
        <TabPane tabId={1}>
          {brandUpdateAPIFormFields({
            initialValues,
          }).map(renderFormField)}
        </TabPane>
        <TabPane tabId={2}>
          {brandPullAPIFormFields({
            initialValues,
          }).map(renderFormField)}
        </TabPane>
      </TabContent>
      <div className="pr-form-buttons">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEdit ? 'Edit' : 'Save'}
        </button>
        <CustomLink to="brands">
          <button type="button" className="btn btn-inverse m-l-1">
            Cancel
          </button>
        </CustomLink>
      </div>
    </Form>
  );
};

export default BrandForm;
