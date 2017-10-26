var appToken;
var sdk;
module.exports = {
    editorReady: function (_editorSDK, _appToken) {
        return new Promise(function (resolve, reject) {
            console.log('STORE PLATFORM APP IS UP')
            appToken = _appToken;
            sdk = _editorSDK;
            resolve();
        });
    },
    install: function () {
        return new Promise(function (resolve, reject) {
            var membersAppDefId = '14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9';
            var api = sdk.application.getPublicAPI(appToken, {appDefinitionId: membersAppDefId});
            // sdk.tpa.add.component(appToken, {
            //     componentType: 'PAGE',
            //     page: {
            //         pageId: 'order_history',
            //         platform: {
            //             type: 'members',
            //             social: false,
            //             showInLoginMenu: true
            //         }
            //     }
            // });
            resolve();
        });
    },
    getAppManifest: function () { return ({}); },
    onEvent: function (_a) {
        var eventType = _a.eventType, eventPayload = _a.eventPayload;
        try {
            switch (eventType) {
                case 'install':

                    break;
                default:
                    window.console.log(eventType, eventPayload);
            }
        }
        catch (e) {
            throw e;
        }
    },
    getControllerPresets: function () { return Promise.resolve([]); }
};
