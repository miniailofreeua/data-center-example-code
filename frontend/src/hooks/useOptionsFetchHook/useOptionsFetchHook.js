import { useEffect, useReducer } from 'react';
import { FETCH_REQUEST, FETCH_REQUEST_FAILURE, FETCH_REQUEST_SUCCESS } from './actions';
import optionsFetchReducer from './optionsFetchReducer';

const initialState = {
	isLoading: false,
	isError: false,
	options: []
};

export default (optionsFetchPromise, params) => {
	const [state, dispatch] = useReducer(optionsFetchReducer, initialState);
	useEffect(() => {
		let isComponentUnmounted = false;
		const fetchData = async () => {
			dispatch({ type: FETCH_REQUEST });
			try {
				const response = await optionsFetchPromise(params);
				const payload = response || [];
				if (!isComponentUnmounted) {
					dispatch({ type: FETCH_REQUEST_SUCCESS, payload });
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
	}, [optionsFetchPromise, params]);
	return state;
};
