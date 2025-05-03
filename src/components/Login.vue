<template>
    <div class="login">
    <h1>Login</h1>
    <input type="text" v-model="email" placeholder="Enter Email">
    <input type="password" v-model="password" placeholder="Enter Password">
    <button v-on:click="Login">Login</button>
    <!-- <p>
      <router-link to="/sign-up">Sign Up</router-link>
    </p> -->
  
  </div>
</template>

<script>
import axios from 'axios';
export default{
    name:"LoginPage",
    data()
      {
        return {
          errors: {},
          email:'',
          password:''
        }
      },

      methods:{
        validate() {
          this.errors = {};
            if (!this.email) this.errors.email = 'Email is required.';
            if (!this.password) this.errors.password = 'Email is required.';
            else if (!/\S+@\S+\.\S+/.test(this.email))
              this.errors.email = 'Email is invalid.';
            return Object.keys(this.errors).length === 0;
          },
        async Login(){
          if (this.validate()) {
            let result = await axios.post("http://localhost:8000/api/auth/login",{
                email:this.email,
                password:this.password,
            })
            console.log(result)
            if (result.status==200) {
                localStorage.setItem("user-info",JSON.stringify(result.data.access_token))
                this.$router.push({name:"Home"});
            }
          }
        }
      },
      mounted(){
          
          let user = localStorage.getItem("user-info");
          if(user){
            this.$router.push({name:"Home"})
          }
        }
    
}
</script>