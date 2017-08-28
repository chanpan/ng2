import { HtmlHelper } from './HtmlHelper';
import { BaseHtml } from './BaseHtml';
require('../../../jquery.maskedinput.min.js');
export class MaskedInput {
      static MaskInput(mask: any, name: any, value: any, options: any = [], clientOptions: any = []) {
            if (options['type'] == "" || options['type'] == null || typeof (options['type']) != 'undefined') {
                  options['type'] = 'text';
            } 
            if (options['class'] != null || typeof (options['class']) != 'undefined') {
                  options['class'] = "form-control " + options['class'];
            } else {
                  options['class'] = 'form-control';
            }


            let id = BaseHtml.getInputId(name);
            options = { "onfocus": "$(`#${id}`).mask(`" + mask + "`,`" + JSON.stringify(clientOptions) + "`)" };
            return HtmlHelper.textInput(name, value, options);
      }
}