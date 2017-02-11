import { Action, ActionReducer } from '@ngrx/store';
import * as _ from 'lodash';

import { Item } from '../item/item';

/**
 * Reducer for items
 */
export const ITEMS_RELOAD = 'ITEMS_RELOAD';
export const ITEMS_ADD_MANY = 'ITEMS_ADD_MANY';

export const itemsReducer: ActionReducer<Item[]> = (state: Item[] = [], action: Action) => {

    switch (action.type) {
        case ITEMS_RELOAD:
            return action.payload;
        case ITEMS_ADD_MANY:
            return [...state, ...action.payload];
        default:
            return state;
    }

};
