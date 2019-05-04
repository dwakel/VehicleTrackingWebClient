import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocationHubService } from './_services/location-hub.service';
import { Subscription } from 'rxjs';
import { Coordinate } from './_models/Coordinate';
import { } from 'googlemaps';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'WebClient';
  latitude: any;
  longitude: any;
  homeLatitude: any;
  homeLongitude: any;
  latt: string;
  lonn: string;
  Radius: number;
  statusMessage: string;
  constructor(private location: LocationHubService) {
    this.homeLatitude = 5.759553;
    this.homeLongitude = -0.220318;
    this.Radius = 300;
    this.statusMessage = 'N/A';
    this.latitude = null;
    this.longitude = null;
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
          this.latt = loc.latitude;
          this.lonn = loc.longitude;
          this.deleteLocationMarker();
          this.setLocationMarker();
          this.statusMessage = this.calculateDistanceVoilation();
        });
    let mapProp = {
      center: new google.maps.LatLng(
        this.homeLatitude,
        this.homeLongitude
        ),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.HYBRID,
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    if (this.latitude == null) {
      this.latitude = this.homeLatitude;
      this.longitude = this.homeLongitude;
      this.setCenter();
      this.setPeremeter();
    }
  }

  setCenter() {
    this.map.setCenter(new google.maps.LatLng(
      this.latitude,
      this.longitude));
  }
  setLocationMarker() {
    let theLocation = new google.maps.LatLng(
      this.latitude,
      this.longitude);

    let marker = new google.maps.Marker({
      position: theLocation,
      map: this.map,
      title: 'Current location'
    });
  }
  deleteLocationMarker() {
    let theLocation = new google.maps.LatLng(
      this.latitude,
      this.longitude);

    let mark = new google.maps.Marker({
      position: null,
      map: null,
      title: 'Current location'
    });
  }

  setPeremeter() {
    let distancePeremeter = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      map: this.map,
      center: new google.maps.LatLng(this.homeLatitude, this.homeLongitude),
      radius: this.Radius // radius is in meters
    });

    let homeMarker = new google.maps.Marker({
      position: new google.maps.LatLng(this.homeLatitude, this.homeLongitude),
      map: this.map,
      title: 'home',
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
    });
  }

  calculateDistance () {
    const RE = 6371; // Radius of the earth
    let dLat = this.deg2rad(this.latitude - this.homeLatitude);
    let dLon = this.deg2rad(this.longitude - this.homeLongitude);

    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(this.homeLatitude)) *
      Math.cos(this.deg2rad(this.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RE * c * 1000; // distance, d = RE * c, (distance in kilometers so multiplied by 1000)
  }

  calculateDistanceVoilation () {
    if (this.Radius - this.calculateDistance() < 0) {
      return `You are ${this.calculateDistance() - this.Radius} meters out of the safety range`;
    }
    return 'You are withing the saftey range';
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

}
