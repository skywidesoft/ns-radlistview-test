import { Action, ActionReducer } from '@ngrx/store';
import * as _ from 'lodash';

import { Item, ItemImgSrc } from '../item/item';

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

/**
 * Reducer for dashboard expenses image source
 */
export const ITEMS_IMG_SRC_ADD = 'ITEMS_IMG_SRC_ADD';
export const ITEMS_IMG_SRC_CLEAN = 'ITEMS_IMG_SRC_CLEAN';

export const itemsImgSrcReducer: ActionReducer<ItemImgSrc[]> = (state: ItemImgSrc[] = [], action: Action) => {

    switch(action.type) {
        case ITEMS_IMG_SRC_ADD:
            return [...state, action.payload];
        case ITEMS_IMG_SRC_CLEAN:
            return [];
        default:
            return state;
    }

};