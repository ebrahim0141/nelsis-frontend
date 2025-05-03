<template>
  <div class="register">
    <h1>Sign Up</h1>
    <input type="text" v-model="name" placeholder="Enter Name">
    <input type="text" v-model="email" placeholder="Enter Email">
    <input type="password" v-model="password" placeholder="Enter Password">
    <input type="password_confirmation" v-model="password_confirmation" placeholder="Confirm Password">
    <button v-on:click="SignUp">Sign Up</button>
    <p>
      <router-link to="/login">Login</router-link>
    </p>
  
  </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    name: 'App',
    data()
      {
        return {
          name:'',
          email:'',
          password:'',
          password_confirmation:''
        }
      },
      methods:{
         async SignUp()
          {
            let result = await axios.post("http://localhost:8000/api/auth/register",{
                name:this.name,
                email:this.email,
                password:this.password,
                password_confirmation:this.password_confirmation
            })
            console.log(result)
            if (result.status==201) {
                localStorage.setItem("user-info",JSON.stringify(result.data))
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
  

  