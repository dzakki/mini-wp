<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button class="btn text-muted" id="menu-toggle" @click="menuToggle"> <b-icon-list></b-icon-list> </button>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <b-icon-list></b-icon-list>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em>{{$route.meta.username}}</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click="signOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'Nav',
    methods: {
        menuToggle() {
            this.$emit('menuToggle')
        },
        signOut(){
            localStorage.clear()
            this.$router.push('/')
        }
    },
}
</script>