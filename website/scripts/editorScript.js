var appToken;
var sdk;
module.exports = {
    editorReady: function (_editorSDK, _appToken) {
        return new Promise(function (resolve, reject) {
            appToken = _appToken;
            sdk = _editorSDK;
            resolve();
        });
    },
    getAppManifest: function () { return ({}); },
    onEvent: function (_a) {
        var eventType = _a.eventType, eventPayload = _a.eventPayload;
        try {
            switch (eventType) {
                case 'install':
                    sdk.tpa.add.component(appToken, {
                        componentType: 'PAGE',
                        page: {
                            pageId: 'order_history',
                            platform: {
                                type: 'members',
                                social: false,
                                showInLoginMenu: true
                            }
                        }
                    });
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
