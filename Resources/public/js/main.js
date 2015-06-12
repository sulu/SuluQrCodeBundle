/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

require.config({
    paths: {
        suluqrcode: '../../suluqrcode/js',
        'qrcode': '../../suluqrcode/js/vendor/qrcode'
    },
    shim: {
        'qrcode': {
            exports: 'QRCode'
        }
    }
});

define(['config'], function(Config) {
    return {

        name: "Sulu QrCode Bundle",

        initialize: function(app) {

            'use strict';

            var sandbox = app.sandbox;

            app.components.addSource('suluqrcode', '/bundles/suluqrcode/js/components');

            function getContentLanguage() {
                return sandbox.sulu.getUserSetting('contentLanguage') || Object.keys(Config.get('sulu-content').locales)[0];
            }
        }
    };
});
