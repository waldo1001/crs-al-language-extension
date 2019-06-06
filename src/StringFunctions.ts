export class StringFunctions {
    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    }

    static escapeRegExp(str)  {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    static removeAllButAlfaNumeric(str) {
        return str.replace(/\W/g, '');
    }

    static encloseInQuotesIfMultiWord(str) {
        if (!str)
            return str;

        if (str.indexOf(' ') >= 0) {
            return "\""+str+"\"";
        } else {
            return str;
        }
    }
}