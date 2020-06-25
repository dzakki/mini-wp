<template>
    <div>
        <template v-if='changeElForm'>
            <FormPost 
                @add='add' 
                @update='update'
                @deletePost='deletePost'
                :postTemp='postTemp' /> 
        </template>
        <template  v-else>
            <div class="mt-3">
                <h1 class="float-left mr-4" id="title-page">Posts</h1>
                <router-link
                    :to="{name: 'posts', query: { form: 'add' }}"
                    class="btn btn-sm btn-outline-primary float-left mt-2">
                    Add New
                </router-link>
                <div class="float-right mt-2" style="width: 250px;">
                    <div style="display: flex;">
                        <span class="fas fa-search fa-lg m-2"></span>
                        <input type="text" class="form-control" placeholder="Search posts" aria-label="Search" aria-describedby="basic-addon1">
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>
            <ListPost :posts='posts' @get='get' @getAll='getAll'/>
        </template>
    </div>
</template>
<script>
import FormPost from "./components/Form";
import ListPost from "./components/List";
export default {
    name: 'Post',
    components: {
        FormPost,
        ListPost
    },
    data(){
        return {
            elForm: this.$route.query.form || null,
            isUpdate: false,
            posts: [],
            postTemp: null,
        }
    },
    computed: {
        changeElForm() {
            return this.$route.query.form
        }
    },
    methods: {
        add(form) {
            let self = this
            this.axios
            .post('/articles', form, {
                headers: {
                    token: localStorage.getItem('mini.wp.token')
                }
            })
            .then(({data}) => {
                console.log(data.article)
                self.posts = [data.article].concat(self.posts)
                console.log(self.posts)
                this.msgSuccess('added post')
                this.$router.replace({ path: '/posts' })
            })
            .catch(({response}) => {
                this.msgError(response.data.message)
            })
        },
        update(form){
            this.axios
            .put('/articles/'+form.get('_id'), form, {
                headers: {
                    token: localStorage.getItem('mini.wp.token')
                }
            })
            .then(({data}) => {
                self.posts = [data.article].concat(self.posts)
                this.msgSuccess('updated post')
                this.isUpdate = false
                this.postTemp = null
                this.$router.replace({ path: '/posts' })
            })
            .catch(({response}) => {
                this.msgError(response.data.message)
            })
        },
        deletePost(id){
            this.axios
                .delete('/articles/'+id, {
                    headers: {
                        token: localStorage.getItem('mini.wp.token')
                    }   
                })
                .then(({data}) => {
                    this.msgSuccess('deleted a post')
                    this.$router.replace({ path: '/posts' })
                })
                .catch(({response}) => {
                    this.msgError(response.data.message)
                })
        },
        get(payload){
            this.$router.replace({name: 'posts', query: { form: 'update' }})
            this.isUpdate = true
            this.elForm = true
            this.postTemp = payload
        },
        getAll(){
            let self = this
            this.axios.get('/articles/author', {
                headers: {
                    token: localStorage.getItem('mini.wp.token')
                }
            })
            .then(({data}) => {
                self.posts = data.articles
            })
            .catch(({response}) => {
                console.log(response)
            })
        },
        msgError(msg){
            this.$bvToast.toast(msg, {
                title: 'Post',
                autoHideDelay: 3000,
                variant: 'warning',
                appendToast: true
            })
        },
        msgSuccess(msg){
            this.$bvToast.toast(msg, {
                title: 'Post',
                autoHideDelay: 2000,
                variant: 'warning',
                appendToast: true
            })
        }
    }
}
</script>