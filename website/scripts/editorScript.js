let appToken;
let editorSDK;

module.exports = {
    editorReady: (_editorSDK, _appToken) => {
        appToken = _appToken;
        editorSDK = _editorSDK;
    },

    getAppManifest: function () {
        return {}
    },

    onEvent: ({eventType, eventPayload}) => {
        try {
            switch (eventType) {
                case 'install':
                    editorSDK.tpa.add.component(appToken, {
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
                default: console.log(eventType, eventPayload)
            }
        } catch (e) {
            throw e
        }
    },

    getControllerPresets: () => {
        return Promise.resolve([])
    }
};
