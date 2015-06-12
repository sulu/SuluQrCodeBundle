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

use Sulu\Component\Content\Mapper\ContentMapperInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class QrlController extends Controller
{
    CONST UTM_SOURCE = 'qr-sulu';
    CONST UTM_MEDIA = 'qr-code';

    public function urlAction(Request $request, $id)
    {
        $locale = $request->get('locale');
        $webspaceKey = $request->get('webspace');

        if (!$locale) {
            throw new \Exception('no locale specified');
        }
        if (!$webspaceKey) {
            throw new \Exception('no webspace found');
        }

        /** @var ContentMapperInterface $contentMapper */
        $contentMapper = $this->get('sulu.content.mapper');

        $structure = $contentMapper->load($id, $webspaceKey, $locale);
        $pageUrls = $structure->getUrls();

        if (count($pageUrls) < 1) {
            throw new \Exception('Url does not exist');
        }
        $pageUrl = $pageUrls[$locale];

        // FIXME: This is not the way to go, since url of webspaces can differ to admin page
        $basepath = $request->getSchemeAndHttpHost();
        $url = $basepath . '/' . $locale . $pageUrl;

        $url = $this->addTrackingParameters($url, $structure->getLocalizedTitle($locale));

        return $this->redirect($url);
    }

    private function addTrackingParameters($url, $title)
    {
        $divider = '?';
        if (strpos($url, '?') !== false) {
            $divider = '&';
        }

        $url .= $divider .
            'utm_source=' . self::UTM_SOURCE .
            '&utm_media=' . self::UTM_MEDIA .
            '&utm_campaign=' . $title;

        return $url;
    }
}
