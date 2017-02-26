import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import * as nshttp from 'http';
import { ImageSource } from 'image-source';
import * as _ from 'lodash';

import { Item, ItemImgSrc } from "./item";

import { AppState } from '../store/app-state';

import {
    ITEMS_RELOAD,
    ITEMS_ADD_MANY,
    ITEMS_IMG_SRC_ADD,
    ITEMS_IMG_SRC_CLEAN
} from '../store/item-reducer';

@Injectable()
export class ItemService {

    private pageSize = 8;

    private items = new Array<Item>(
        { id: 1, name: "Item 1", role: "Role 1" },
        { id: 2, name: "Item 2", role: "Role 2" },
        { id: 3, name: "Item 3", role: "Role 3" },
        { id: 4, name: "Item 4", role: "Role 4" },
        { id: 5, name: "Item 5", role: "Role 5" },
        { id: 6, name: "Item 6", role: "Role 6" },
        { id: 7, name: "Item 7", role: "Role 7" },
        { id: 8, name: "Item 8", role: "Role 8" }
    );

    constructor(private store: Store<AppState>) {
    }

    getItems(): Observable<Item[]> {

        const items$: Observable<Item[]> = this.store.select(state => state.items);
        const itemsImgSrc$: Observable<ItemImgSrc[]> = this.store.select(state => state.itemsImgSrc);

        return Observable.combineLatest(items$, itemsImgSrc$, (items, itemsImgSrc) => {

            return items.map(
                item => {
                    let imageSource = _.find(itemsImgSrc, ['id', item.id]);

                    if (imageSource) {
                        item.image_source = imageSource.image_source;
                    }

                    return item;
                }
            );

        })
        .map(items => _.sortBy(items, [function(item) { return item.id; }]));

    }

    getItem(id: number): Item {
        let item = new Item();

        item.id = id;
        item.name = `Item ${id}`;
        item.role = `Role ${id}`;

        return item;
        // return this.items.filter(item => item.id === id)[0];
    }

    getListItems(): Observable<Item[]> {
        return Observable.of(this.items);
    }

    loadItems() {

        let payload = this.items;

        let action = {type: ITEMS_RELOAD, payload: payload};

        // Clean old items image source
        // this.store.dispatch({type: ITEMS_IMG_SRC_CLEAN});

        this.store.dispatch(action);

        this.loadItemImgSrc(payload);

    }

    loadMoreItems(pageNumber: number) {

        let moreItems: Item[] = [];

        let currentItemSize = (pageNumber - 1) * this.pageSize;

        // Add one more page of items and return Observable
        for (let i = currentItemSize + 1; i <= currentItemSize + this.pageSize ; i++) {
            let newItem = new Item();
            newItem.id = i;
            newItem.name = `Item ${i}`;
            newItem.role = `Role ${i}`;

            moreItems.push(newItem);
        }

        let action = {type: ITEMS_ADD_MANY, payload: moreItems};

        this.store.dispatch(action);

        this.loadItemImgSrc(moreItems);

    }         

    loadItemImgSrc(items: Item[]) {

        items.forEach(
            item => {
                let id = item.id;

                this.getImageSource(id).subscribe(
                    res => {
                        let itemImgSrc = new ItemImgSrc();
                        itemImgSrc.id = id;
                        itemImgSrc.image_source = res;
                        let action = {type: ITEMS_IMG_SRC_ADD, payload: itemImgSrc};
                        this.store.dispatch(action);
                    }
                );
            }
        );

    }     

    private getImageSource(id: number): Observable<ImageSource> {

        let imageEndPoint = `https://dummyimage.com/300x300&text=${id}`;

        return Observable.from(nshttp.getImage(imageEndPoint));

    }                                    

}
