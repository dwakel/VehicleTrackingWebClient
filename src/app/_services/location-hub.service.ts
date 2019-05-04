import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { Coordinate } from '../_models/Coordinate';
import { CONFIGURATION } from '../_models/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LocationHubService {
  private connection: signalR.HubConnection;
  connectionEstablished = new Subject<Boolean>();
  locationCordinates = new Subject<Coordinate>();

  connect(accessToken) {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
      .withUrl(CONFIGURATION.baseUrls.server +
          'location')
      .build();

      this.connection.start().then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.next(true);
      }).catch(err => console.log(err));

      this.connection.on('PinpointLocation', (latitude, longitude) => {
        console.log('Received', latitude, longitude);
        this.locationCordinates.next({ latitude, longitude });
      });
     }
  }

  sendCommand(command) {
    this.connection.invoke('Command', command).catch(err => console.log(err));
  }

  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }
  constructor() {

  }
}