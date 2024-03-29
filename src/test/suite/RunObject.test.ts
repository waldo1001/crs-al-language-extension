import * as assert from 'assert';
import { suite, test } from 'mocha';

import { Settings } from '../../Settings';
import { DynamicsNAV } from '../../DynamicsNAV';

suite("RunObject Tests", () => {

    test("CRS.PublicWebBaseUrl - RunObject in WebClient - NoSetting", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = 'http://navserver';
        testSettings[Settings.WebServerInstance] = 'NAV';
        testSettings[Settings.WebServerInstancePort] = '';
        testSettings[Settings.Tenant] = 'default';

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 50100);

        assert.notStrictEqual(url.indexOf('navserver'), -1);
        assert.strictEqual(url.indexOf('undefined'), -1);

    })
    test("CRS.PublicWebBaseUrl - RunObject in WebClient - Overriding setting", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = 'http://navserver';
        testSettings[Settings.WebServerInstance] = 'NAV';
        testSettings[Settings.WebServerInstancePort] = '';
        testSettings[Settings.Tenant] = '';
        testSettings[Settings.PublicWebBaseUrl] = 'http://SomeServer.Cronus.com/NAV'

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 22);

        assert.strictEqual(url.indexOf('navserver'), -1);
        assert.notStrictEqual(url.indexOf('SomeServer'), -1);
        assert.strictEqual(url.indexOf('undefined'), -1);
        assert.strictEqual(url.indexOf('default'), -1);
    })
    test("CRS.PublicWebBaseUrl - RunObject in Phone - Overriding setting", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = 'http://navserver';
        testSettings[Settings.WebServerInstance] = 'NAV';
        testSettings[Settings.WebServerInstancePort] = '';
        testSettings[Settings.Tenant] = '';
        testSettings[Settings.PublicWebBaseUrl] = 'http://SomeServer.Cronus.com/NAV'

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'phone', 'page', 22);

        assert.strictEqual(url.indexOf('navserver'), -1);
        assert.notStrictEqual(url.indexOf('SomeServer'), -1);
        assert.strictEqual(url.indexOf('undefined'), -1);
        assert.strictEqual(url.indexOf('default'), -1);
        assert.notStrictEqual(url.indexOf('phone'), -1);
    })
    test("Run Object on SaaS with no Named Sandbox", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = null;
        testSettings[Settings.WebServerInstance] = null;
        testSettings[Settings.WebServerInstancePort] = null;
        testSettings[Settings.Tenant] = null;
        testSettings[Settings.PublicWebBaseUrl] = null;
        testSettings[Settings.SandboxName] = null;

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 22);

        assert.notStrictEqual(url.indexOf('sandbox'), -1);
        assert.strictEqual(url.indexOf('dev'), -1);
    })
    test("Run Object on SaaS with Named Sandbox", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.WebServer] = null;
        testSettings[Settings.WebServerInstance] = null;
        testSettings[Settings.WebServerInstancePort] = null;
        testSettings[Settings.Tenant] = null;
        testSettings[Settings.PublicWebBaseUrl] = null;
        testSettings[Settings.SandboxName] = 'dev';

        let url = DynamicsNAV.ComposeRunObjectInWebClientURL(testSettings, 'WebClient', 'page', 22);

        assert.strictEqual(url.indexOf('sandbox'), -1);
        assert.notStrictEqual(url.indexOf('dev'), -1);
    })
})