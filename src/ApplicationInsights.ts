import * as applicationinsights from 'applicationinsights';

export class AppInsights {
    private static _instance: AppInsights
    private appInsights: typeof applicationinsights | undefined
    private client: any
    private started: boolean
    private constructor() {
    }
    static getInstance(): AppInsights {
        if (!AppInsights._instance) {
            AppInsights._instance = new AppInsights()
        }
        return AppInsights._instance
    }
    start() {
        if (this.started) { return };
        this.appInsights = require('applicationinsights');
        this.appInsights.setup("InstrumentationKey=b3550667-aa59-41e0-b132-41e7e0d7a70d;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/")
            .setAutoCollectPerformance(false, false)
            .setAutoCollectExceptions(false)
            .start();
        this.client = this.appInsights.defaultClient;
        this.started = true;
    }

    trackTrace(message: string) {
        this.start();
        this.client.trackTrace({ message: message });
    }
    trackCommand(command: string) {
        this.start();
        this.trackTrace(`Command ${command} was executed.`)
    }
    trackEvent(name: EventName, properties: any) {
        this.start();
        this.client.trackEvent({ name: name.toString(), properties: properties });
    }
}
export enum EventName {
    SetupSnippets = "SetupSnippets",
    CreateGraphVizDependencyGraph = "CreateGraphVizDependencyGraph",
    CompileDGML = "CompileDGML",
    RunCurrentObjectWeb = "RunCurrentObjectWeb",
    PublishAndRunCurrentObjectWeb = "PublishAndRunCurrentObjectWeb",
    RunObjectWeb = "RunObjectWeb",
    RunTestTool = "RunTestTool",
    RunEventSubscribers = "RunEventSubscribers",
    RunDatabaseLocks = "RunDatabaseLocks",
    RunObjectTablet = "RunObjectTablet",
    RunObjectPhone = "RunObjectPhone",
    RunObjectWindows = "RunObjectWindows",
    RenameCurrentFile = "RenameCurrentFile",
    RenameAllFiles = "RenameAllFiles",
    ReorganizeCurrentFile = "ReorganizeCurrentFile",
    ReorganizeAllFiles = "ReorganizeAllFiles",
    SearchMicrosoftDocs = "SearchMicrosoftDocs",
    SearchGoogle = "SearchGoogle",
    SearchObjectNames = "SearchObjectNames",
    HandleOnSaveTextDocument = "HandleOnSaveTextDocument",
    HandleOnOpenTextDocument = "HandleOnOpenTextDocument",
    HandleOnChangeActiveTextEditor = "HandleOnChangeActiveTextEditor",
    ConfigureBestPracticeNaming = "ConfigureBestPracticeNaming"
}