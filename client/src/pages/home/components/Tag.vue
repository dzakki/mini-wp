<template>
    <b-nav-item-dropdown text="Tags" left>
        <b-dropdown-item href="javascript:void(0)" v-for="tag in tags" :key='tag._id' @click="filter(tag.name)">{{tag.name}}</b-dropdown-item>
    </b-nav-item-dropdown>
</template>
<script>
export default {
    name: 'Tag',
    props: ['tags'],
    methods: {
        filter(tag){
            console.log(tag)
            this.$router.replace({ name: 'home', query: { filter: 'tag', search: tag } })
        }
    }
}
</script>