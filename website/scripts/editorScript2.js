(function () {
    var appToken;
    var sdk;

    var membersAppDefId = '14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9';
    var ecomAppDefID = '1380b703-ce81-ff05-f115-39571d94dfcd';

    function addWidget(){
        return sdk.tpa.add.component(appToken, {
            componentType: 'WIDGET',
            copyStyle:true,
            widget : {widgetId:'widget'}
        })
    }

    function addHidden() {
        return sdk.tpa.add.component(appToken, {
            componentType: 'PAGE',
            page : {pageId:'page'}
        })
    }

    module.exports = {
        editorReady: function (_editorSDK, _appToken, options) {
            return new Promise(function (resolve, reject) {
                appToken = _appToken;
                sdk = _editorSDK;
                if (options && options.firstInstall) {
                    addWidget().then(addHidden, addHidden).then(resolve)
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
