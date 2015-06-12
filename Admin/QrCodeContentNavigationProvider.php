<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\QrCodeBundle\Admin;

use Sulu\Bundle\AdminBundle\Navigation\ContentNavigationItem;
use Sulu\Bundle\AdminBundle\Navigation\ContentNavigationProviderInterface;
use Sulu\Component\Content\Structure;
use Sulu\Component\Security\Authorization\SecurityCheckerInterface;

class QrCodeContentNavigationProvider implements ContentNavigationProviderInterface
{
    /**
     * @var SecurityCheckerInterface
     */
    private $securityChecker;

    /**
     * @var bool
     */
    private $enabledSecurity;

    /**
     * @param SecurityCheckerInterface $securityChecker
     * @param bool $enabledSecurity
     */
    public function __construct(SecurityCheckerInterface $securityChecker, $enabledSecurity = false)
    {
        $this->securityChecker = $securityChecker;
        $this->enabledSecurity = $enabledSecurity;
    }

    /**
     * {@inheritdoc}
     */
    public function getNavigationItems(array $options = array())
    {
        $content = new ContentNavigationItem('content-navigation.contents.qrcode');
        $content->setId('tab-qr');
        $content->setAction('qrcode');
        $content->setComponent('content/form@suluqrcode');
        $content->setDisplay(array('edit'));

        $navigation = array($content);

        return $navigation;
    }
}
