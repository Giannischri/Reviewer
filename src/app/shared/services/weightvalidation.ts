import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export default class weightvalidation {
  static weightval(): ValidatorFn {
    return (controls: AbstractControl) => {
       if(parseFloat(controls.value)%1==0)
       {
        if ((controls?.value>0 && controls?.value<100 ))
        return null;
        else {
          return { pattern: true };
        }
       }
       else{
        if (parseFloat(controls.value)<1) {
          return null;
        } else {
          return { pattern: true };
        }
      }
    };
  }
  static numval(): ValidatorFn {
    return (controls: AbstractControl) => {
      
        if ((!isNaN(Number(controls.value))))
        return null;
        else {
          return { pattern: true };
        }
       
    };
  }

}
