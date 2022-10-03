import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Criteria } from 'src/app/shared/services/criteria';
import { UiMessagesComponent } from '../ui-messages/ui-messages.component';
import { DataService } from 'src/app/shared/services/data.service';
@Component({
  selector: 'app-ratecriteria',
  templateUrl: './ratecriteria.component.html',
  styleUrls: ['./ratecriteria.component.css']
})
export class RatecriteriaComponent implements OnInit {
  public numbers:any[]=[]
  public range:any
  public title:any;
  public weight:any;
  public rangeinput:any;
  constructor(private datasrv:DataService,
@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef:MatDialogRef<RatecriteriaComponent>

  ) { }

  ngOnInit(): void {
    if(this.data){
      
      if(this.data.numbers)
    this.numbers=this.data.numbers
    if(this.data.range)
    this.range=this.data.range
    this.title=this.data.title
    this.weight=this.data.weight
   
    }
  }
  setscore(number:any)
  {
    this.dialogRef.close({data:number});
  }
  setscorerange(event:any)
  {
    console.log(event)
    if(this.range.min<=event && this.range.max>=event)
    this.dialogRef.close({data:event})
    else
    this.datasrv.UI_message('Input isnt part of this criteria range')
  }

}
