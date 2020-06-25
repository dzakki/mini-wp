<template>
      <div class="bg-light border-right position-sticky" id="sidebar-wrapper">
        <div class="sidebar-heading border-bottom">Mini WP</div>
        <div class="mt-2 mb-3" id="sidebar-profile">
          <img src="http://via.placeholder.com/100" class="mx-auto d-block" id="sidebar-image" alt="image-profile">
          <h2 class="mx-auto pt-1" id="sidebar-name">Ahmad muzakki</h2>
        </div>
        <div class="list-group list-group-flush">
          <router-link
            :to="{name: 'dashboard'}"
            class="list-group-item list-group-item-action bg-light">
            Dashboard <b-icon-bar-chart class="icon-nav h5"></b-icon-bar-chart>
          </router-link>
          <router-link
            :to="{name: 'home'}"
            class="list-group-item list-group-item-action bg-light">
            Home <b-icon-cloud class="icon-nav h5"></b-icon-cloud>
          </router-link>
          <router-link
            :to="{name: 'posts', query: { form: 'add' }}"
            class="list-group-item list-group-item-action bg-light">
            New post <b-icon-plus class="icon-nav h5"></b-icon-plus> 
          </router-link>
          <router-link
            :to="{name: 'posts'}"
            class="list-group-item list-group-item-action bg-light">
            Post <b-icon-book class="icon-nav h5"></b-icon-book> 
          </router-link>
        </div>
      </div>
</template>
<script>
export default {
    name: 'Sidebar'
}
</script>