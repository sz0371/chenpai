import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/index'
import News from '@/components/news'
import Home from '@/components/home'
import Product from '@/components/product'
import Contact from '@/components/contact'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			component: Index,
			children: [{
					path: '',
					component: Home
				},
				{
					path: '/news',
					component: News
				},
				{
					path: '/product',
					component: Product
				},
				{
					path: '/contact',
					component: Contact
				},
				{
					path: '/about',
					component: About
				}
			]
		},
		{
			path: '/news',
			component: News
		}
	]
})