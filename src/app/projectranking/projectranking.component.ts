import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projectranking',
  templateUrl: './projectranking.component.html',
  styleUrls: ['./projectranking.component.css']
})
export class ProjectrankingComponent {

  project = {
    title: 'Project Apollo',
    image: 'assets/logo.png',
    description: 'A mission to explore the Moon.',
  };

}
