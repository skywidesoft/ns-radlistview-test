import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

// @ngrx/store
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';

import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

import { LISTVIEW_DIRECTIVES } from 'nativescript-telerik-ui-pro/listview/angular';

import { COMMON_DIRECTIVES } from './navigation/directives';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        StoreModule.provideStore(reducers),
        AppRoutingModule
    ],
    declarations: [
        COMMON_DIRECTIVES,
        LISTVIEW_DIRECTIVES,
        AppComponent,
        ItemsComponent,
        ItemDetailComponent
    ],
    providers: [
        ItemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
