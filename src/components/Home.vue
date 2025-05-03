<template>
    <Header></Header>
    <h1>Home page</h1>
    <table border="1" class="center">
        <tr class="text">
            <td>Name</td>
            <td>Description</td>
            <td>Price</td>
            <td>Action</td>
        </tr>
        <tr v-for="item in products" :key="item.id">
           
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}</td>
            <td>
            <router-link :to="'/update/'+item.id">Update</router-link>
            <button style="margin-left: 5px;" @click="deleteProduct(item.id)">Delete</button>
            </td>
        </tr>
    </table>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue';
export default{
    name:'Home-page',
    data(){
        return {
            name:'',
            products:[],
        }
    },
    components:{
        Header,
    },

    methods:{
        async deleteProduct(id){
            const string_token = window.localStorage.getItem("user-info");
            if (string_token !=null) {
                var token = string_token.slice(1,-1);
                let result = await axios.delete(`${"http://localhost:8000/api/auth/delete"}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                if(result.status==200){
                    this.loadData()
                }
            }
        },
        async loadData(){
            let user = localStorage.getItem("user-info");
            if(!user){
            this.$router.push({name:"SignUp"});
            }
            const string_token = window.localStorage.getItem("user-info");
            if (string_token !=null) {
                var token = string_token.slice(1,-1);
                let result = await axios.get(`${"http://localhost:8000/api/auth"}/${"all-product"}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

            this.products = result.data.datas;
            console.warn(result.data.datas);
            }
        }
    },
    async mounted(){
          
        this.loadData()
    }
}
</script>

<style>
td {
    width: 260px;
    height: 40px;
}
.center {
  margin-left: auto;
  margin-right: auto;
}
.text {
    font-weight: bold;
}
</style>