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

        templates: ['/admin/qrcode/template/form'],

        load: function() {
            // get content data
            this.sandbox.emit('sulu.content.contents.get-data', function(data) {
                this.data = data;
            }.bind(this));
        },

        getUrl: function() {
            // TODO: implement
            return this.data.url;
        },

        generateQrCode: function(element) {
            new QRCode(
                element,
                {
                    text: this.getUrl(),
                    width: 128,
                    height: 128,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                }
            );
        },

        initialize: function() {
            this.data = null;

            this.sandbox.emit('husky.toolbar.header.item.enable', 'template', false);

            // load data
            this.load();

            // TODO: render template

            this.renderTemplate(this.templates[0]);

            // TODO: change $el to div from template
            this.generateQrCode(this.$el.get(0));

            this.sandbox.emit('sulu.preview.initialize');


            //this.dfdListenForChange = this.sandbox.data.deferred();
        }
    };
});
