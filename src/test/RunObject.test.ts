import * as assert from 'assert';
import { suite, test } from 'mocha';

import { Settings } from '../Settings';
import { DynamicsNAV } from '../DynamicsNAV';

suite("RunObject Tests", () => {

    test("CRS.PublicWebBaseUrl - RunObject in WebClient - NoSetting", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = 'http://navserver';
        testSettings[Settings.WebServerInstance] = 'NAV';
        testSettings[Settings.WebServerInstancePort] = '';
        testSettings[Settings.Tenant] = 'default';

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 50100);

        assert.notEqual(url.indexOf('navserver'), -1);
        assert.equal(url.indexOf('undefined'), -1);

    })
    test("CRS.PublicWebBaseUrl - RunObject in WebClient - Overriding setting", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = 'http://navserver';
        testSettings[Settings.WebServerInstance] = 'NAV';
        testSettings[Settings.WebServerInstancePort] = '';
        testSettings[Settings.Tenant] = '';
        testSettings[Settings.PublicWebBaseUrl] = 'http://SomeServer.Cronus.com/NAV'

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 22);

        assert.equal(url.indexOf('navserver'), -1);
        assert.notEqual(url.indexOf('SomeServer'), -1);
        assert.equal(url.indexOf('undefined'), -1);
        assert.equal(url.indexOf('default'), -1);
    })
    test("CRS.PublicWebBaseUrl - RunObject in Phone - Overriding setting", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = 'http://navserver';
        testSettings[Settings.WebServerInstance] = 'NAV';
        testSettings[Settings.WebServerInstancePort] = '';
        testSettings[Settings.Tenant] = '';
        testSettings[Settings.PublicWebBaseUrl] = 'http://SomeServer.Cronus.com/NAV'

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'phone', 'page', 22);

        assert.equal(url.indexOf('navserver'), -1);
        assert.notEqual(url.indexOf('SomeServer'), -1);
        assert.equal(url.indexOf('undefined'), -1);
        assert.equal(url.indexOf('default'), -1);
        assert.notEqual(url.indexOf('phone'), -1);
    })
})