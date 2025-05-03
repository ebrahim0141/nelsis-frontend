<template>
    <div class="login">
    <h1>Login</h1>
    <input type="text" v-model="email" placeholder="Enter Email">
    <input type="password" v-model="password" placeholder="Enter Password">
    <button v-on:click="Login">Login</button>
    <p>
      <router-link to="/sign-up">Sign Up</router-link>
    </p>
  
  </div>
</template>

<script>
import axios from 'axios';
export default{
    name:"LoginPage",
    data()
      {
        return {
          email:'',
          password:''
        }
      },

      methods:{
        async Login(){
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
      },
      mounted(){
          
          let user = localStorage.getItem("user-info");
          if(user){
            this.$router.push({name:"Home"})
          }
        }
    
}
</script>