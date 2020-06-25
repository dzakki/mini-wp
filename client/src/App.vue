<template>
    <div>
      <div v-if="!$route.meta.isLoggedin">
        <router-view></router-view>
      </div>
      
      <div class="d-flex" :class="{ toggled: toggled }" id="wrapper" v-else>

        <!-- Sidebar -->
        <header>
          <Sidebar />
        </header>
        <!-- /#sidebar-wrapper -->

        <!-- Page Content -->
        <div id="page-content-wrapper">
          <main>
              <template>
                <Nav @menuToggle=menuToggle />
              </template>
              <div class="container-fluid">
                <!-- <transition> -->
                  <router-view></router-view>
                <!-- <transition> -->
              </div>
          </main>
        </div>
      </div>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
export default {
    data(){
      return{
        toggled: false
      }
    },
    name: 'App',
    components: {
        Sidebar,
        Nav
    },
    methods: {
        menuToggle(){
          this.toggled = !this.toggled
        }
    }
}
</script>
<style >
body {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100%;
  margin-left: -15rem;
  position: fixed !important;
  z-index: 999;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  margin-left: 15rem !important;
  min-width: 100vw;
}


#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}
#sidebar-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
#sidebar-name{
  font-size: large;
  text-align: center;
  font-weight: inherit;
  margin: auto;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }
  #sidebar-wrapper .icon-nav{
    float: left;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -11rem !important;
  }
  #wrapper.toggled #page-content-wrapper{
    margin-left: 4rem !important;
  }
  #wrapper.toggled #sidebar-wrapper .icon-nav{
    float: right;
  }
  #wrapper.toggled #sidebar-wrapper #sidebar-profile {
    display: none;
  }

}
</style>
