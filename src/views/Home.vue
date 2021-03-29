<template>
  <v-row no-gutters>
  <v-col 
    v-for="(plan, index) in plans" 
    :key="plan.plan_name" 
    sm="6"
    md="4" 
    lg="6"
    xs="12" 
    :loadin="loading"
  >
  <v-card
    :loading="plan.loading"
    class="mx-auto my-3 pa-2"
    max-width="374"
    outlined
    tile
    
  >
    <template slot="progress" :index="index">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>{{plan.name}}</v-card-title>
    
    <v-card-text>
      <div class="my-2 subtitle-1">
        {{plan.price}} for {{plan.duration}} {{plan.type}}
    </div>
      <div>{{plan.description}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions >
      
      <paystack
        :disabled="currentPlan == plan.id"
        :amount="parseInt(plan.price)"
        :email="email"
        :paystackkey="paystackkey"
        :reference="reference"
        :callback="callback"
        :close="close"
        :embed="false"
    >
       <v-btn
        :disabled="currentPlan == plan.id"
        color="deep-purple lighten-2"
        text
        @click="setClick(user_id, plan.id, plan.duration, plan.type);"
      >
        Reserve  <div v-if="currentPlan == plan.id" class="badge badge-info" style="margin-left:5px;"> Current</div>
      </v-btn>
    </paystack>
    
    </v-card-actions>
  </v-card>
  </v-col>

  <v-overlay :value="loading">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
  </v-row>
  
</template>

<script>
import paystack from 'vue-paystack';
export default {
    components: {
        paystack
    },
    data: () => ({
      user_id: '', 
      product_id: '', 
      sub_duration: '', 
      product_type: '',
      loading: false,
      currentPlan:'',
      email: '',
      paystackkey: "pk_test_87145b286cc6a2e8e360900cf1f6a6c91c9fcaac",
      plans:[]
    }),
    computed: {
      reference(){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
        for( let i=0; i < 10; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
 
        return text+'_'+this.user_id+'_'+this.product_id+'_'+this.sub_duration+'_'+this.product_type;
      }
    },
    methods: {
      
      setClick(user_id, product_id, sub_duration, product_type){
        this.user_id = user_id
        this.product_id = product_id
        this.sub_duration = sub_duration 
        this.product_type = product_type
      },
      callback: function(response){
        console.log(response)
        if(response.status == "success"){
          let reference = response.reference;
          let splitted = reference.split('_')
          this.loading = true
          this.axios.get('/subscription/callback/'+reference+'/'+splitted[1]+'/'+splitted[2]+'/'+splitted[3]+'/'+splitted[4],
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("id_token")
            }
          })
          .then(response => {
            this.loading = false
            console.log(response.data)
            this.$swal(response.data.message);
          }).catch(error => {
            console.log(error.response)
            this.loading = false
          })
        }else{
          alert('Transaction failed')
        }
      },
      close: function(){
          console.log("Payment closed")
      },

      getPlan () {
        this.loading = true
        this.axios.get('/product',
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("id_token")
          }
        })
        .then(response => {
          this.loading = false
          this.plans = response.data.data.data
          // console.log(response.data.data.data)
          this.loading = true
          this.axios.get('/myplan',
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("id_token")
            }
          })
          .then(response => {
            this.loading = false
            this.currentPlan = response.data.product_id
            console.log(response.data)
          }).catch(error => {
            console.log(error.response)
            this.loading = false
          })
        }).catch(error => {
          console.log(error.response)
          this.loading = false
        })
      },


    },
    mounted(){
      this.getPlan()
      this.email = this.$store.state.currentUser.user.data ? this.$store.state.currentUser.user.data.email : this.$store.state.currentUser.user.email
      this.user_id = this.$store.state.currentUser.user.data ? this.$store.state.currentUser.user.data.id : this.$store.state.currentUser.user.id

    }
  }
</script>
