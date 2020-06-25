import Home from '../pages/home/Index.vue'
import PostBySlug from "../pages/home/Slug.vue";
import Dashboard from '../pages/dashboard/Index.vue'
import Post from '../pages/post/Index.vue'

const routes = [    
    { path: '/', name: 'home', component: Home, meta: {
        isLoggedin: false
    }},
    { path: '/dashboard', name: 'dashboard', component: Dashboard,  meta: {
        isLoggedin: true
    }},
    { 
        path: '/posts', 
        name: 'posts', 
        component: Post,  
        meta: { 
            isLoggedin: true 
        },
        children: [
            {
                path: ':method',
                name: 'add-post',
                component: Post,
                meta: { 
                    isLoggedin: true 
                }
            }
        ]
    },
    { path: '/:slug', name: 'post-slug', component: PostBySlug, meta: { isLoggedin: false }},
]

export default routes