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

use Sulu\Bundle\AdminBundle\Admin\Admin;
use Sulu\Bundle\AdminBundle\Navigation\Navigation;
use Sulu\Bundle\AdminBundle\Navigation\NavigationItem;
use Sulu\Component\Security\Authorization\SecurityCheckerInterface;
use Sulu\Component\Webspace\Manager\WebspaceManagerInterface;

class QrCodeAdmin extends Admin
{
    /**
     * @var WebspaceManagerInterface
     */
    private $webspaceManager;

    /**
     * @var SecurityCheckerInterface
     */
    private $securityChecker;

    /**
     * The prefix for the security context, the key of the webspace has to be appended.
     *
     * @var string
     */
    private $securityContextPrefix = 'sulu.webspaces.';

    public function __construct(
        WebspaceManagerInterface $webspaceManager,
        SecurityCheckerInterface $securityChecker,
        $title
    ) {
        $this->webspaceManager = $webspaceManager;
        $this->securityChecker = $securityChecker;


//        $rootNavigationItem = new NavigationItem($title);
//        $section = new NavigationItem('');
//
//        $settings = new NavigationItem('navigation.settings');
//        $settings->setIcon('settings');
//
//        if ($this->securityChecker->hasPermission('sulu.settings.tags', 'view')) {
//            $roles = new NavigationItem('navigation.settings.tags', $settings);
//            $roles->setAction('settings/tags');
//            $roles->setIcon('settings');
//        }
//
//        if ($settings->hasChildren()) {
//            $section->addChild($settings);
//            $rootNavigationItem->addChild($section);
//        }
//
//        $this->setNavigation(new Navigation($rootNavigationItem));
    }

    /**
     * {@inheritdoc}
     */
    public function getCommands()
    {
        return array();
    }

    /**
     * {@inheritdoc}
     */
    public function getJsBundleName()
    {
        return 'suluqrcode';
    }

    /**
     * {@inheritDoc}
     */
    public function getSecurityContexts()
    {
        return array(
            'Sulu' => array(
                'Settings' => array(
                    'sulu.settings.qrcode',
                ),
            ),
        );
    }
}
