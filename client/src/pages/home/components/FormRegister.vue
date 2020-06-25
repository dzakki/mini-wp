<template>
  <div>
    <b-dropdown 
        id="dropdown-form" 
        text="Sign up" 
        ref="dropdown" 
        variant="outline-primary"
        right
    >
      <b-dropdown-form style="width: 20rem">
        <b-form-group label="Username" label-for="dropdown-form-username-register">
          <b-form-input
            id="dropdown-form-username-register"
            size="sm"
            placeholder="john12"
            v-model="form.username"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email" label-for="dropdown-form-email-register">
          <b-form-input
            id="dropdown-form-email-register"
            size="sm"
            placeholder="john12@example.com"
             v-model="form.email"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="dropdown-form-password-register">
          <b-form-input
            id="dropdown-form-password-register"
            type="password"
            size="sm"
            placeholder="Password"
             v-model="form.password"
          ></b-form-input>
        </b-form-group>
        <b-button variant="primary" size="sm" @click="onClick">Sign Up</b-button>
      </b-dropdown-form>
    </b-dropdown>
  </div>
</template>
<script>
  export default {
    name: 'FormRegister',
    data(){
        return {
          form: {
            username: '',
            email: '',
            password: ''
          }
        }
    },
    methods: {
      onClick() {
        // Close the menu and (by passing true) return focus to the toggle button
        this.$refs.dropdown.hide(true)
        this.$emit('register', this.form)
      }
    }
  }
</script>