<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <b-navbar-brand :to="{path: '/'}" >Mini WP</b-navbar-brand>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <b-icon-list></b-icon-list>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <div>
                        <Tag :tags='tags' />
                    </div>
                    <li class="nav-item">
                        <b-form-input size="sm" class="mr-sm-2 ml-2 mt-1" placeholder="Search by title" v-model="searchByTitle"></b-form-input>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <template v-if="!$route.meta.userLoggedIn">
                        <li>
                            <FormLogin @login='login'/>
                        </li>
                        <li>
                            <FormRegister @register='register' />
                        </li>
                    </template>
                    <template v-else>
                        <router-link :to="{name: 'dashboard'}" class="btn btn-primary btn-sm">Go to dashboard</router-link>
                    </template>
                </ul>
            </div>
        </nav>
        <div class="container-fluid mt-4 pl-5 pr-5">
            <ListPost :posts='filteredPosts' />    
        </div>
    </div>
</template>
<script>
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import ListPost from "../../components/ListPost";
import Tag from "./components/Tag";
export default {
    name: 'Home',
    data(){
        return {
            posts: [],
            tags: [],
            searchByTitle: '',
        }
    },
    components: {
        FormRegister,
        FormLogin,
        ListPost,
        Tag
    },
    computed: {
        filteredPosts(){
            const filter = this.$route.query.filter
            const search = this.$route.query.search || ''
            let self = this
            if (filter) {
                const results = []
                this.posts.forEach(post => {
                    post.tags.forEach(tag => {
                        if (tag.name.indexOf(search) !== -1) {
                            results.push(post)
                        }
                    })
                });
                return results
            }else{
                return self.posts.filter(function (post) {  
                    return post.title.indexOf(self.searchByTitle) !== -1
                })
            }
        }
    },
    methods: {
        register(form) {
            this.$bvToast.toast(`Sign up in the proccess`, {
                title: 'Sign Up',
                autoHideDelay: 3000,
                variant: 'info',
                appendToast: false
            })
            console.log(form)
            this.axios
                .post('/auth/register', form)
                .then( ({data}) => {
                    console.log(data)
                    localStorage.setItem('mini.wp.token', data.token)
                    localStorage.setItem('mini.wp.msg', 'Sign Un successfully')
                    localStorage.setItem('mini.wp.username', form.username)
                    this.$router.push({ path: '/dashboard' })
                })
                .catch(({response}) => {
                    this.$bvToast.toast(`${response.data.message}`, {
                        title: 'Sign Un',
                        autoHideDelay: 3000,
                        variant: 'warning',
                        appendToast: true
                    })
                })
        },
        login(form){
            this.$bvToast.toast(`Signin in the proccess`, {
                title: 'Sign In',
                autoHideDelay: 1000,
                variant: 'info',
                appendToast: false
            })
            this.axios
                .post('/auth/login', form)
                .then( ({data}) => {
                    localStorage.setItem('mini.wp.token', data.token)
                    localStorage.setItem('mini.wp.msg', 'Sign In successfully')
                    localStorage.setItem('mini.wp.username', form.username)
                    this.$router.push({ path: '/dashboard' })
                })
                .catch(({response}) => {
                   this.$bvToast.toast(`${response.data.message}`, {
                        title: 'Sign In',
                        autoHideDelay: 3000,
                        variant: 'warning',
                        appendToast: true
                    })
                })
                
        }
    },
    created(){
        if (this.$route.query.code) {
            this.axios
                .post('/auth/github/'+ this.$route.query.code)
                .then( ({data}) => {
                    console.log('success', data)
                    localStorage.setItem('mini.wp.token', data.token)
                    localStorage.setItem('mini.wp.username', data.username)
                    localStorage.setItem('mini.wp.msg', 'Sign In successfully')
                    this.$router.push({ path: '/dashboard' })
                })
                .catch(({response}) => {
                    console.log(response)
                   this.$bvToast.toast(`${response.data.message}`, {
                        title: 'Sign In',
                        autoHideDelay: 3000,
                        variant: 'warning',
                        appendToast: true
                    })
                })
        }else{
            let self = this
            this.axios
            .get('/articles')      
            .then(({data}) => {
                self.posts = data.articles
                return self.axios.get('/tags')
            })
            .then(({data}) => {
                self.tags = data.tags
            })
            .catch(({response}) => {
                console.log(response)
            })
        }
    }
}
</script>
<style scoped>
</style>