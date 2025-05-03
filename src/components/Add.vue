<template>
    <Header></Header>
    <h1>Add page</h1>
    <form action="" class="add">
        <input v-model="product.name" type="text" name="name" placeholder="Product Name">
        <input v-model="product.description" type="text" name="description" placeholder="Product Description">
        <input v-model="product.price" type="text" name="price" placeholder="Product Price">
        <button type="button" v-on:click="add">Add New Product</button>
    </form>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
export default{
    name:'Add-page',
    components:{
        Header,
    },
    data()
    {
        return {
            product:{
                name:'',
                description:'',
                price:''
            }
        }
    },
    
    methods:{
        async add(){

            const string_token = window.localStorage.getItem("user-info");
            var token = string_token.slice(1,-1);

            if (token != null) {
              let result = await axios
                .post(`${"http://localhost:8000/api/auth"}/${"store-product"}`, this.product, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                })
                console.log(result)
                if (result.status==200) {
                    this.$router.push({name:"Home"});
                }
            }
            
        }
    },
    mounted(){
          
        let user = localStorage.getItem("user-info");
        if(!user){
        this.$router.push({name:"SignUp"});
        }
    }
}
</script>