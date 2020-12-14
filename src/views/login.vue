<template>
    <div id="login">

        <v-container>

            <v-row wrap>
                <v-col cols="12" md="6"  offset-md="3">
                    <v-card>
                        <v-card-title class="justify-center">Login</v-card-title>
                        <span class="red--text">{{ errors.message }}</span>

                        <v-divider></v-divider>

                        <v-card-text>
                            <v-form v-on:submit.prevent="Userlogin">
                                <v-text-field label="Email" v-model="login.email" prepend-icon="mdi-email"></v-text-field>
                                <span v-if="errors.email" class="red--text">{{errors.email[0]}}</span>

                                <v-text-field type="password" label="Password" v-model="login.password" prepend-icon="mdi-lock"></v-text-field>
                                <span v-if="errors.password" class="red--text">{{errors.password[0]}}</span>

                                <v-row>
                                    <v-col col="4" md="4">
                                        <v-btn type="submit" text class="success float-right">Login</v-btn>
                                    </v-col>

                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                login: {
                    email: '',
                    password: ''
                },

                errors: {},
            }
        },
        
        methods: {
            Userlogin: async function(){
                try {
                    let formData = new FormData();
                    formData.append('email', this.login.email);
                    formData.append('password', this.login.password);

                    await this.$store.dispatch('login', formData).then(()=>{
                         this.$router.push({ path: '/home' });
                    });

                    this.login={};
                }catch (error) {
                    switch (error.response.status)
                    {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;

                        default:
                            this.errors = error.response.data.message;
                            break;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .container{
        margin-top: 100px;
    }
</style>