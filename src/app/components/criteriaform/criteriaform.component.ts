import { Component, Input, OnInit,OnDestroy} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { Criteria } from 'src/app/shared/services/criteria';
import { FormControl,FormGroup } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { max } from 'rxjs';
import { TreeService } from 'src/app/shared/services/tree.service';
import { ThisReceiver } from '@angular/compiler';
import { DataService } from 'src/app/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroupDirective } from '@angular/forms';
import { Validators,NG_VALIDATORS } from '@angular/forms';
import weightvalidation from 'src/app/shared/services/weightvalidation';
import { UiMessagesComponent } from '../ui-messages/ui-messages.component';
@Component({
  selector: 'app-criteriaform',
  templateUrl: './criteriaform.component.html',
  styleUrls: ['./criteriaform.component.css']
})
export class CriteriaformComponent implements OnInit {
  @Input() criteria!:Criteria;
  directions=['Positive','Negative'];
  importance=['True','False'];
  formdata:any;
  hiderange:boolean=false
  hideset:boolean=false
  hidenums:boolean=false
  selectedtab:any=1;
  numlist:any[]=[];
  critrange:any|boolean={min:+'',max:+''};
  criteriaform = new FormGroup({
    title: new FormControl('',Validators.required),
    description: new FormControl(''),
    direction:new FormControl('',Validators.required),
    min:new FormControl(''),
    max:new FormControl(''),
    numitem:new FormControl({value:'',validators:[weightvalidation.numval()]}),
    stringitem:new FormControl(''),
    important:new FormControl(''),
    subjective:new FormControl(''),
    weight:new FormControl('',{validators:[Validators.required,weightvalidation.weightval()]})
  });
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<CriteriaformComponent>,private router:ActivatedRoute,private dialog:MatDialog) { 
    
  }
  UI_message(error_msg: any) {
    this.dialog.open(UiMessagesComponent, {
      data: error_msg,
      width:'350px'
    });
  }
  ngOnInit(): void {
    this.criteriaform.reset()
     console.log(this.data.parent)
     
    if(this.data.parent)
    {
      this.criteriaform.get('title')?.setValue(this.data.parent.title!)
      this.criteriaform.get('description')?.setValue(this.data.parent.description!)
      this.criteriaform.get('direction')?.setValue(this.data.parent.direction!)
      this.criteriaform.get('important')?.setValue(this.data.parent.important!)
      this.criteriaform.get('subjective')?.setValue(this.data.parent.subjective!)
      this.criteriaform.get('weight')?.setValue(this.data.parent.weight!)
      if(this.data.parent.numbers)
      this.numlist=this.data.parent.numbers
      if(this.data.parent.range)
      this.critrange=this.data.parent.range
      if(this.numlist.length!=0 && this.numlist!=undefined)
      {
        
        this.critrange=false
      }
    }
    if(this.data.action=='add'){
    
    this.numlist=[];
    this.hiderange=false
        this.hideset=false
        this.hidenums=false
    }
    
    
   
  }
  onSubmit(formDirective: FormGroupDirective){ 
      
  if(this.criteriaform.get('description')?.value==undefined)
  this.criteriaform.get('description')?.setValue('')
  this.formdata={
  title:this.criteriaform.get('title')?.value,
   description:this.criteriaform.get('description')?.value,
   direction:this.criteriaform.get('direction')?.value,
    numbers:this.numlist,
    range:this.critrange==false?{}:this.critrange,
    important:this.criteriaform.get('important')?.value==null?false:this.criteriaform.get('important')?.value,
    subjective:this.criteriaform.get('subjective')?.value==null?false:this.criteriaform.get('subjective')?.value,
    weight:this.criteriaform.get('weight')?.value!
};
  console.log(this.formdata);
  if(this.formdata){
  this.dialogRef.close({data:this.formdata});
  }
 
//this.treesrv.criteriadata=this.formdata;
 //this.treesrv.addNode();
}
rangesettrue()
{
  this.selectedtab=1
  
}
numcharsettrue()
{
  this.selectedtab=2
}
numbersettrue()
{
  this.selectedtab=3
}
  formatLabel(value: number) {
    if (value >= 1) {
      return Math.round(value / 1);
    }

    return value;
  }
  additemlist(event?:Event)
  {
    
    
    console.log(this.selectedtab)
    console.log(this.criteriaform.get('min')?.value)
    console.log(this.criteriaform.get('max')?.value)
    this.critrange={min:+'',max:+''}
    if(Number(this.criteriaform.get('min')?.value)% 1>0 || Number(this.criteriaform.get('max')?.value)% 1>0 && this.selectedtab==1)
    {
     /* console.log("eiiiopp")
      let min:number=this.criteriaform.get('min')?.value;
      let max:number=this.criteriaform.get('max')?.value;
      for(let i=min;i<=max;i+=0.1){
        console.log(i.toFixed(1))
        this.numlist?.push(+i.toFixed(1));
        
        }*/
        if(this.criteriaform.get('min')?.value==null || this.criteriaform.get('max')?.value==null)
        {
          this.UI_message('Mix or Max is missing')
          return
        }
        
       this.critrange.min=Number(this.criteriaform.get('min')?.value)
       this.critrange.max=Number(this.criteriaform.get('max')?.value)
        
    }
    else if(!isNaN(Number(this.criteriaform.get('min')?.value)) && !isNaN(Number(this.criteriaform.get('max')?.value)) && this.selectedtab==1){
     /* let min:number=parseInt(this.criteriaform.get('min')?.value);
      let max:number=parseInt(this.criteriaform.get('max')?.value);
      
      for(let i=min;i<=max;i++){
      this.numlist?.push(+i);
      
      }*/
      if(this.criteriaform.get('min')?.value==null || this.criteriaform.get('max')?.value==null)
      {
        this.UI_message('Mix or Max is missing')
        return
      }
      this.critrange={min:+'',max:+''}
      this.critrange.min=Number(this.criteriaform.get('min')?.value)
       this.critrange.max=Number(this.criteriaform.get('max')?.value)
    }
    else if(this.selectedtab==1 ){
     /* console.log("chars")
      var mins=(this.criteriaform.get('min')?.value).charCodeAt(0) - 97
      var maxs=(this.criteriaform.get('max')?.value).charCodeAt(0) - 97
      for(let i=mins;i<=maxs;i++){
        
        this.numlist.push(i);
        }
        console.log("item added:"+this.numlist)*/
        if(this.criteriaform.get('min')?.value==null || this.criteriaform.get('max')?.value==null)
        {
          this.UI_message('Mix or Max is missing')
          return
        }
        this.critrange={min:+'',max:+''}
        this.critrange.min=this.criteriaform.get('min')?.value
        this.critrange.max=this.criteriaform.get('max')?.value
    }
    else if(this.selectedtab==2 && this.criteriaform.get('numitem')!.value){
      var str:string=this.criteriaform.get('stringitem')?.value+":"+this.criteriaform.get('numitem')?.value
      this.numlist.push(str)
      this.critrange=false
    }
    else if(this.selectedtab==3 && event && this.criteriaform.get('numitem')!.value!='' && !isNaN(Number(this.criteriaform.get('numitem')!.value!)))
    {
      this.numlist.push(this.criteriaform.get('numitem')?.value)
      this.critrange=false
    }
    else
    this.UI_message('Something went wrong.Please check your values')
    
    if(this.numlist.length!=0 || this.critrange.min!='')
    {
      if(this.selectedtab==1)
      {
        this.hidenums=true
        this.hideset=true
      }else if (this.selectedtab==2)
      {
        this.hiderange=true
        this.hidenums=true
      }else if(this.selectedtab==3)
      {
        this.hiderange=true
        this.hideset=true
      }
    }
    console.log(this.critrange)
    console.log(this.numlist)
    this.numlist = this.numlist.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  })
     this.criteriaform.controls['min'].reset();
     this.criteriaform.controls['max'].reset();
     this.criteriaform.controls['stringitem'].reset();
     this.criteriaform.controls['numitem'].reset();
     
  }
  deleterange()
  {
    this.critrange=false
    this.hiderange=false
      this.hideset=false
      this.hidenums=false
  }
  remove(item:number): void {
    
    const index = this.numlist.indexOf(item);
    
    if (index >= 0) {
      this.numlist.splice(index, 1);
    }
    if(this.numlist.length==0)
    {
      this.hiderange=false
      this.hideset=false
      this.hidenums=false
    }
  }
  

}