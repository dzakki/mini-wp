<template>
    <div class="mt-3" id="main-page">
        <div class="row">
        <div  class="col-6 col-lg-4 mb-3 " v-for="post in posts" :key="post.id" @click="get(post)">
            <div class="card text-white border-0 post">
                <img :src="post.featured_image" class="card-img image-article" alt="post" height="150"  style="opacity: 0.6;
                filter: alpha(opacity=60); ">
                <div class="card-img-overlay" style="color: black;">
                <h5 class="card-title text-monospace font-weight-normal" style="height: 80px;">{{post.title}}</h5>
                <p class="card-text float-right">Created at {{post.created_at}}</p>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListPost',
    props: ['posts'],
    methods: {
        get(post) {
            this.$emit('get', post)
        }
    },
    mounted(){
        this.$emit('getAll')
    }
}
</script>
<style scoped>
.post{
    cursor: pointer;
}
.post:hover{
    opacity: 0.7;
    filter: alpha(opacity=70); 
}
</style>