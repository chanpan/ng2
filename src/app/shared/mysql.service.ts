import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import mysql from 'mysql';
@Injectable()
export class MysqlService {

  /** Valiable **/
  private connection:any;
  constructor() { }
  DBConnected() {
    this.connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'Chanpan07',
      database: 'nhis'
    });
    
    return new Observable(obs=>{
      this.connection.connect((error) => {
        if (error)obs.error(error);
           obs.next(this.connection);
      });
    });
  }//DatabaseConnected 
  FindAll(table:string, where:any){
     return new Observable(obs=>{
        let sql=`SELECT * FROM ${table} ${where}`;
        this.connection.query(sql,(error, results, fields)=>{
           if(error)obs.error(error);
           obs.next(results);
           //obs.next(fields);
        });
     });
   }//FindAll  
   
   Create(table:string , data:any){
    return new Observable(obs=>{
        let sql=`INSERT INTO ${table} SET ?`;
        this.connection.query(sql,data,(error, results, fields)=>{
           if(error)obs.error(error);
           obs.next(results);
        });
     });
  }//Create
  Update(table:string, set:any='', where:any='', data:any){
    return new Observable(obs=>{
        let sql=`UPDATE ${table} ${set} WHERE ${where}`;
        this.connection.query(sql,data,(error, results, fields)=>{
           if(error)obs.error(error);
           obs.next(results);
        });
     });
  }//update 
  Delete(table:any, where:any, data:any){
    //let table = 'users';
    //let where = "id = ?";
    //let data = [1];
     return new Observable(obs=>{
        let sql=`DELETE FROM ${table} WHERE ${where}`;
        this.connection.query(sql,data,(error, results, fields)=>{
           if(error)obs.error(error);
           obs.next(results);
        });
     });
  }   
   
   DBClosed(){
    this.connection.end();
   }//DBClosed   
}
