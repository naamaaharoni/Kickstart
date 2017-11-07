var appToken;
var sdk;

var membersAppDefId = '14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9';
var ecomAppDefID = '1380b703-ce81-ff05-f115-39571d94dfcd';

function addOrders() {
    var membersAPI = sdk.application.getPublicAPI(appToken, {appDefinitionId: membersAppDefId});
    return membersAPI.addSection({
        appDefinitionId: ecomAppDefID,
        pageId: 'order_history',
        social: false,
        showInLoginMenu: true
    });
}

module.exports = {
    editorReady: function (_editorSDK, _appToken, options) {
        return new Promise(function (resolve, reject) {
            console.log('STORE PLATFORM APP IS UP');
            appToken = _appToken;
            sdk = _editorSDK;
            if (options && options.firstInstall) {
                sdk.application.install(appToken, {appDefinitionId: membersAppDefId, initiatorAppDefinitionId: ecomAppDefID})
                    .then(resolve, reject);
            } else {
                resolve();
            }
        });
    },
    getAppManifest: function () { return ({}); },
    onEvent: function (args) {
        var eventType = args.eventType, eventPayload = args.eventPayload;
        try {
            switch (eventType) {
                default:
                    window.console.log(eventType, eventPayload);
            }
        }
        catch (e) {
            throw e;
        }
    },
    onTransactionalEvent: function (args) {
        var eventType = args.eventType, eventPayload = args.eventPayload;
        try {
            switch (eventType) {
                case 'appInstalled':
                    switch(eventPayload.appDefinitionId) {
                        case membersAppDefId: {
                            return addOrders()
                        }
                        default:
                            return Promise.resolve()
                    }
                    break;
                default:
                    window.console.log(eventType, eventPayload);
                    return Promise.resolve()
            }
        }
        catch (e) {
            Promise.reject()
            throw e;
        }
    },
    getControllerPresets: function () { return Promise.resolve([]); }
};
