import open = require('open');
import { StringFunctions } from './StringFunctions';
import * as crsOutput from './CRSOutput';

export class MSDocs {
    static readonly BusinessCentralSearchUrl = 'https://docs.microsoft.com/en-us/search/index?search=<SearchString>&scope=BusinessCentral'

    public static GetSearchUrl(SearchString: string): string {
        return StringFunctions.replaceAll(this.BusinessCentralSearchUrl, '<SearchString>', SearchString.split(' ').join('+'))
    }

    public static OpenSearchUrl(SearchString: string) {
        let Url = this.GetSearchUrl(SearchString);
        open(Url);
        crsOutput.showOutput(`OpenSearchUrl ${Url}`);
    }
}
