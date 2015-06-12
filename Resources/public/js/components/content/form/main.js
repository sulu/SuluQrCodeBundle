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

        /**
         * Adds tracking parameters to url
         *
         * @param string url
         *
         * @returns string
         */
        addTrackingParameters: function(url) {
            var trackingUrl,
                divider = '?';
            if (url.indexOf('?') > -1) {
                divider = '&';
            }
            trackingUrl = url + divider + 'utm_source=qr-sulu&utm_media=qr-code&utm_campaign=' + this.data.title;

            return trackingUrl;
        },

        /**
         * Get url of current page
         *
         * @param bool addTracking Defines if tracking params should be added
         *
         * @returns string
         */
        getUrl: function(addTracking) {
            var baseUrl = window.location.origin,
                pageUrl = baseUrl + '/qrl/' + this.data.id + '?locale=' + this.data.concreteLanguages[0];

            return pageUrl;
        },

        /**
         * Generate QR Code
         *
         * @param element
         */
        generateQrCode: function(element) {
            new QRCode(
                element,
                {
                    text: this.getUrl(true),
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
