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
                        appDefinitionId: '135aad86-9125-6074-7346-29dc6a3c9bcf',
                        page: {
                            pageId: 'book_a_room', //replace with your app pageId
                            isHidden: true
                            // platform: {
                            //     type: 'members',
                            //     social: true, //change to false if page is not social
                            //     showInLoginMenu: true
                            // }
                        }
                    });
//                     editorSDK.tpa.add.component(appToken, {
//                         componentType: 'PAGE',
//                         appDefinitionId: '1380b703-ce81-ff05-f115-39571d94dfcd',
//                         page: {
//                             isHidden: true,
//                             pageId: 'product_gallery', //replace with your app pageId
// /*                            platform: {
//                                 type: 'members',
//                                 social: true, //change to false if page is not social
//                                 showInLoginMenu: true
//                             }*/
//                         }
//                     });
                    // editorSDK.tpa.add.component(appToken, {
                    //     componentType: 'WIDGET',
                    //     appDefinitionId: '14409595-f076-4753-8303-9a86f9f71469',
                    //     widget: {
                    //         widgetId: 'wix_vod_develop', //replace with your app pageId
                    //         allPages: true
                    //     }
                    // });

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
