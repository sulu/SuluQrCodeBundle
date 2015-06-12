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

    var backgroundIndex = 1,
        foregroundIndex = 0;

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

        generateQrCode: function(element, width, height, foreground, background, svg) {

            console.log(foreground, background);
            if(width) {
                width = 600;
            }

            if(height) {
                height = 600;
            }

            if(foreground === false) {
                foreground = '#000000';
            }

            if(background === false) {
                background = '#FFFFFF';
            }

            if(svg) {
                svg = false;
            }

            new QRCode(
                element,
                {
                    text: this.getUrl(),
                    width: width,
                    height: height,
                    colorDark: foreground,
                    colorLight: background,
                    correctLevel: QRCode.CorrectLevel.H,
                    useSVG: svg
                }
            );
        },

        initialize: function() {
            this.data = null;

            this.sandbox.emit('husky.toolbar.header.item.enable', 'template', false);

            // load data
            this.load();

            // TODO: render template

            this.html(this.renderTemplate(this.templates[0]));

            // TODO: change $el to div from template
            this.generateQrCode(document.getElementById('qrCode'), 600, 600, '#000000', '#FFFFFF', true);

            this.sandbox.emit('sulu.preview.initialize');


            //this.dfdListenForChange = this.sandbox.data.deferred();

            this.domEvent();
        },

        domEvent: function() {
            var colors = ["#000000", "#FFFFFF","#FF0000", "#0000FF", "#008000"];
            var background = '#000000';
            var foreground = '#FFFFFF';

            this.sandbox.on('husky.select.foreground.selected.item', function(option) {
                $('#qrCode').text('');
                foregroundIndex = option;
                this.generateQrCode(document.getElementById('qrCode'), 600, 600, colors[foregroundIndex], colors[backgroundIndex], true);
            }.bind(this));

            this.sandbox.on('husky.select.background.selected.item', function(option) {
                $('#qrCode').text('');
                backgroundIndex = option;
                console.log(background);
                console.log(foreground);
                this.generateQrCode(document.getElementById('qrCode'), 600, 600, colors[foregroundIndex], colors[backgroundIndex], true);
            }.bind(this));
        }
    };
});
