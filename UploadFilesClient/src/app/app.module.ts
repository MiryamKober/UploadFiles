import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { UploadComponent } from './components/upload/upload.component';
import { DownloadComponent } from './components/download/download.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { StoreModule } from '@ngrx/store';
import { fileReducer } from './state/files.reducer';
@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DownloadComponent,
    FileListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({product: fileReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
