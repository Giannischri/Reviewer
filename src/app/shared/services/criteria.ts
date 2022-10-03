export interface Criteria {
  key?:string|null,
  title?: string,
  description?: string,
  direction?:string,
  numbers?:any[],
  range?:Range,
  important?:boolean,
  children?:Criteria[],
  subjective?:boolean,
  allvoted?:boolean,
  weight?:number,
  score?:number
   }
export interface Range{
  min?:any,
  max?:any,
}

