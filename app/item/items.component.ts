import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { ListViewLinearLayout, ListViewEventData, RadListView, ListViewLoadOnDemandMode } from 'nativescript-telerik-ui-pro/listview';
import { Page } from 'ui/page';
import { RouterExtensions } from 'nativescript-angular/router';

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

    itemPagesLoaded: number;
    pageSize = 8;

    // Pull to refresh/load on demand status
    pullToRefreshInProgress = false;
    loadOnDemandInProgress = false;

    constructor(private itemService: ItemService, 
        private page: Page,
        private router: RouterExtensions) { }

    ngOnInit(): void {

        this.itemPagesLoaded = 1;

        this.itemList = <RadListView>this.page.getViewById('itemList');

        this.items = null;

        this.itemService.loadItems();
        // console.log(`Items: ${JSON.stringify(this.items)}`);

        // Get items
        this.items = this.itemService.getItems();

        this.items.subscribe(
            items => {

                console.log(`-----Items list changed`);

                if (this.itemList) {

                    if (this.pullToRefreshInProgress) {
                        this.itemList.notifyPullToRefreshFinished();
                        this.pullToRefreshInProgress = false;
                    }

                    if (this.loadOnDemandInProgress) {
                        this.itemList.notifyLoadOnDemandFinished();
                        this.loadOnDemandInProgress = false;
                    }

                }

                setTimeout( () => {

                    // If current page > 1, scroll to index
                    if (this.itemPagesLoaded > 1) {
                        let toIndex = (this.itemPagesLoaded - 1) * this.pageSize;

                        if (this.itemList.items && toIndex < this.itemList.items.length) {
                            this.itemList.scrollToIndex(toIndex);
                        }                    
                    }

                }, 500);

            }
        );

    }

    public onLoadMoreItemsRequested(args: ListViewEventData) {

        console.log(`Loading more data`);

        this.loadOnDemandInProgress = true;

        this.itemPagesLoaded++;
        this.itemService.loadMoreItems(this.itemPagesLoaded);

    }

    public onPullToRefreshInitiated(args: ListViewEventData) {

        console.log(`DashboardExpensesComponent - pull to refresh`);

        // this.pullToRefreshInProgress = true;

        // Reset pages of item records loaded
        // this.itemPagesLoaded = 1;

        // this.itemService.loadItems();

        this.itemList.notifyPullToRefreshFinished();

    }

    public onItemTap(id: number) {
        console.log(`Item with id ${id} was tapped`);

        this.router.navigate(['/item', id]);
    }

}
