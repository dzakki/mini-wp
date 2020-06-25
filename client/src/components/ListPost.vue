<template>
    <div>
        <div class="row">
            <div class="col-12 col-lg-3 col-md-3 mb-3" style="max-height:450px" v-for="post in posts" :key="post._id">
                <b-card :img-src="post.featured_image" img-alt="Post image" img-top img-height="200" class="shadow-sm post">
                    <b-card-text>
                    <h2 class="card-title" style="font-size:115% !important; line-height: 1.5;">
                        <router-link 
                            :to="{name: 'post-slug', params: { slug: post.slug }}"
                            style="text-decoration: none;color: #19abea;">
                            {{post.title}}
                        </router-link>
                    </h2>
                    </b-card-text>
                </b-card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ListPost',
    props: ['posts']
}
</script>