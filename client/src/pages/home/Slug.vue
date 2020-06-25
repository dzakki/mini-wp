<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <b-navbar-brand :to="{path: '/'}">Mini WP</b-navbar-brand>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <b-icon-list></b-icon-list>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <div>
                        <Tag :tags='tags' />
                    </div>
                </ul>
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <template v-if="$route.meta.userLoggedIn">
                        <router-link :to="{name: 'dashboard'}" class="btn btn-primary btn-sm">Go to dashboard</router-link>
                    </template>
                </ul>
            </div>
        </nav>
        <div class="row mt-3 pl-5 pr-5" v-if="post">
            <div class="col-12 col-md-3 col-lg-3">
                <div class="pl-1 pr-2">
                    <ul>
                        <li >
                            <h3> <b-icon-person-fill></b-icon-person-fill> <small style="font-size: 20px"> {{post.author.email}} </small> </h3>
                        </li>
                        <li>
                            <h3> 
                                <b-icon-tag></b-icon-tag> 
                                <small style="font-size: 20px">  
                                    <router-link 
                                        v-for="tag in post.tags" 
                                        :key="tag._id" 
                                        :to="{name: 'home', query: { filter: 'tag', search: tag.name }}" 
                                        class="badge badge-info mr-1">
                                        {{tag.name}}
                                    </router-link>
                                </small> 
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-12 col-md-6 col-lg-6">
                <div class="pl-2 pr-2">
                    <h1 style="font-size: 30px;"> <b> {{post.title}} </b></h1>
                    <b-img-lazy v-bind="mainProps" :src="post.featured_image" alt="Image 1" style="height: 300px !important; width: 500px !important"></b-img-lazy>
                    <article>
                         <div v-html="post.content"></div>
                    </article>
                </div>
            </div>
            <div class="col-12 col-md-3 col-lg-3">
                
            </div>
        </div>
    </div>
</template>
<script>
import FormLogin from "./components/FormLogin";
import FormRegister from "./components/FormRegister";
import Tag from "./components/Tag";
export default {
    name: 'PostBySlug',
    data(){
        return {
            tags: [],
            mainProps: {
                center: true,
                fluidGrow: true,
                blank: true,
                blankColor: '#bbb',
                width: 500,
                height: 300,
                class: 'my-3'
            },
            post: null
        }
    },
    components: {
        FormRegister,
        FormLogin,
        Tag
    },
    created(){
        let self = this

        this.axios.get('/articles/slug/'+this.$route.params.slug)
        .then(({data}) => {
            self.post = data.article
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
</script>