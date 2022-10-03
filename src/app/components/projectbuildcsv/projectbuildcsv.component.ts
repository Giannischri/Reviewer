import { Component, OnInit,Inject,Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-projectbuildcsv',
  templateUrl: './projectbuildcsv.component.html',
  styleUrls: ['./projectbuildcsv.component.css']
})
export class ProjectbuildcsvComponent implements OnInit {

  
 
  constructor(public dialogRef: MatDialogRef<ProjectbuildcsvComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public csvRecords: any
    ) { }

  ngOnInit(): void {
    }
 closeDialog(){
  this.dialogRef.close()
 }

}
