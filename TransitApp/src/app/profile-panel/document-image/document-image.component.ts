import { Component, OnInit } from '@angular/core';
import { DocumentImageService } from 'src/app/_services/document-image.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { PORT, DEFAULT_IMAGE } from 'src/environments/app_config';

@Component({
  selector: 'app-document-image',
  templateUrl: './document-image.component.html',
  styleUrls: ['./document-image.component.css']
})
export class DocumentImageComponent implements OnInit {
  private fileToUpload: File;
  private imagePath: string;
  private canUpload: boolean;
  private submitted: boolean;
  private hasImage: boolean;
  private deleting: boolean;

  constructor(private docImageService: DocumentImageService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.canUpload = false;
    this.submitted = false;
    this.deleting = false;
    this.imagePath = DEFAULT_IMAGE;

    this.docImageService.getImage().subscribe(
      (response) => {
        this.imagePath = `http://localhost:${PORT}${response.json()}`;
        this.hasImage = true;
      },
      (error) => {
        this.hasImage = false;
      }
    );
  }

  handleFileInput(files: FileList) {
    this.canUpload = false;
    this.fileToUpload = files.item(0);

    if(this.fileToUpload) {
      // read file as data url
      let reader = new FileReader();
      reader.readAsDataURL(this.fileToUpload); 

      // called once readAsDataURL is completed
      reader.onload = (event: any) => { 
        this.imagePath = event.target.result;
        this.canUpload = true;
      }
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.hasImage){
      this.docImageService.putImage(this.fileToUpload).subscribe(
        (response) => {
          this.notificationService.notifyEvent.emit('Successfully uploaded photo.');
          this.submitted = false;
          this.loadData();
        },
        (error) => { 
          this.notificationService.notifyEvent.emit('An error occurred while uploading the image. Please, try again.');
          this.submitted = false;
        }
    );
    } else {
      this.docImageService.postImage(this.fileToUpload).subscribe(
        (response) => {
          this.notificationService.notifyEvent.emit('Successfully uploaded a new photo.');
          this.submitted = false;
          this.loadData();
        },
        (error) => { 
          this.notificationService.notifyEvent.emit('An error occurred while uploading the image. Please, try again.');
          this.submitted = false;
        }
      );
    }
    
  }

  onDelete(): void {
    this.deleting = true;
    this.docImageService.deleteImage().subscribe(
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully deleted your document image.');
        this.loadData();
        this.deleting = false;
      },
      (error) => {
        this.notificationService.notifyEvent.emit('An error occurred while deleting the image. Please, try again.');
        this.deleting = false;
      }
    );
  }

}
