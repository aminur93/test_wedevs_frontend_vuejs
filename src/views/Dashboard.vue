<template>
    <div id="dashboard">

        <v-container class="my-5">
            <v-row>
                <v-col cols="12">
                    <v-card style="background-color: #f5f5f5">
                        <v-row>
                            <v-col col="6">
                                <v-card-title>Products</v-card-title>
                            </v-col>

                            <v-col cols="6">
                                <v-card-actions class="justify-end">
                                    <v-btn text color="success" v-on:click="openAdd">
                                        <v-icon small left>mdi-plus</v-icon>
                                        <span>Add New</span>
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>

                        <v-divider></v-divider>

                        <v-card-text>
                            <v-card-title>
                                All Product List
                                <v-spacer></v-spacer>
                                <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Search"
                                        single-line
                                        hide-details
                                        class="mb-5"
                                ></v-text-field>
                            </v-card-title>

                            <v-data-table :headers="headers" :items="products" :search="search"  class="elevation-1">

                                <template v-slot:item.image="{item}">
                                    <span v-if="item.image != null">
                                        <img :src="showImage(item.image)" alt="" width="100px">
                                    </span>

                                    <span v-else>
                                        <p>No Image</p>
                                    </span>
                                </template>

                                <template v-slot:item.actions="{ item }">

                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn small text color="grey" v-on="on" v-on:click="editOpen(item)">
                                                <v-icon left small>mdi-pencil</v-icon>
                                                <span right class="caption text-lowercase">Edit</span>
                                            </v-btn>
                                        </template>
                                        <span>Edit</span>
                                    </v-tooltip>

                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn small text color="grey" v-on="on" @click="deleteProduct(item.id)">
                                                <v-icon left small>mdi-delete</v-icon>
                                                <span right class="caption text-lowercase">Delete</span>
                                            </v-btn>
                                        </template>
                                        <span>Delete</span>
                                    </v-tooltip>

                                </template>

                            </v-data-table>
                        </v-card-text>

                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>

                    <v-card-title v-if="!editMode"><span id="add" class="headline">Add Products</span></v-card-title>
                    <v-card-title v-if="editMode"><span id="edit" class="headline">Update Products</span></v-card-title>
                    <v-divider></v-divider>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-form ref="form" v-on:submit.prevent=" editMode ? updateProduct() : addProducts()" v-model="isValid">

                                        <v-text-field type="text" :rules="[v => !!v || 'Title is required']" v-model="productData.title" label="Title"></v-text-field>

                                        <v-textarea type="text" :rules="[v => !!v || 'Description is required']" v-model="productData.description" label="Description"></v-textarea>

                                        <v-text-field type="number" :rules="[v => !!v || 'Price is required']" v-model="productData.price" label="Price"></v-text-field>

                                        <v-file-input type="file" :rules="[v => !!v || 'Image is required']" v-on:change="onSelectdFiles"  prepend-icon="mdi-camera" label="Image"></v-file-input>


                                       <span v-if="editMode" class="ml-2">
                                            <img v-if="this.product_image" :src="productData.image" alt="" width="150px">
                                             <span v-if="this.product_image">
                                                 <v-btn text small class="red lighten-1 ml-2" style="margin-top: -22px" v-on:click="deleteImage()">
                                                    <v-icon>mdi-alpha-x</v-icon>
                                                </v-btn>
                                            </span>
                                        </span>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                                            <v-btn type="submit" :disabled="!isValid" color="blue darken-1" text>Save</v-btn>
                                        </v-card-actions>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: "Dashboard",
        data(){
            return{
                productData: {
                    title: '',
                    description: '',
                    price: '',
                    image: null,
                },

                isValid: true,

                search: '',
                dialog: false,
                editMode: false,
                product_id: '',
                product_image: '',

                errors: {},
            }
        },
        computed: {
            headers(){
                return[
                    {text: '#Sl', value:'id',  align: 'start', sortable: false},
                    {text: 'Image', value: 'image', sortable: false},
                    {text: 'Title', value:'title'},
                    {text: 'Description', value:'description'},
                    {text: 'Price', value:'price'},
                    { text: 'Actions', value: 'actions', align: 'center', sortable: false },
                ]
            },

            ...mapState({
                products: state => state.products.products
            }),
        },

        mounted(){
            this.getAllProducts();
        },

        methods: {
            ...mapActions({
                getAllProducts: 'products/get_all_products'
            }),

            openAdd(){
                this.dialog = true;
                this.editMode = false;
                this.productData = {};
            },

            closeAdd(){
                this.dialog = false;
                this.editMode = false;
                this.productData = {};
            },

            onSelectdFiles(event){
                this.productData.image = event;
            },

            addProducts: async function(){
                try {
                    let formData = new FormData();
                    formData.append('title', this.productData.title);
                    formData.append('description', this.productData.description);
                    formData.append('price', this.productData.price);
                    formData.append('image', this.productData.image, this.productData.image.name);

                    await this.$store.dispatch('products/add_products', formData).then(() => {

                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product Added Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.closeAdd();

                        this.getAllProducts();

                        this.productData = {};

                        this.$refs.form.resetValidation()
                    });

                }catch (error) {
                    console.log(error);
                    // switch (error.response.status)
                    // {
                    //     case 422:
                    //         this.errors = error.response.data.errors;
                    //         break;
                    //
                    //     default:
                    //         this.errors = error.response.data.message;
                    //         break;
                    // }
                }
            },

            showImage(img){
                let server_Path = this.$store.state.serverPath;
                return server_Path + "/assets/uploads/small/"+img;
            },

            deleteProduct: async function(id){
                try {
                    await this.$store.dispatch('products/delete_product', id).then(()=>{
                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product Deleted Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getAllProducts();
                    });
                }catch (e) {
                    console.log(e);
                }
            },

            editOpen(products)
            {

                this.editMode = true;

                this.dialog = true;

                this.productData.title = products.title;
                this.productData.description = products.description;
                this.productData.price = products.price;
                this.productData.image = this.showImage(products.image);

                this.product_id = products.id;
                this.product_image = products.image;
            },

            updateProduct: async function(){
                try {
                    let id = this.product_id;
                    let formData = new FormData();
                    formData.append('title',  this.productData.title);
                    formData.append('description',  this.productData.description);
                    formData.append('price',  this.productData.price);
                    formData.append('image',this.productData.image,  this.productData.image.name);
                    formData.append('current_image', this.productData.image);

                    await this.$store.dispatch('products/update_product', {id:id, data:formData}).then(() => {

                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product Updated Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.closeAdd();

                        this.getAllProducts();

                        this.productData = {};

                        this.$refs.form.resetValidation()
                    });
                }catch (e) {
                    console.log(e)
                }
            },

            deleteImage: async function(){
                try {

                    await this.$store.dispatch('products/delete_image',  this.product_id).then(() => {
                        this.$swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Product Image Deleted Successful',
                            showConfirmButton: false,
                            timer: 1500
                        });

                        this.getAllProducts();
                        this.editMode = false;
                        this.$refs.form.resetValidation()
                    });

                }catch (e) {
                    console.log(e);
                }
            },
        }
    }
</script>

<style scoped>

</style>