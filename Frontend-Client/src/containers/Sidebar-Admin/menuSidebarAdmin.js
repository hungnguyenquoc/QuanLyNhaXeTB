export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', 
        menus: [
            {
                name: 'menu.system.system-administrator.user-redux',
                subMenus: [
                    { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                    { name: 'menu.system.system-administrator.system-user-list', link: '/system/system-user-list' },
                ]
            },
        ]
    },
    { //hệ thống
        name: 'menu.system.header', 
        menus: [
            {
                name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
                //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
                // ]
            },
            // { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        ]
    },
    // { //hệ thống
    //     name: 'menu.system.header', 
    //     menus: [
    //         {
    //             name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage'
    //             // subMenus: [
    //             //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
    //             //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
    //             //     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
    //             //     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
    //             // ]
    //         },
    //         { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
    //     ]
    // },
];