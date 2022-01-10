import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.state';
import { FileService } from '../../services/file.service';
import { FileModel } from '../../interfaces/file';
@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  public files: string[] = [];
  fileList$: Observable<FileModel[]>;

  constructor(private fileService: FileService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.fileList$ = this.store.select(state => state.product);
    this.fileService.getFiles().subscribe(data => {
      this.files = data['files'];
      this.files.map(filePath => {
        this.store.dispatch({
          type: 'ADD_FILE',
          payload: <FileModel>{
            path: filePath
          }
        });
      })
    });
  }

  getFileName(file: string): string {
    return file.replace(/^.*[\\\/]/, '');
  }
}
