import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../../../app/providers/app.service';
import { Camp } from 'src/app/model';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.scss']
})
export class MapComponent {

    apiLoaded: Observable<boolean>;

    constructor(httpClient: HttpClient, private appService: AppService, public platform: Platform) {
        // this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE', 'callback')
        //     .pipe(
        //       map(() => true),
        //       catchError(() => of(false)),
        //     );
    }



    center: google.maps.LatLngLiteral = { lat: 41, lng: 29 };
    zoom = 8;
    markerOptions: google.maps.MarkerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [{ lat: 41, lng: 29 }];

    camp: Camp


    async ngOnInit() {
        this.appService.getCurrentCamp()
        await this.appService.getCamps()

        let camp = this.appService.camps.find(x => x._id == this.appService.currentCampId)
        this.camp = camp

        if (camp?.lat?.length && camp?.long?.length) {
            this.center = { lat: +camp.lat, lng: +camp.long };
            this.markerPositions = [{ lat: +camp.lat, lng: +camp.long }];
        }
    }

    addMarker(event: google.maps.MapMouseEvent) {
        // this.markerPositions.push(event.latLng.toJSON());
        // console.log(this.markerPositions)
    }

    goToLocation() {
        if (this.platform.is('android') || this.platform.is('ios'))
            window.location.href = `geo:${this.center.lat},${this.center.lng}`
        else
            window.open(
                `https://www.google.pt/maps/dir//${this.center.lat},${this.center.lng}`,
                '_blank' // <- This is what makes it open in a new window.
            );
    }

}