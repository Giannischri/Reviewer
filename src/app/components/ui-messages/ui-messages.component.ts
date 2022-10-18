import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-ui-messages',
  templateUrl: './ui-messages.component.html',
  styleUrls: ['./ui-messages.component.css']
})
export class UiMessagesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UiMessagesComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public error_msg: any
  ) { }
  hoverImage=false;
  

  ngOnInit(): void {
    if(this.error_msg[1]=="1"){
        
    }
    else if(this.error_msg[1]=="2"){

    }
    else if(this.error_msg=='Please Choose a CSV File !!'){
      console.error("367457234823")
      
      this.hoverImage=true;
    }
    else if(this.error_msg=='You are already a candidate'){
      console.error('alread')
      this.hoverImage=true;
    }
    else if(this.error_msg=='Title already exists')
    {
      this.hoverImage=true;
    }
    else if(this.error_msg=='Manager exists in unfinished')
    {
      this.hoverImage=true
    }
    else{
      this.hoverImage=true
    }

    
  }
  
}
