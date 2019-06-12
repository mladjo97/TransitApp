import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_ADDRESS } from 'src/environments/app_config';

declare var $;

@Injectable()
export class LocationService {
 
  private proxy: any;  
  private proxyName: string = 'buslinehub';  
  private connection: any;  
  public connectionExists: Boolean; 
  public notificationReceived: EventEmitter < string >;

  constructor() {  
      this.notificationReceived = new EventEmitter<string>();
      this.connectionExists = false;  
      // create a hub connection  
      this.connection = $.hubConnection(SERVER_ADDRESS);
      // create new proxy with the given name 
      this.proxy = this.connection.createHubProxy(this.proxyName);  
      this.registerForHello();
  }  
 
  // browser console will display whether the connection was successful    
  public startConnection(groupName: string): Observable<Boolean> { 
      
    return Observable.create((observer) => {
       
        this.connection.start( () => {
            this.proxy.invoke("joinGroup", groupName);
        })
        .done((data: any) => {  
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id)
            this.connectionExists = true;

            observer.next(true);
            observer.complete();
        })
        .fail((error: any) => {  
            console.log('Could not connect ' + error);
            this.connectionExists = false;

            observer.next(false);
            observer.complete(); 
        });  
      });
  }

  public registerForHello(): void {        
    this.proxy.on('updateCoordinates', (data) => { 
        this.notificationReceived.emit(data);  
    }); 
}  

}