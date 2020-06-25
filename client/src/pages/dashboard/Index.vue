<template>
    <div>
        <h1>Dashboard</h1>
    </div>
</template>
<script>
export default {
    name: 'dashboard',
    created () {
        console.log('-')
        if (localStorage.getItem('mini.wp.msg')) {
            this.$bvToast.toast(`${localStorage.getItem('mini.wp.msg')}`, {
                title: 'Success',
                autoHideDelay: 3000,
                variant: 'success',
                appendToast: true
            })   
            localStorage.removeItem('mini.wp.msg')
        }
    },
}
</script>