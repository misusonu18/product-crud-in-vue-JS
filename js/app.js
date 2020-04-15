var app = new Vue({
    el: "#product",
    data: {
        productName: "",
        productPrice: "",
        productItems: [],
        addProduct: true,
        editProduct: false,
        productImage: "",
        errors: [],
        productId: "0",
        id: "",
        arrayIndex: "",
    },

    methods: {
        productButtonAdd: function() {
            if (this.productName && this.productPrice) {
                this.productId = parseInt(this.productId) + 1;
                this.errors = [];
                this.productItems.push({id: this.productId,name: this.productName,price: this.productPrice,image: this.productImage});
                this.productPrice = "";
                this.productName = "";
                this.productImage = "";
            }
            else{
                this.errors = [];
                
                if (!this.productName) {
                    this.errors.push("Name Required....");
                }
                
                if (!this.productPrice) {
                    this.errors.push("Price Required....");
                }

                if (!this.productImage) {
                    this.errors.push("Image Required....");
                }
            }
        },

        deleteButton: function(index){
            this.productItems.splice(index,1);
        },

        editButton: function(index) {
            this.arrayIndex = index;
            this.id = this.productItems[index]['id'];
            this.productName = this.productItems[index]['name'];
            this.productPrice = this.productItems[index]['price'];
            this.productImage = this.productItems[index]['image'];
            this.addProduct = false;
            this.editProduct = true;
        },

        productButtonEdit: function() {
            Vue.set(this.productItems, this.arrayIndex, {id:this.id, name:this.productName, price:this.productPrice, image:this.productImage});
            this.productName = "";
            this.productPrice = "";
            this.productImage = "";
            this.addProduct = true;
            this.editProduct = false;
        }
    }
});