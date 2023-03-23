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
        { name: "General Sports Exercises", url: "#" },
        { name: "General nutritional Program", url: "#" },
        { name: "specialist contact info", url: "#" }
    ]

    health = [
        { name: "General Sports Exercises", url: "#" },
        { name: "General nutritional Program", url: "#" },
        { name: "specialist contact info", url: "#" },

    ]
    physics = [
        { name: "health Sports Exercises", url: "#" },
        { name: "health nutritional Program", url: "#" },
        { name: "health contact info", url: "#" },
        
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
    back() {
        setTimeout(() => {
            this.router.navigate([`${this.lang}/home/bens`])
        }, 200);
    }
}