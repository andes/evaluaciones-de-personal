
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class AppHomeComponent implements OnInit {
    public ayuda: boolean = true;

    constructor() { }

    ngOnInit(): void {

    }
}
