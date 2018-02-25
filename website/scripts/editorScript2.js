(function () {
    var appToken;
    var sdk;

    var membersAppDefId = '14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9';
    var ecomAppDefID = '1380b703-ce81-ff05-f115-39571d94dfcd';

    module.exports = {
        editorReady: function (_editorSDK, _appToken, options) {
            return new Promise(function (resolve, reject) {
                console.log('STORE PLATFORM APP IS UP');
                appToken = _appToken;
                sdk = _editorSDK;
                if (options && options.firstInstall) {
                    sdk.tpa.add.component({
                        componentType: 'WIDGET',
                        copyStyle:true,
                        widget : {widgetId:'widget'}
                    }).then(()=> {
                        sdk.tpa.add.component({
                            componentType: 'PAGE',
                            page : {pageId:'page'}
                        }).then(resolve)
                    })
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
        handleAction: function (args) {
            var type = args.type, payload = args.payload;
            try {
                switch (type) {
                    default:
                        window.console.log(type, payload);
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
})();
