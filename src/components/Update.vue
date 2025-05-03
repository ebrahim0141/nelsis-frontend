<template>
    <Header></Header>
    <h1>Update page</h1>
    <form action="" class="add">
        <input v-model="product.name" type="text" name="name" placeholder="Product Name">
        <input v-model="product.description" type="text" name="description" placeholder="Product Description">
        <input v-model="product.price" type="text" name="price" placeholder="Product Price">
        <button type="button" v-on:click="update">Update Product</button>
    </form>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
export default{
    name:'Update-page',
    components:{
        Header,
    },
    data()
    {
        return {
            product:{
                id:'',
                name:'',
                description:'',
                price:''
            }
        }
    },
    methods:{
        async update(){
            // console.log(this.product)
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
    async mounted(){
          
        let user = localStorage.getItem("user-info");
        if(!user){
        this.$router.push({name:"SignUp"});
        }

        const string_token = window.localStorage.getItem("user-info");
        var token = string_token.slice(1,-1);

        if(token !=null)
        {
            let result = await axios
            .get(`${"http://localhost:8000/api/auth"}/${"product"}/${this.$route.params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            })
            if (result.status==200) {
                this.product.id=result.data.data.id
                this.product.name=result.data.data.name
                this.product.description=result.data.data.description
                this.product.price=result.data.data.price
            }
            // console.warn(result.data.data.id)
        }
        
    }
}
</script>