import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { FileService } from '../../services/file.service';
import { AppState } from '../../state/app.state';
import { FileModel } from '../../interfaces/file';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;
  public response: { dbPath: '' };
  fileName: string;
  currentFile: File;

  constructor(private fileService: FileService,
    private store: Store<AppState>,
  ) { }
  ngOnInit() { }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.currentFile = <File>files[0]
  };
  public uploadFinished = (event) => {
    this.response = event;
  }
  public send() {
    const extension = this.currentFile.name.split('.')[1];
    const fileName = this.fileName + "." + extension;
    const formData = new FormData();
    formData.append('file', this.currentFile, fileName);
    this.fileService.upload(formData, this.fileName).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round((100 * event.loaded) / event.total);
      else if (event.type === HttpEventType.Response) {
        console.log(event.body.dbPath, 'en')
        const filePath = event.body.dbPath;
        this.store.dispatch({
          type: 'ADD_FILE',
          payload: <FileModel>{
            path: filePath
          }
        });
        this.message = 'Upload success.';
        this.fileName = '';
        this.currentFile = undefined;
      }
    });
  }
}
