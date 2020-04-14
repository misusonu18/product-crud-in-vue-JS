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
    },

    methods: {
        productButtonAdd: function() {
            if (this.productName && this.productPrice) {
                this.errors = [];
                this.productItems.push({name: this.productName,price: this.productPrice,image: this.productImage});
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
            this.productName = this.productItems[index]['name'];
            this.productPrice = this.productItems[index]['price'];
            this.productImage = this.productItems[index]['image'];
            this.productItems.splice(index,1);
            this.addProduct = false;
            this.editProduct = true;
        },

        productButtonEdit: function() {
            this.productItems.push({name: this.productName, price:this.productPrice, image:this.productImage});
            this.productName = "";
            this.productPrice = "";
            this.productImage = "";
            this.addProduct = true;
            this.editProduct = false;
        }
    }
});