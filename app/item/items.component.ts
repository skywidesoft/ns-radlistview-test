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

    pageNumber: number;
    pageSize = 8;

    constructor(private itemService: ItemService, private page: Page) { }

    ngOnInit(): void {
        this.pageNumber = 1;

        this.itemList = <RadListView>this.page.getViewById('itemList');

        this.items = this.itemService.getListItems();
        // console.log(`Items: ${JSON.stringify(this.items)}`);

/*        this.items.subscribe( data => {
            console.log(`Items obs: ${JSON.stringify(this.items)}`);
        });*/

/*        this.items.subscribe( data => {

            if (this.pageNumber > 1) {
                if (this.loadOnDemandInProgress) {
                    this.itemList.notifyLoadOnDemandFinished(); 
                    this.loadOnDemandInProgress = false;
                }
                
                setTimeout(() => {
                    this.itemList.scrollToIndex((this.pageNumber - 1) * this.pageSize);
                }, 500);
            }

        });*/
    }

    public onLoadMoreItemsRequested(args: ListViewEventData) {
        console.log(`Loading more data`);

        this.items = this.itemService.loadMoreItems();

        this.items.subscribe( data => {
            this.pageNumber++;

            this.itemList.notifyLoadOnDemandFinished(); 
            this.itemList.refresh();

            setTimeout(() => {
                this.itemList.scrollToIndex((this.pageNumber - 1) * this.pageSize);
            }, 500);
        });
    }
}
