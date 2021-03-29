<template>
   
    <div>
        <div class="card" align="center">
            <img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg" alt="John" style="width:100%">
            <h1>{{currentPlan.user ? currentPlan.user.name : ''}}</h1>
            <p class="title">{{currentPlan.user ? currentPlan.user.email : ''}}</p>
            <p align="left" style="margin-left:50px;">
                    Plan Name: {{currentPlan.product ? currentPlan.product.name : ''}} <br/>
                    Price: {{currentPlan.product ? currentPlan.product.price : ''}}<br/>
                    Duration: {{currentPlan.product ? currentPlan.product.duration : ''}}<br/>
                    From: {{currentPlan ? currentPlan.from : ''}}<br/>
                    To: {{currentPlan ? currentPlan.to : ''}}<br/>
            </p>
        </div>
        <v-overlay :value="loading">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
    export default {
        data: () =>({
            loading: false,
            currentPlan: []
        }),
        methods:{
            loadPlan(){
                this.loading = true
                this.axios.get('/myplan',
                {
                    headers: {
                    Authorization: "Bearer " + localStorage.getItem("id_token")
                    }
                })
                .then(response => {
                    this.loading = false
                    this.currentPlan = response.data
                    console.log(response.data)
                }).catch(error => {
                    console.log(error.response)
                    this.loading = false
                })
            }
        },
        mounted(){
            this.loadPlan()
        }
    }
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 22px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}
</style>