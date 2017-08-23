import { Component, OnInit } from '@angular/core';

/** Routing **/
import { RouterModule, Router } from '@angular/router';

/** Services or Provider**/
import { MysqlService } from '../shared/mysql.service';

/** JQuery Import **/
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-mysql',
  templateUrl: './mysql.component.html',
  styleUrls: ['./mysql.component.css'],
  providers: [MysqlService]
})
export class MysqlComponent implements OnInit {
  private users = {};
  private title = "USER";
  private show:boolean = false;
  private frmUser = {};

  constructor(private mysql: MysqlService,private router: Router) {}

  ngOnInit() {
    this.mysql.DBConnected();
    this.ConnectDB();
    this.ShowUser('users');
  }

  ConnectDB() {
    this.mysql.DBConnected().subscribe(
      (success)=>{console.log(success)},
      (error)=>console.log(error)
    );
  }
  ShowUser(table:string){
     this.mysql.FindAll(table,'').subscribe(
       (result)=>{this.users = result; this.show = true;},
       (error)=>console.log(error)
     );
  }
  CheckInsertOrUpdate(){
    if($("#frmID").val() != ""){
      console.log('update');
      this.Update();
    }else{
       console.log('create');
       this.Create();
    }
  }//CheckInsertOrUpdate
  Create(){
    console.log(this.frmUser);
    this.mysql.Create('users',this.frmUser).subscribe(
      (result)=>{
         alert("SUCCESS");
         this.Clear();
         this.ShowUser('users');
      },
      (error)=>console.log(error)
    );
  }
  Update(){
    let set = `SET username=?,password=?,fname=?,lname=?,tel=?`;
    let where = "id=?";
    let data = [
      this.frmUser["username"],
      this.frmUser["password"],
      this.frmUser["fname"],
      this.frmUser["lname"],
      this.frmUser["tel"], 
      this.frmUser["id"] //where id = ? 
    ];

    this.mysql.Update('users', set, where, data).subscribe(
      (result) => {
        alert("SUCCESS");
        this.Clear();
        this.ShowUser('users');
      },
      (error) => console.log(error)
    );
  }//Update
  Delete(id:any){
      let where = "id = ?";
      let data = [id];
      this.mysql.Delete('users', where, data).subscribe(
      (result) => {
        alert("SUCCESS");
        this.ShowUser('users');
      },
      (error) => console.log(error)
    );
  }
  Clear(){
     this.frmUser = {};
  }//Clear
  FormUpdate(u:any){
    this.frmUser = u;
  }//FormUpdate

}
