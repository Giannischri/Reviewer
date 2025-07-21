import { Component, OnInit } from '@angular/core';
import { Input} from "@angular/core";

@Component({
  selector: 'app-project-meta',
  templateUrl: './project-meta.component.html',
  styleUrls: ['./project-meta.component.css']
})
export class ProjectMetaComponent  {

  @Input() project!: { title: string; image: string; description: string };



}
