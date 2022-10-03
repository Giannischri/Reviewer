import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { Post } from 'src/app/shared/services/post';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-cardsearch',
  templateUrl: './cardsearch.component.html',
  styleUrls: ['./cardsearch.component.css']
})
export class CardsearchComponent implements OnInit {
   cardsearch:any
   cardsarray:Post[]=[]
   card!:Post
  constructor(private dataservice:DataService,private route:Router,private dialogRef: MatDialogRef<CardsearchComponent>) { }

  ngOnInit(): void {
    this.cardsarray=this.dataservice.cards
    console.log(this.cardsearch)
  }
  add_card(card:Post)
  {
    this.card=card
    console.log(this.card)
    this.route.navigate(["/cards",this.card.key])
    this.dialogRef.close()
  }
}
