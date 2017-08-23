import {BaseHtml} from './BaseHtml';
export class HtmlHelper{
    static label(name:string, options:any=[]){
       let strattr = BaseHtml.renderAttribute(options);  
       if(Object.keys(options).length === 0){
            //options
            strattr = "";
       }  
       return `<label ${strattr}>${name}</label>`;
    }//Label

    static textInput(name:string, value:string = null, options:any=[]){
        
        if(options['type']=="" || options['type']==null || typeof(options['type']) != 'undefined'){
            options['type']='text';
        }
        if(options['class'] != null || typeof(options['class']) != 'undefined'){
            options['class'] = "form-control "+options['class'];
        }else{
            options['class']='form-control';
        }
        options['name']=name;
        options['id']= BaseHtml.getInputId(name);

        
        options['value'] = value;
        let strattr = BaseHtml.renderAttribute(options); 
        return BaseHtml.tag('input', strattr); 
     }//TextInput  //return `<input ${name} ${strattr}>`; <input type='text' name
 
    static hiddenInput(name:string, value:string = null, options:any=[]){
        if(options['type']=="" || options['type']==null || typeof(options['type']) != 'undefined'){
             options['type']='hidden';
        }
        options['name']=name;
        options['id']= BaseHtml.getInputId(name);
        options['value'] = value;
        let strattr = BaseHtml.renderAttribute(options); 
        return BaseHtml.tag('input', strattr); 
     }//TextInput 
   
}