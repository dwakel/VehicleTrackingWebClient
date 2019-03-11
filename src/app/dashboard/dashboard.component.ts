import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocationHubService } from '../_services/location-hub.service';
import { Subscription } from 'rxjs';
import { Coordinate } from '../_models/Coordinate';
//import { } from '@types/googlemaps';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// export class DashboardComponent implements OnInit {
  export class DashboardComponent implements OnInit {
  constructor(private location: LocationHubService) {
    this.fName = 'Gloria';
   }

   coordinates: Coordinate[] = [];
  public fName: string;
  locationSubscription: Subscription;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;


   ngOnInit() {
  //   this.location.connect('');
  //   this.locationSubscription = this.location.
  //       locationCordinates.subscribe(loc => {
  //         this.coordinates.push(loc);
  //         this.fName = loc.latitude;
  //       });
  //       const mapProp = {
  //         center: new google.maps.LatLng(18.5793, 73.8143),
  //         zoom: 15,
  //         mapTypeId: google.maps.MapTypeId.HYBRID
  //       };

  //   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
 }

  // ngAfterViewInit() {
  //   this.location.connect('');
  //   this.locationSubscription = this.location.
  //       locationCordinates.subscribe(loc => {
  //         this.coordinates.push(loc);
  //         this.fName = loc.latitude;
  //       });
  //       const mapProp = {
  //         center: new google.maps.LatLng(18.5793, 73.8143),
  //         zoom: 15,
  //         mapTypeId: google.maps.MapTypeId.HYBRID
  //       };

  //   this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  // }

}
