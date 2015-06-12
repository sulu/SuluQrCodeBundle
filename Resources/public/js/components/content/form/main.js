/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define(['sulucontent/components/content/preview/main'], function(Preview) {

    'use strict';

    return {

        view: true,

        layout: {
            changeNothing: true
        },

        template: '',

        initialize: function() {
            this.sandbox.emit('husky.toolbar.header.item.enable', 'template', false);

            this.preview = new Preview();

            this.dfdListenForChange = this.sandbox.data.deferred();
            this.load();
        }
    };
});
