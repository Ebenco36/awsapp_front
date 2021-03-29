<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <h1 class="display-1">About Page</h1>
        <p>
          This is a demo platform that show basic operations.
          This platform uses api endpoints for its operations.
          Options available are:
          <ul>
            <li>Login</li>
            <li>Register</li>
            <li>Subscription to a plan using paystack as a payment gateway</li>
            <li>Profile</li>
          </ul>

        </p>
      </v-flex>

      <v-card
        max-width="375"
        class="mx-auto"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="300px"
          dark
        >
          <v-row class="fill-height">
            <v-card-title>
              <v-card-text>
                Profile
              </v-card-text>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-12 pt-12">
              <div class="display-1 ">
                Ebenezer Oladimeji
              </div>
            </v-card-title>
          </v-row>
        </v-img>
        <v-card-text>
          <v-list two-line>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-phone
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>(081) 074 16106 </v-list-item-title>
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item>
              <v-list-item-action></v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>(081) 074 16106</v-list-item-title>
                <v-list-item-subtitle>Work</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon>mdi-message-text</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-email
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>ebenco94@gmail.com</v-list-item-title>
                <v-list-item-subtitle>Personal</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-action></v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>ebenco94@gmail.com</v-list-item-title>
                <v-list-item-subtitle>Work</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="indigo">
                  mdi-map-marker
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>1400 Main Street</v-list-item-title>
                <v-list-item-subtitle>Lagos</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>