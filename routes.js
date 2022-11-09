import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import mailApp from './apps/mail/pages/email-app.cmp.js'
import emailDetails from './apps/mail/pages/email-details.cmp.js'

import keepApp from './apps/keep/cmps/keep-app.cmp.js'
// import noteDetalis from './apps/keep/cmps/note-detalis.cmp.js'
import noteEdit from './apps/keep/cmps/note-edit.cmp.js'


const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/mail',
			component: mailApp,
		},
		{
			path: '/mail/:id',
			component: emailDetails
		},
		{
			path: '/keep',
			component: keepApp,
			children: [
				{
					path: '/keep/:id?',
					component: noteEdit
				},
			]
		},
	],
}

export const router = createRouter(routerOptions)
