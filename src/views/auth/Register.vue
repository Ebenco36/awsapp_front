<template>
	<v-app id="inspire">
	<v-main>
		<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 sm8 md4>
			<v-card class="elevation-12">
				<v-toolbar dark color="grey darken-4">
				<img src="@/assets/logo.png" alt="Vuetify.js" class="awsapp-logo">
				<v-spacer></v-spacer>
				
				</v-toolbar>
				<v-card-text>
                    <v-form>
                        <v-text-field  v-model="name" prepend-icon="person" name="name" label="Name" type="text"></v-text-field>
                        <v-text-field  v-model="email" prepend-icon="person" name="login" label="Login" type="email"></v-text-field>
                        <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                    </v-form>
				</v-card-text>
                <v-card-text v-if="error" >
                    <span v-for="err in error" style="color:red" :key="err[0]">
						{{err[0]}}<br/>
					</span>
				</v-card-text>
                <v-card-text v-if="message" >
                    <span>
						{{message}}
					</span>
				</v-card-text>
				<v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="login" color="primary">Register</v-btn>
				</v-card-actions>
			</v-card>
			</v-flex>
		</v-layout>
		</v-container>
        <v-overlay :value="loading">
            <v-progress-circular
            indeterminate
            size="64"
            ></v-progress-circular>
        </v-overlay>
	</v-main>
	</v-app>
</template>

<script>
    import router from '../../router'
	export default {

        props: {
            source: String
        },

		data: () => ({
            loading:false,
            name: '',
			email: '',
			password: '',
			drawer: null,
			loginTrue: false,
            error: '',
            message: ''
		}),
        methods: {
            login () {
                this.loading = true
                let formData = new FormData()
                formData.append('name', this.name)
                formData.append('email', this.email)
                formData.append('password', this.password)
				this.axios.post('/register',formData, 
                    {
                        headers: 
                            {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                    )
                .then(response => {
                    this.loading = false
                    
                    if (response.data.status == true) {
                        this.message = response.data.message
                        router.push('login')
                    } else {
                        if(response.data.status == false){
                            this.message = response.data.message
                        }else{
                            this.error = response.data.error
                        }
                    }
                })
                .catch(error => {
                    this.loading = false
                    this.error = error
                    console.log(error)

                })
			},
			checkOut () {
				/* eslint-disable */
				if (!this.password || this.password === "") {
					this.loginTrue = true
				}
                else if (!this.email || this.email === "") {
					this.loginTrue = true
				}
				else if (!this.name || this.name === "") {
					this.loginTrue = true
				}
				else {
					this.loginTrue = false
				}
			}
		},

		computed: {

			token () {
				return this.$store.state.currentUser.token
			}
		},

		watch: {
			name () {
				this.checkOut()
			},
			password () {
				this.checkOut()
			}
		}
	}
</script>

<style scoped>
	.esar-logo {
		width: 170px;
		margin-left: 10px;
		margin-right: 10px;
	}
</style>

