<template>
  <v-app dark id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
      <router-view :profile="profile"/>
  </v-app>

</template>

<script>

export default {
  name: 'App',
  
  components: {
	},
  data () {
    return {
      profile: '',
    }
  },
  methods: {
    getProfile () {
      this.loading = true
      this.axios.post('/me', {},
			{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("id_token")
        }
      })
			.then(response => {
        this.loading = false
        this.profile = response.data
        this.$store.dispatch('currentUser/setUserData', response.data)
        console.log(response)
			}).catch(error => {
        console.log(error.response)
        if (error.response) {
          console.log(error.response.status);
          if(error.response.status == '401'){
            this.$router.replace('/login')
          }
        }
				this.loading = false
			})
    },
  },
  mounted () {
    this.getProfile()
  
  }
}
</script>

<style>
.v-main__wrap {
  /* lato as font */
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  /* background-color: #101820!important; */
  /* background: url( './assets/pattern10.jpg') repeat center center; */
  background-size: cover;
}

.theme--light.v-pagination .v-pagination__item--active{
  background-color:#101820!important;
}
.theme--light.v-pagination .v-pagination__navigation {
  background: #fff;
  color:black;
}
.mdrp__activator .activator-wrapper .text-field:focus~label, .mdrp__activator .activator-wrapper .text-field__filled~label{
  color:#101820!important;
}
</style>