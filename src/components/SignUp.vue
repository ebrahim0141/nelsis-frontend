<template>
  <div class="register">
    <h1>Sign Up</h1>
    <input type="text" v-model="name" placeholder="Enter Name" >
    <input type="text" v-model="email" placeholder="Enter Email" >
    <input type="password" v-model="password" placeholder="Enter Password" >
    <input 
    type="password_confirmation" 
    v-model="password_confirmation" 
    placeholder="Confirm Password"
    >
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
          errors: {},
          name:'',
          email:'',
          password:'',
          password_confirmation:'',
          nameRules: [(v) => !!v || "Name is required"],
          emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+/.test(v) || "E-mail must be valid",
          ],
          passwordRules: [
            (v) => !!v || "password is required",
            (v) => (v && v.length > 5) || "minimum 6 characters",
          ],
        }
      },
      methods:{
        validate() {
          this.errors = {};
          if (!this.name) this.errors.name = 'Name is required.';
          if (!this.email) this.errors.email = 'Email is required.';
          if (!this.password) this.errors.password = 'Email is required.';
          else if (!/\S+@\S+\.\S+/.test(this.email))
            this.errors.email = 'Email is invalid.';
          return Object.keys(this.errors).length === 0;
        },
        
         async SignUp()
          {
            if (this.validate()) {
              let result = await axios.post("http://localhost:8000/api/auth/register",{
                  name:this.name,
                  email:this.email,
                  password:this.password,
                  password_confirmation:this.password_confirmation
              })
              if (result.status==201) {
                // console.log(result)
                  this.$router.push({name:"Login"});
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
  

  