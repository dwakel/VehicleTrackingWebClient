import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocationHubService } from './_services/location-hub.service';
import { Subscription } from 'rxjs';
import { Coordinate } from './_models/Coordinate';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'WebClient';
  latitude: any;
  longitude: any;
  constructor(private location: LocationHubService) {
    this.latitude = 56.34532;
    this.longitude = -11.54354;

   }

  coordinates: Coordinate[] = [];
  public fName: string;
  locationCordinate: Coordinate;
  locationSubscription: Subscription;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngAfterViewInit() {
    this.location.connect('');
    this.locationSubscription = this.location.
        locationCordinates.subscribe(loc => {
          // this.coordinates.push(loc);
          this.latitude = loc.latitude;
          this.longitude = loc.longitude;
        });
        let mapProp = {
          center: new google.maps.LatLng(
            this.latitude,
            this.longitude
            ),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.HYBRID
        };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    // this.setCenter();
  }


  // setCenter() {
  //   this.map.setCenter(new google.maps.LatLng(
  //     this.latitude,
  //     this.longitude));

  //   let theLocation = new google.maps.LatLng(
  //     this.latitude,
  //     this.longitude);

  //   let marker = new google.maps.Marker({
  //     position: theLocation,
  //     map: this.map,
  //     title: 'Got you!'
  //   });

// }

}
