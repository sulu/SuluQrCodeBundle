/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define([
    'sulucontent/components/content/preview/main',
    'qrcode'
], function(Preview, QRCode) {

    'use strict';

    return {

        view: true,

        layout: {
            changeNothing: true
        },

        template: '',

        initialize: function() {
            this.sandbox.emit('husky.toolbar.header.item.enable', 'template', false);

            //this.preview = new Preview();

            var test = new QRCode(this.$el.get(0), {

                text: "http://jindo.dev.naver.com/collie",
                width: 128,
                height: 128,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });

            //this.dfdListenForChange = this.sandbox.data.deferred();
        }
    };
});
