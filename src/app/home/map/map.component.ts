import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.scss']
})
export class MapComponent {

    apiLoaded: Observable<boolean>;

    constructor(httpClient: HttpClient) {
        // this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE', 'callback')
        //     .pipe(
        //       map(() => true),
        //       catchError(() => of(false)),
        //     );
    }

    center: google.maps.LatLngLiteral = { lat: 41, lng: 29 };
    zoom = 10;
    markerOptions: google.maps.MarkerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [{ lat: 41, lng: 29 }];

    addMarker(event: google.maps.MapMouseEvent) {
        // this.markerPositions.push(event.latLng.toJSON());
        // console.log(this.markerPositions)
    }

    goToLocation() {        
        window.location.href = 'geo:41,29'
    }

}