<template>
  <v-app-bar app clipped-left clipped-right color="" style="background-color:#011324!important;" dark>
    
    <v-app-bar-nav-icon
      class="d-block d-md-none"
      @click="$vuetify.breakpoint.smAndDown ? setSidebarDrawer(!Sidebar_drawer) : $emit('input', !value)"
    />
    <v-toolbar-title :clipped-left="false" class="align-center d-flex">
      <span class="logo-icon">
        <img src="../../assets/logo.png"  class="esar-logo"/>
      </span>
      <!-- <span class="logo-text ml-2">
        <img src="../../assets/esar_logo_inverse.png" class="mt-2 esar-logo" />
      </span> -->
    </v-toolbar-title>
    <v-spacer />
    <!---right part -->
    <v-menu bottom left transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in userprofile" :key="i" @click="href">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    
    
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    userprofile: [
      { title: "My Profile" },
      { title: "Account Setting" },
      { title: "Logout" }
    ],
    href() {
      return undefined;
    }
  }),

  computed: {
    ...mapState('menu/',["Sidebar_drawer"])
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "menu/SET_SIDEBAR_DRAWER"
    })
  }
};
</script>

<style >
	.esar-logo {
		width: 110px;
		margin-left: 10px;
		margin-right: 10px;
	}

	[b1], .b1 { border: 1px dashed red; }

	.list__tile {
		height: auto;
		min-height: 48px;
	}

	.list__tile__title {
		white-space: normal !important;
		text-overflow: wrap !important;
		word-wrap: break-word;
  }
  
</style>