import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-chooserole',
  templateUrl: './chooserole.component.html',
  styleUrls: ['./chooserole.component.css']
})
export class ChooseroleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChooseroleComponent>,private auth:AuthService) { }

  ngOnInit(): void {
  }
  seteditor()
  {
    this.auth.currentrole='editor'
    let aer='false,true,false'
    localStorage.setItem('roles',aer)
    this.dialogRef.close()
  }
  setranker()
  {
    this.auth.currentrole='ranker'
    let aer='false,false,true'
    localStorage.setItem('roles',aer)
    this.dialogRef.close()
  }
}
