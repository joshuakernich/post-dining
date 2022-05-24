


function makeDescription(LitresPerKG,WDPerGram,grams){
  return ""+LitresPerKG+" Litres per kg | "+grams+"g at <wd></wd>"+WDPerGram+" per gram"
}

var layers = [
  {
    title:"Select your <b>Carbohydrate</b>",
    short: "Carbohydrate",
    list:[
      {name:"Wheat bun with sesame",  isABurger:true, wd:120,   d:makeDescription(2000,2,60),      img:'./ing/burger0018.png', top:'./ing/burger0015.png', bottom:'./ing/burger0012.png'},
      {name:"Dark Rye",               isABurger:true, wd:90,    d:makeDescription(1500,1.5,60),    img:'./ing/burger0017.png', top:'./ing/burger0014.png', bottom:'./ing/burger0011.png'},
      {name:"Native Millet",          isABurger:true, wd:72,    d:makeDescription(1200,1.2,60),    img:'./ing/burger0016.png', top:'./ing/burger0013.png', bottom:'./ing/burger0010.png'},
    ]
  },{
    title:"Select your <b>Protein</b>",
    short: "Protein",
    list:[
      {name:"Kangaroo",               wd:300,   d:makeDescription(3000,3,100),      img:'./ing/burger0003.png'},
      {name:"Beef",                   wd:1500,   d:makeDescription(15000,15,100),   img:'./ing/burger0001.png'},
      {name:"Chickpea lentil",        wd:240,   d:makeDescription(2000,2,120),      img:'./ing/burger0002.png'},
    ]
  },{
    title:"Select your <b>Vegetable</b>",
    short: "Vegetable",
    list:[
      {name:"Lettuce",                wd:1.33,   d:makeDescription(133,0.133,10),      img:'./ing/burger0007.png'},
      {name:"Tomato",                 wd:32.1,   d:makeDescription(214,0.214,150),      img:'./ing/burger0009.png'},
      {name:"Tomato sauce",           wd:5.40,   d:makeDescription(270,0.270,20),      img:'./ing/burger0008.png'},
    ]
  },{
    title:"Select your <b>Calcium</b>",
    short: "Calcium",
    list:[
      {name:"Cow’s milk cheddar",       wd:112,   d:makeDescription(4000,4,28),      img:'./ing/burger0004.png'},
      {name:"Camel’s milk cheddar ",    wd:28,    d:makeDescription(1000,1,28),      img:'./ing/burger0005.png'},
      {name:"Fortified vegan cheddar",  wd:224,   d:makeDescription(8000,8,28),      img:'./ing/burger0006.png'},
    ]
  },{
    title:"Select your <b>Healthy Fat</b>",
    short: "Fat",
    list:[
      {name:"Garlic and herb Aioli ",     wd:40,   d:makeDescription(2000,2,20),      img:'./ing/aioli.png'},
      {name:"Avocado",                    wd:17,    d:makeDescription(849,0.849,20),      img:'./ing/avo.png'},
      {name:"Hommus",                     wd:54,   d:makeDescription(2700,2.70,20),      img:'./ing/hommus.png'},
    ]
  }
]

DATA.sequence = [
  {type:'screen-herald', copy:'<img src="./img/burger-bar.png"><br>Welcome to the<br>Water Dollar Burger Bar'},
  {type:'screen-lecture', copy:'<p>Hello there,</p>\
<p>Welcome to the Burger Bar. Instead of using Australian Dollars, everything here is priced by its Water Footprint.</p>\
<p>Today, you are granted the privilege to build your own burger. However, you must choose wisely, as you only have 400 Water Dollars to spend on your selection of Go, Grow and Glow foods.</p>\
<p>Good luck, and choose responsibly!</p>'},
  {type:'screen-shop', layers:layers, alloc:400 },
  {type:'screen-herald', copy:'Thankyou for making choices that support a fair water distribution for all.'},
]

DATA.isMuted = true;









