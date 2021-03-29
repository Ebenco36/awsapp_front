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
                        <v-text-field  v-model="email" prepend-icon="person" name="login" label="Login" type="email"></v-text-field>
                        <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                    </v-form>
				</v-card-text>
				<v-card-actions>
					<v-card-text v-if="loginTrue" >
						<span style="color:red">
							Username or password is incorrect
						</span>
					</v-card-text>
					<v-card-text v-if="error" >
						<span style="color:red">
							{{error}}
						</span>
					</v-card-text>
                    <v-spacer></v-spacer>
                    <v-btn @click="login" color="primary">Login</v-btn>
					
					
				</v-card-actions>
				<v-card-text>
					Don't have an account?
					<v-list-item
						to="/register"
						name="Register"
						link
						class="itemss"
						style="font-size:10pt; color:blue!important;"
					>
						Register
					</v-list-item>
				</v-card-text>
			</v-card>
			</v-flex>
		</v-layout>
		</v-container>
	</v-main>
	</v-app>
</template>

<script>
	export default {

        props: {
            source: String
        },

		data: () => ({
			email: '',
			password: '',
			drawer: null,
			loginTrue: false
		}),
        methods: {
            login () {
				this.$store.dispatch('currentUser/loginUser', {email: this.email, password: this.password})
			},
			checkOut () {
				/* eslint-disable */
				if (!this.password || this.password === "") {
					this.loginTrue = true
				}
				else if (!this.email || this.email === "") {
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
			},
			error: {
				get () {
					return this.$store.state.currentUser.error
				}
			}
		},

		watch: {
			email () {
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

