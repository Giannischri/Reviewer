export interface User {
   key?:string|null;
    uid?: string;
    email?: string;
    firstname?: string;
    secondname?:string;
    roles?:Roles;
    emailVerified?: boolean;
    score?:number;
 }
 export interface Roles { 
   employee?:Employee;
    admin?: boolean;
 }
 export interface Employee{
   ranker?:boolean;
   editor?: boolean;
   simple?:boolean;
 }
 