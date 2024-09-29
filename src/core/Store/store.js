import { createStore } from 'redux';

// Actions
const SET_CHILDREN = 'SET_CHILDREN';
const ADD_CHILD = 'ADD_CHILD';

const SET_CHILD = 'SET_CHILD';
const UPDATE_CHILD = 'UPDATE_CHILD';

export const setChildren = (children) => ({ type: SET_CHILDREN, children });
export const addChild = (child) => ({ type: ADD_CHILD, child });

export const setChild = (child) => ({ type: SET_CHILD, child });
export const updateChild = (child) => ({ type: UPDATE_CHILD, child });

// Reducer
const initialState = {
    children: [],
    selectedChild: undefined
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHILDREN:
            return { ...state, children: action.children };
        case ADD_CHILD:
            return { ...state, children: [...state.children, action.child] };

        case SET_CHILD:
            return { ...state, selectedChild: action.child };
        case UPDATE_CHILD:
            return {
                ...state,
                selectedChild: state.selectedChild ? action.updatedChild : undefined,
                children: state.children.map((child) =>
                    child.id === action.id ? action.updatedChild : child
                ),
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
