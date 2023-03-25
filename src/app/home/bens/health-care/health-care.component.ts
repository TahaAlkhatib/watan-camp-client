import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'health-care',
    templateUrl: 'health-care.component.html',
    styleUrls: ['health-care.component.scss'],
    animations: [
        trigger('simpleFadeAnimation', [
            state('in', style({ opacity: 1, height: 100 + 'vh' })),
            transition(':enter', [
                style({ opacity: 0, height: 0 + 'vh' }),
                animate(200),
            ]),
            transition(
                ':leave',
                animate(200, style({ opacity: 0, height: 0 + 'vh' }))
            ),
        ]),
    ]
})
export class HealthCareComponent {
    selection: string = 'health-care'
    lang= localStorage.getItem('language')
    btns = [
        { name: "General Sports Exercises", url: "hcgse" },
        { name: "General nutritional Program", url: "hcgnp" },
        { name: "specialist contact info", url: "hcsci" }
    ]

    health = [
        { name: "General Sports Exercises", url: "hcgse" },
        { name: "General nutritional Program", url: "hcgnp" },
        { name: "specialist contact info", url: "hcsci" },

    ]
    physics = [
        { name: "health Sports Exercises", url: "hchse" },
        { name: "health nutritional Program", url: "hchnp" },
        { name: "health contact info", url: "hchci" },
        
    ]
    constructor(private router: Router) {

    }
    healthy() {
        this.selection = 'health-care'
        this.btns = []

        this.health.forEach(

            b => {

                setTimeout(() => {
                    this.btns.push(b)
                }, 200);

            }
        )

    }
    physical() {
        this.selection = 'physical'

        this.btns = []
        this.physics.forEach(

            b => {

                setTimeout(() => {
                    this.btns.push(b)
                }, 200);

            }
        )
    }
    navTo(url: string) {

    }
    navToUrl(url:string){
        this.router.navigate([this.lang,'home','view-content',url])

    }
    back() {
        setTimeout(() => {
            this.router.navigate([`${this.lang}/home/bens`])
        }, 200);
    }
}