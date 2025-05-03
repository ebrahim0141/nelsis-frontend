<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link class="r" to="add">Add Product</router-link>
        <a class="c" v-on:click="logout" href="#">Logout</a>
    </div>
</template>

<script>
export default{
    name:"HeaderPage",
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push({name:'Login'})
        }
    }
}
</script>
<style>
.nav{
    background-color: #333;
    overflow: hidden;
}
.nav a {
    float: left;
    color: #f2f2f2f2;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}
.nav a:hover{
    background: #ddd;
    color: #333;
}
.c {
  position: absolute;
  right: 15px;
} 

.r {
  position: absolute;
  right: 100px;
} 
</style>