<template>
  <div>
    <b-dropdown 
        id="dropdown-form" 
        text="Sign in" 
        ref="dropdown" 
        variant="outline-info"
        right
        class="mr-2"
    >
      <b-dropdown-form style="width: 20rem">
        <b-form-group label="Username" label-for="dropdown-form-username">
          <b-form-input
            id="dropdown-form-username"
            size="sm"
            placeholder="john12"
            v-model="form.username"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="dropdown-form-password">
          <b-form-input
            id="dropdown-form-password"
            type="password"
            size="sm"
            placeholder="Password"
            v-model="form.password"
          ></b-form-input>
        </b-form-group>
        <b-button variant="primary" size="sm" @click="onClick">Sign In</b-button>
        or
        <a href="https://github.com/login/oauth/authorize?client_id=567c195d2817565069d4" class="btn btn-sm btn-primary text-white">Github</a>
      </b-dropdown-form>
    </b-dropdown>
  </div>
</template>
<script>
  export default {
    name: 'FormLogin',
    data(){
        return {
            form: {
              username: '',
              password: ''
            }
        }
    },
    methods: {
      onClick() {
        // Close the menu and (by passing true) return focus to the toggle button
        this.$refs.dropdown.hide(true)
        this.$emit('login', this.form)
      }
    }
  }
</script>