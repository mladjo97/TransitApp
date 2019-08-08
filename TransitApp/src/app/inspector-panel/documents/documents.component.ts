import { Component, OnInit } from '@angular/core';
import { DocumentImageService } from 'src/app/_services/document-image.service';
import { Document } from 'src/app/_models/document.model';
import { DEFAULT_IMAGE, SERVER_ADDRESS } from 'src/environments/app_config';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  private documents: Document[];
  private imagePath: string;

  constructor(private docImageService: DocumentImageService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.imagePath = DEFAULT_IMAGE; // u config negde ovo pomeriti

    // load unverified documents
    this.docImageService.getAllImages().subscribe(
      (response) => this.documents = response.json(),
      (error) => console.log(error)
    );
  }

  onClick(url: string): void {
    console.log('Getting image: ' + url);
    this.imagePath = `${SERVER_ADDRESS}/${url}`;
  }

  onVerify(docUserId: string): void {
    this.docImageService.verifyImage(docUserId).subscribe(
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully verified user documents.');
        this.loadData();
      },
      (error) => {
        console.log(error);
        
        this.notificationService.notifyEvent.emit('An error occurred during verification. Please, try again.');
      }
    );
  }

  onReject(docUserId: string): void {
    this.docImageService.rejectImage(docUserId).subscribe(
      (response) => {
        this.notificationService.notifyEvent.emit('Successfully rejected user documents.');
        this.loadData();
      },
      (error) => {
        this.notificationService.notifyEvent.emit('An error occurred during rejection. Please, try again.');
      }
    );
  }

}
