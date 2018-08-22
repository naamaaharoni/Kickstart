(function () {
var appToken;
var sdk;

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
            mockController: {
                default: {
                    visibility: 'EDITOR',
                    gfpp: {
                        mainAction: {
                            actionId: 'action1',
                            label: 'label1'
                        },
                        mainAction2: {
                            actionId: 'action2',
                            label: 'label2'
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
            console.log('STORE PLATFORM APP IS UP');
            appToken = _appToken;
            sdk = _editorSDK;
            if (options && options.firstInstall) {
                var controllerDef = {
                    type: 'Component',
                    skin: 'platform.components.skins.controllerSkin',
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
                        applicationId: '1380b703-ce81-ff05-f115-39571d94dfcd',
                        name: 'editorController',
                        controllerType: 'editorController'
                    },
                    metaData: {
                        isPreset: false,
                        schemaVersion: '1.0',
                        isHidden: false
                    },
                    style: {
                        type: 'TopLevelStyle',
                        metaData: {
                            isPreset: false,
                            schemaVersion: '1.0',
                            isHidden: false
                        },
                        style: {
                            groups: {},
                            properties: {
                                'alpha-bg': '1',
                                'alpha -bgh': '1',
                                'alpha - brd': '1',
                                'alpha - brdh': '1',
                                'alpha - txt': '1',
                                'alpha - txth': '1',
                                bg: '#3D9BE9',
                                bgh: '#2B689C',
                                'boxShadowToggleOn -shd': 'false',
                                brd: '#2B689C',
                                brdh: '#3D9BE9',
                                brw: '0px',
                                fnt: 'normal normal normal 14px/1.4em raleway',
                                rd: '20px',
                                shd: '0 1px 4px rgba(0, 0, 0, 0.6);',
                                txt: '#FFFFFF',
                                txth: '#FFFFFF'
                            },
                            propertiesSource: {
                                bg: 'value',
                                bgh: 'value',
                                brd: 'value',
                                brdh: 'value',
                                brw: 'value',
                                fnt: 'value',
                                rd: 'value',
                                shd: 'value',
                                txt: 'value',
                                txth: 'value'
                            }
                        },
                        componentClassName: 'platform.components.AppController',
                        skin: 'platform.components.skins.controllerSkin'
                    }
                }
                var pageRef = await editorSDK.getBoundedSDK().pages.getCurrent();
                await editorSDK.getBoundedSDK().components.add('token', {pageRef, componentDefinition: controllerDef, customId: 'controller_test'});
                resolve();
                // sdk.application.install(appToken, {appDefinitionId: membersAppDefId, initiatorAppDefinitionId: ecomAppDefID})
                //     .then(resolve, reject);
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
                case 'appInstalled':
                    switch(payload.appDefinitionId) {
                        case membersAppDefId: {
                            return addOrders()
                        }
                        default:
                            return Promise.resolve()
                    }
                    break;
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
