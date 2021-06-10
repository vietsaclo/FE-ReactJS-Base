import React, { Component } from 'react';
import {PublicModules} from '../common/PublicModules';

class ReduxTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['d1', 'd2', 'd3'],
            status: false,
        }
    }

    test1() {
        var redux = require('redux');
        var reducer1 = (state = this.state, action) => {
            switch (action.type) {
                case 'UPDATE_STATUS':
                    return { ...state, status: true, };
                case 'ADD_NEW':
                    return { ...state, status: true, data: [...state.data, action.item] };
                default:
                    break;
            }
            return state;
        }
        var store1 = redux.createStore(reducer1);
        const stateBefore = store1.getState();
        PublicModules.fun_log(stateBefore);
        store1.dispatch({ type: 'UPDATE_STATUS' })
        const stateAfter = store1.getState();
        PublicModules.fun_log(stateAfter);
        store1.dispatch({
            type: 'ADD_NEW',
            item: 'viet-saclo',
        });
        const stateFinal = store1.getState();
        PublicModules.fun_log(stateFinal);
    }

    render() {
        this.test1();
        return (
            <></>
        );
    }
}

export default ReduxTest;