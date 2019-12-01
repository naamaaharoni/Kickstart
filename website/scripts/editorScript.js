(function () {
var appToken;
var editorSDK;

var membersAppDefId = '14cc59bc-f0b7-15b8-e1c7-89ce41d0e0c9';
var ecomAppDefID = '1380b703-ce81-ff05-f115-39571d94dfcd';

function addOrders() {
    // var membersAPI = sdk.application.getPublicAPI(appToken, {appDefinitionId: membersAppDefId});
    // return membersAPI.addSection({
    //     appDefinitionId: ecomAppDefID,
    //     pageId: 'order_history',
    //     social: false,
    //     showInLoginMenu: true
    // });
    return Promise.resolve();
}

function getAppManifest() {
    return {
        controllersStageData: {
            fooBar: { //controllerType
                default: {
                    connections: {
                        '*': { //role
                            gfpp: {
                                desktop: {
                                    mainAction1:  {
                                        "actionId":"1",
                                        "label":"App action1"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = {
    editorReady: async function (_editorSDK, _appToken, options) {
        return new Promise(async function (resolve, reject) {
            appToken = _appToken;
            editorSDK = _editorSDK;
            if (options && options.firstInstall) {
                const controller = appDefID => ({
                    type: 'Component',
                    layout: {
                        width: 40,
                        height: 40,
                        x: 20,
                        y: 15,
                        scale: 1,
                        rotationInDegrees: 0,
                        fixedPosition: false
                    },
                    componentType: 'platform.components.AppController',
                    data: {
                        type: 'AppController',
                        applicationId: appDefID,
                        name: 'item',
                        controllerType: 'fooBar'
                    },
                    metaData: {
                        isPreset: false,
                        schemaVersion: '1.0',
                        isHidden: false
                    },
                    style: 'controller1'

                })
                const currentPageRef = await editorSDK.document.pages.getCurrent();
                const controllerRef = await editorSDK.components.add('appToken', {componentDefinition: controller(appToken), pageRef: currentPageRef})
                await editorSDK.controllers.connect('appToken', {
                    connectToRef: {
                        id: 'comp-k3n3jqhi',
                        type: 'DESKTOP'
                    },
                    controllerRef,
                    role: 'stateBox',
                    connectionConfig: {},
                    isPrimary: true
                })
                resolve()
            } else {
                resolve();
            }
        });
    },
    getAppManifest: getAppManifest,
    onEvent: function (args) {},
    handleAction: function (args) {
        var type = args.type, payload = args.payload;
        try {
            switch (type) {
                // case 'appInstalled':
                //     switch(payload.appDefinitionId) {
                //         case membersAppDefId: {
                //             return addOrders()
                //         }
                //         default:
                //             return Promise.resolve()
                //     }
                //     break;
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
