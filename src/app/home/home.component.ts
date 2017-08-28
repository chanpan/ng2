import { Component, OnInit } from '@angular/core';
import { RemoteClass } from '../remote/remoteClass';
import { HtmlHelper } from "../shared/Classes/HtmlHelper";
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { MysqlService } from '../shared/mysql.service';
import {BaseHtml} from '../shared/Classes/BaseHtml';
@Component({
  selector: 'app-home',
  template: `
      <div class='container'>
        <div *ngIf="show">
          <div class="row">
              <div *ngFor="let fields of objezfield" >
                <div [innerHtml]="fields.input"></div> 
              </div> 
          </div>
        </div> 
      </div>
  `,
  styleUrls: ['./home.component.css'],
  providers:[MysqlService]
})
export class HomeComponent implements OnInit {
 
  
  private objezfield: Array<{label: any, input: any, type?:any, ezf_field_length?:any, ezf_field_lenght?:any}> = [];

  private show:boolean = false;
    ConnectDB() {
    this.mysql.DBConnected().subscribe(
      (success)=>{console.log(success)},
      (error)=>console.log(error)
    );
  }

  constructor(private sanitizer: DomSanitizer, private mysql:MysqlService) { 
      this.ConnectDB();
      this.mysql.FindAll("ezform_fields","where ezf_id=1500524459015751100").subscribe(
      (fields)=>{
         
            for(let i in fields){
                  let field = fields[i]; //field
                  let options:any; 
                  if(field.ezf_field_options == '' || field.ezf_field_options == null){
                    options = {};
                  }else{
                    options  = JSON.parse(field.ezf_field_options);//convert to object 
                  }
                  try{delete options.specific;}catch(e){}
                  
                  this.objezfield.push({
                    label:field.ezf_field_label, 
                    input:field.ezf_field_name, 
                    type:field.ezf_field_type,
                    ezf_field_lenght:field.ezf_field_lenght,
                   
                  }); 
                  console.log(this.objezfield[i]);
                  this.show = true;
                  if(this.objezfield[i].type == 51){
                        let names = BaseHtml.getInputName(field);
                        options["class"]="form-group";
                        let value='';
                        //this.objezfield[i].label = sanitizer.bypassSecurityTrustHtml() ;
                        this.objezfield[i].input = sanitizer.bypassSecurityTrustHtml(`
                            <div class='col-md-${field.ezf_field_lenght}' item-id='${field.ezf_field_id}'>
                              <div>
                                 ${HtmlHelper.label(field.ezf_field_label)}
                                 ${HtmlHelper.textInput(names,value,options)}
                              </div>
                            <div>
                        `) ;
                  }else{
                      let names = BaseHtml.getInputName(field);
                      options["class"]="form-group";
                      let value='';
                      
                      //this.objezfield[i].label = sanitizer.bypassSecurityTrustHtml(HtmlHelper.label(""));
                      this.objezfield[i].input = sanitizer.bypassSecurityTrustHtml(HtmlHelper.hiddenInput(names,value,options)) ;
                  }
         
                
            }

      }
     ); 
         
 
  }

  ngOnInit() {
  }

  newWindow(){
      RemoteClass.Views();  
  }

}
