<template>
  <v-navigation-drawer
    v-model="Sidebar_drawer"
    :dark="SidebarColor !== 'white'"
    :color="SidebarColor"
    mobile-breakpoint="960"
    clipped
    :right="$vuetify.rtl"
    mini-variant-width="70"
    :expand-on-hover="expandOnHover"
    app
    id="main-sidebar"
    
  >
  <!-- src="../../assets/banner.jpg" -->
    <v-list dense nav>
      <!---USer Area -->
      <v-list-item two-line class="px-0" color="white" >
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/men/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{email}}</v-list-item-title>
          <v-list-item-subtitle class="caption">User</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!---USer Area -->
      <hr color="white"/>
      <!---Sidebar Items -->
      
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.link"
        :name="item.link"
        :active-class="`itemOver white--text`"
        link
        class="itemss"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        
        
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      

      <v-list-item @click="logOut()">
        <v-list-item-icon>
          <v-icon>lock</v-icon>
        </v-list-item-icon>
        
        
        <v-list-item-content>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!---Sidebar Items -->
      
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    email: '',
    admins: [
					['Role', 'roles', 'military_tech'],
					['Admin', 'admin', 'mdi-account-group-outline']
		],
    items: [
					{
						icon: 'dashboard',
						link: 'home',
						text: 'Home'
					},
          {
						icon: 'info',
						link: 'about',
						text: 'About'
					},
          {
						icon: 'mdi-account',
						link: 'profile',
						text: 'Profile'
					}

				]
  }),
  computed: {
    ...mapState('menu/',["SidebarColor", "SidebarBg"]),
    Sidebar_drawer: {
      get() {
        console.log(this.$store.state.currentUser.user)
        return this.$store.state.menu.Sidebar_drawer;
      },
      set(val) {
        this.$store.commit("menu/SET_SIDEBAR_DRAWER", val);
      }
    }
  },
  watch: {
    "$vuetify.breakpoint.smAndDown"(val) {
      this.$emit("update:expandOnHover", !val);
    }
  },

  methods: {
    logOut () {
      localStorage.removeItem('id_token')
			this.$router.replace('/login')
    }
  },
  mounted(){
    this.email = this.$store.state.currentUser.user.data ? this.$store.state.currentUser.user.data.email : this.$store.state.currentUser.user.email
  }
};
</script>
<style lang="scss">
#main-sidebar{
  box-shadow:1px 0 20px rgba(0,0,0,.08);
  -webkit-box-shadow:1px 0 20px rgba(0,0,0,.08);
  .v-navigation-drawer__border{
    display: none;
  }
  .v-list{
    padding: 8px 15px;
  }
  .v-list-item{
      &__icon--text,
      &__icon:first-child{
        justify-content: center;
        text-align: center;
        width: 20px;
        
      }
      
  } 
  router-link{
      text-decoration: none;
  }
  router-link a{
      text-decoration: none !important;
  }
}

.itemOver{
  background-color: #101820!important;
  text-decoration: none !important;
  color: #ffb719 !important;
}
.itemOverColor{
  color: rgb(16, 24, 32) !important;
}
.itemss{
  text-decoration: none !important;
}
</style>