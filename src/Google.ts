import open = require('open');
import { StringFunctions } from './StringFunctions'
import * as crsOutput from './CRSOutput';

export class Google {
    static readonly BusinessCentralSearchUrl = 'http://www.google.com/search?q=<SearchString>+Business+Central'

    public static GetSearchUrl(SearchString: string): string {
        return StringFunctions.replaceAll(this.BusinessCentralSearchUrl, '<SearchString>', SearchString.split(' ').join('+'))
    }

    public static OpenSearchUrl(SearchString: string) {
        let Url = this.GetSearchUrl(SearchString);
        open(Url);
        crsOutput.showOutput(`OpenSearchUrl ${Url}`);
    }
}
