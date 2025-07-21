import { Component, OnInit } from '@angular/core';
import { Input,Output} from "@angular/core";
import { EventEmitter} from "@angular/core";

@Component({
  selector: 'app-score-node',
  templateUrl: './score-node.component.html',
  styleUrls: ['./score-node.component.css']
})
export class ScoreNodeComponent{

  @Input() label!: string;
  @Input() score!: number;
  @Output() scoreChange = new EventEmitter<number>();

  updateScore(event: any) {
    const newScore = Number(event.target.value);
    this.scoreChange.emit(newScore);
  }


}
