import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { ListViewLinearLayout, ListViewEventData, RadListView, ListViewLoadOnDemandMode } from 'nativescript-telerik-ui-pro/listview';
import { Page } from 'ui/page';

import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {

    items: Observable<Item[]>;

    itemList: RadListView;

    loadOnDemandInProgress = false;

    itemPagesLoaded: number;
    pageSize = 8;

    constructor(private itemService: ItemService, private page: Page) { }

    ngOnInit(): void {

        this.itemPagesLoaded = 1;

        this.itemList = <RadListView>this.page.getViewById('itemList');

        this.items = null;

        this.itemService.loadItems();
        // console.log(`Items: ${JSON.stringify(this.items)}`);

        // Get items
        this.items = this.itemService.getItems();

    }

    public onLoadMoreItemsRequested(args: ListViewEventData) {
        console.log(`Loading more data`);

        this.items = this.itemService.loadMoreItems();

        this.items.subscribe( data => {
            this.itemPagesLoaded++;

            this.itemList.notifyLoadOnDemandFinished(); 
            this.itemList.refresh();

            setTimeout(() => {
                this.itemList.scrollToIndex((this.itemPagesLoaded - 1) * this.pageSize);
            }, 500);
        });
    }
}
