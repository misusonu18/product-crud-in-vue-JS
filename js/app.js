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
        cartItems: [],
        cartCheckVariable: "",
        cartCheckQuantity: "",
        subTotal: "",
        shippingCharge: "",
        discountAmount: "",
        total: "",
        tax: "",
        payable: "",
    },
    created() {
        this.totalAmountDisplay();
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
        },

        addProductCartQuantity: function(index) {
            let cartProductName = this.cartItems[index]['name'];
            let cartProductPrice = this.cartItems[index]['price'];
            let cartProductImage = this.cartItems[index]['image'];
            let cartProductQuantity = this.cartItems[index]['quantity'] + 1;

            Vue.set(this.cartItems, index, {name:cartProductName, price:cartProductPrice, image:cartProductImage, quantity:cartProductQuantity});
            this.totalAmountDisplay();
        },

        subtractProductCartQuantity: function(index) {
            let cartProductName = this.cartItems[index]['name'];
            let cartProductPrice = this.cartItems[index]['price'];
            let cartProductImage = this.cartItems[index]['image'];
            let cartProductQuantity = this.cartItems[index]['quantity'] - 1;

            this.cartItems.filter(obj => {
                if (obj.name === cartProductName) {
                    this.cartCheckQuantity = obj.quantity;
                }
            });
            if (this.cartCheckQuantity <= 1) {
                this.cartItems.splice(index,1);
            }
            else {
                Vue.set(this.cartItems, index, {name:cartProductName, price:cartProductPrice, image:cartProductImage, quantity:cartProductQuantity});
            }
            this.totalAmountDisplay();
        },

        deleteProductCart: function(index) {
            this.cartItems.splice(index,1);
            this.totalAmountDisplay();
        },

        totalAmountDisplay: function() {
            if (this.cartItems.length) {
                this.subTotal = 0;
                for (let i = 0; i < this.cartItems.length; i++) {
                    this.subTotal += this.cartItems[i].quantity * this.cartItems[i].price;
                }
                this.shippingCharge = this.subTotal < 1000 ? 100 : 0;
                this.total = parseInt(this.shippingCharge) + parseInt(this.subTotal);
                this.tax = 18;
                this.payable = parseInt(this.total) + parseInt(this.tax);
            }
            
        },
        addToCartButton: function(index) {
            let cartProductName = this.productItems[index]['name'];
            let cartProductPrice = this.productItems[index]['price'];
            let cartProductImage = this.productItems[index]['image'];
            let cartProductQuantity = 1;

            this.cartItems.filter(obj => {
                if (obj.name === cartProductName) {
                    this.cartCheckVariable = obj.name;
                }
            });

            if (this.cartCheckVariable) {
                for (i=0; i < this.cartItems.length; i++) {
                  if (this.cartItems[i].name == this.cartCheckVariable) {
                      var tempCartProductQuantity = this.cartItems[i].quantity + 1;
                      Vue.set(this.cartItems, i, {name:cartProductName, price:cartProductPrice, image:cartProductImage, quantity:tempCartProductQuantity});
                  }
                }
                this.cartCheckVariable = "";
            }
            else {
                this.cartItems.push(
                    {
                        name:cartProductName,
                        price:cartProductPrice,
                        image:cartProductImage,
                        quantity:cartProductQuantity
                    }
                )
            }
            this.totalAmountDisplay();
        },
    },
});