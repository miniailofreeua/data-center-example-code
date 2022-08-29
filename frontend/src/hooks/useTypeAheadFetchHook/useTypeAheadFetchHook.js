/*eslint-disable react-hooks/exhaustive-deps*/
import { useEffect, useReducer, useState, useMemo } from 'react';
import optionsFetchReducer from '../useOptionsFetchHook/optionsFetchReducer';
import {
  FETCH_REQUEST,
  FETCH_REQUEST_FAILURE,
  FETCH_REQUEST_SUCCESS,
} from '../useOptionsFetchHook/actions';

const initialState = {
  isLoading: false,
  isError: false,
  options: [],
};

// should be removed when all preload/autocomplete services
// start to return array value-label pair instead of mixed props
const defaultSelectOptionsMapper = (item) => {
  const { firstName, lastName, id, name, value, label } = item;

  const newLabel = label
    ? label
    : firstName && lastName
    ? `${firstName} ${lastName}`
    : name;
  return { label: newLabel, value: item.hasOwnProperty('value') ? value : id };
};
const includeByCondition = ({ condition, ...rest }) => ({
  ...(condition && { ...rest }),
});
const sortByLable = (a, b) => {
  const aLabel = a.label.toLowerCase();
  const bLabel = b.label.toLowerCase();
  if (aLabel < bLabel) {
    return -1;
  }
  if (aLabel > bLabel) {
    return 1;
  }
  return 0;
};

//todo: add debounce for api calls

export default function useTypeAheadFetchHook({
  optionsFetchPromise,
  selectedOption,
  filterOptions,
  selectOptionsMapper = defaultSelectOptionsMapper,
  selectOptionsSort = sortByLable,
}) {
  const [state, dispatch] = useReducer(optionsFetchReducer, initialState);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [searchText, setSearchText] = useState('');
  const defaultFilterOptions = useMemo(
    () => ({
      ...includeByCondition({ condition: Boolean(searchText), searchText }),
    }),
    [searchText],
  );

  useEffect(() => {
    let isComponentUnmounted = false;
    const fetchData = async () => {
      dispatch({ type: FETCH_REQUEST });
      try {
        const response = await optionsFetchPromise({
          ...defaultFilterOptions,
          ...includeByCondition({
            condition: selectedOption,
            selectedOption,
          }),
          ...includeByCondition({
            condition: filterOptions,
            ...filterOptions,
          }),
        });
        const data = response.hasOwnProperty('list') ? response.list : response;
        let selectOptions = [];
        if (selectOptionsSort !== null) {
          selectOptions = data
            ? data.map(selectOptionsMapper).sort(selectOptionsSort)
            : [];
        } else {
          selectOptions = data ? data.map(selectOptionsMapper) : [];
        }

        if (!isComponentUnmounted) {
          dispatch({ type: FETCH_REQUEST_SUCCESS, payload: selectOptions });
        }
        if (isFirstTime) {
          setIsFirstTime(false);
        }
      } catch (err) {
        if (!isComponentUnmounted) {
          dispatch({ type: FETCH_REQUEST_FAILURE });
        }
      }
    };
    fetchData();
    return () => {
      isComponentUnmounted = true;
    };
  }, [filterOptions, defaultFilterOptions, selectedOption]);
  const handleInputChange = (value) => setSearchText(value.trim());
  return { state, handleInputChange };
}
