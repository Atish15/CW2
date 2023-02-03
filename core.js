
let webstore = new Vue({
    el: '#app', // mounting point selector, ID

    data: {
        product:[],
        name:'',
        phonenumber:'',
        infocheckresult:false,
        cart: [],
        result:[],
        resultpage:false,
        subject:false,
        location:false,
        price:false,
        availability:false,
        ascending:false,
        descending:false,
        searchtext:'',
        cartpage:false,
        cartreduce:0,
        cartanother:[]
    },
    created:function(){
         fetch("http://localhost:3000/products")
            .then(function (response){
                response.json().then(
                    function (json){
                        //console.log(json);
                        webstore.product=json;
                    });});
         },

    methods: {
        addClass(prod) {
            prod.numberOfSpaces=prod.numberOfSpaces-1;
            this.cart.push(prod);
        },
        cartout() {
            if(this.cartpage) {
                this.cartpage = false;
            }
            else{
                this.cartpage = true;
            }
            for (let i = 0; i < this.cart.length; i++) {
                if(this.cartanother.includes(this.cart[i])){
                    continue;
                }
                else{
                    this.cartanother.push(this.cart[i]);
                }
            }

        },
        show(){
            if(this.searchtext.length==0){
                this.resultpage=false;
            }
            else {
                this.result = [];
                //console.log(webstore.searchtext)
                fetch("http://localhost:3000/products/search?q="+webstore.searchtext).then(function(response){
                    response.json().then(function (json){
                        webstore.resultpage = true;
                            webstore.result=json;});});




                /*let resultfound= false;
                for (let count = 0; count < this.product.length; count++) {
                    if ((this.product[count].subject).toLowerCase().includes(this.searchtext.toLowerCase())){
                        this.result.push(this.product[count]);
                        this.resultpage = true;
                        resultfound=true;

                    }

                    if ((this.product[count].location.toLowerCase()).includes(this.searchtext.toLowerCase()) && !(this.product[count].subject.toLowerCase()).includes(this.searchtext.toLowerCase())){
                        this.result.push(this.product[count]);
                        this.resultpage = true;
                        resultfound=true;

                    }

                }
                if (resultfound==false){
                    this.result=[]
                    this.resultpage=false;

                }*/

            }},



        cartItemCount:function (prod) {
            let c=0;
            for(let i = 0;i<this.cart.length; i++){
                if (prod==this.cart[i]) {
                    c=c+1;
                }
            }
            return c;

        },
        CartItemCount:function (prod) {
            let c=0;
            for(let i = 0;i<this.cart.length; i++){
                if (prod==this.cart[i].id) {
                    c=c+1;
                }
            }
            return c;

        },
        prodItemCount:function (prod) {
            let c=0;
            for(let i = 0;i<this.product.length; i++){
                if (prod==this.product[i].id) {
                    return  this.product[i].numberOfSpaces;
                }
            }
            return 0;

        },

       remove:function(prod){
           for(let i = 0;i<this.cart.length; i++){
               if (prod==this.cart[i] ) {
                   console.log("good");
                   this.cart.splice(i, 1);
                   prod.numberOfSpaces++;
               }
           }



       },
       tosort:function(){

            if (this.subject==true && (this.location==false) && (this.price==false) && (this.availability==false) && ((this.ascending==true) && (this.descending==false)) ){
                this.product.sort(function (a, b) {
                    if (b.subject.charAt(0) > a.subject.charAt(0))
                        return -1;
                    if (b.subject.charAt(0) < a.subject.charAt(0))
                        return 1;
                    return 0;
                });
                this.setall;
            }
           if (this.subject==true && (this.location==false) && (this.price==false) && (this.availability==false) && ((this.ascending==false) && (this.descending==true)) ){
               this.product.sort(function (a, b) {
                   if (b.subject.charAt(0) < a.subject.charAt(0))
                       return -1;
                   if (b.subject.charAt(0) > a.subject.charAt(0))
                       return 1;
                   return 0;
               });
               this.setall;
           }
           if (this.subject==false && (this.location==true) && (this.price==false) && (this.availability==false) && ((this.ascending==true) && (this.descending==false)) ){
               this.product.sort(function (a, b) {
                   if (b.location.charAt(0) > a.location.charAt(0))
                       return -1;
                   if (b.location.charAt(0) < a.location.charAt(0))
                       return 1;
                   return 0;
               });
               this.setall;
           }
           if (this.subject==false && (this.location==true) && (this.price==false) && (this.availability==false) && ((this.ascending==false) && (this.descending==true)) ) {
               this.product.sort(function (a, b) {
                   if (b.location.charAt(0) < a.location.charAt(0))
                       return -1;
                   if (b.location.charAt(0) > a.location.charAt(0))
                       return 1;
                   return 0;
               });
               this.setall;
           }
           if (this.subject==false && (this.location==false) && (this.price==false) && (this.availability==true) && ((this.ascending==true) && (this.descending==false)) ){
               this.product.sort(function (a, b) {
                   return (a.numberOfSpaces) - (b.numberOfSpaces);
               });
               this.setall;
           }
           if (this.subject==false && (this.location==false) && (this.price==false) && (this.availability==true) && ((this.ascending==false) && (this.descending==true)) ){
               this.product.sort(function (a, b) {
                   return (b.numberOfSpaces) - (a.numberOfSpaces);
               });

               this.setall;
           }
               if (this.subject==false && (this.location==false) && (this.price==true) && (this.availability==false) && ((this.ascending==true) && (this.descending==false)) ){
                   this.product.sort(function (a, b) {
                       return parseFloat(a.price) - parseFloat(b.price);
                   });
                   this.setall;
               }
               if (this.subject==false && (this.location==false) && (this.price==true) && (this.availability==false) && ((this.ascending==false) && (this.descending==true)) ){
                   this.product.sort(function (a, b) {
                       return parseFloat(b.price) - parseFloat(a.price);
                   });

               this.setall;
           }

           this.setall;

       },


        infocheck:function(){
       if(this.name.length!=0 && this.phonenumber.length!=0){
        if(/^[A-Za-z]+$/.test(this.name)&& /^[0-9]+$/.test(this.phonenumber)){
            this.infocheckresult=true;
        }
        else{
            this.infocheckresult=false;
        }}
            console.log(this.name);
            console.log(this.phonenumber);


        },

        finishcart:function(){
            alert("order has been placed.")
            let newArr=[];
            for(let count=0;count<this.cartanother.length;count++){
                let carr=this.cartanother[count];
               let newData={id:carr.id,subject:carr.subject,sold:this.cartItemCount(carr)}
                newArr.push(newData)
            }
           let clientInfo={
               name: this.name,
               number: this.phonenumber,
               products:newArr

           }

            fetch("http://localhost:3000/orders",{
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify(clientInfo)}).then(function(response){
                response.text().then(function (text){});});

            for(let count=0;count<this.cartanother.length;count++) {
                let carr=this.cartanother[count];
                console.log(webstore.prodItemCount(carr.id))
                console.log(webstore.CartItemCount(carr.id))
                fetch("http://localhost:3000/products/" + carr.id, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json",}, body: JSON.stringify(
                        {"numberOfSpaces": webstore.prodItemCount(carr.id)})}).then(function (response) {
                    response.text().then(function (text) {});});
            }
//-webstore.CartItemCount(carr.id)
            this.cartpage=false;
            this.cart=[];
            this.cartanother=[];

        },


    },

    computed: {

         setall(){
             this.location=false;
             this.subject=false;
             this.price=false;
             this.availability=false;
             this.ascending=false;
             this.descending=false;
         },
        canAddClass() {
            return this.product.numberOfSpaces > this.cartItemCount;
        }
    }

});