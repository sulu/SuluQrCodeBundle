<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\QrCodeBundle\Controller;

use Sulu\Component\Rest\RestController;

class TemplateController extends RestController
{
    public function qrcodeFormAction()
    {
        return $this->render(
            'SuluQrCodeBundle:Template:qrcode.form.html.twig'
        );
    }
}
