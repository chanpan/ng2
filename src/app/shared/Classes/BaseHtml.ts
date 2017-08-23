export class BaseHtml{
    static getInputName(ezfield:any):string{
        //return EZ{ezf_id}[{ezf_field_name}] EZ010000[var_name]
        //let names = `name='${name}'`;
        return `EZ${ezfield.ezf_id}[${ezfield.ezf_field_name}]`;
    } 
    static getInputId(name:any):string{
        let res = '';
        for(let i=0; i<name.length; i++){
            res = name.replace('[]', '');
            res = res.replace('][', '-');
            res = res.replace('[', '-');
            res = res.replace(']', '');
            res = res.replace(' ', '-');
            res = res.replace('.', '-');            
        }
        return res.toLocaleLowerCase();
    }
    static renderAttribute(options:any):string{
        let option = "";
        for(let attr in options){
            option += `${attr}='${options[attr]}' `;
        }
        return option;
    }//getOptions 
    static tag(name:string ,options:any):string{
        return `<${name} ` + options + '>';
    }

}