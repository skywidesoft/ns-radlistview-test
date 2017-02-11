import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';

import { Item } from "./item";

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

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }

    getListItems(): Observable<Item[]> {
        return Observable.of(this.items);
    }

    loadMoreItems(): Observable<Item[]> {

        let currentItemSize = this.items.length;

        // Add one more page of items and return Observable
        for (let i = currentItemSize + 1; i <= currentItemSize + this.pageSize ; i++) {
            let newItem = new Item();
            newItem.id = i;
            newItem.name = `Item ${i}`;
            newItem.role = `Role ${i}`;

            this.items.push(newItem);
        }

        return Observable.of(this.items);

    }                                                  
}
