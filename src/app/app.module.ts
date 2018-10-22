import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasGridComponent } from './canvas-grid/canvas-grid.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CellsNumbTabModel} from "./cells-numb-tab-model";


@NgModule({
  declarations: [
    AppComponent,
    CanvasGridComponent,
    ConfigurationComponent,
    CellsNumbTabModel
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
