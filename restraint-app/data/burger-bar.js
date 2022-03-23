


function makeDescription(LitresPerKG,WDPerGram,grams){
  return ""+LitresPerKG+" Litres per kg | "+grams+"g at <wd></wd>"+WDPerGram+" per gram"
}

intro = "<p>Hello there,</p>\
<p>Welcome to the Burger Bar. Instead of using Australian Dollars, everything here is priced by its Water Footprint.</p>\
<p>Today, you are granted the privilege to build your own burger. However, you must choose wisely, as you only have 400 Water Dollars to spend on your selection of Go, Grow and Glow foods.</p>\
<p>Good luck, and choose responsibly!</p>"

outro = "Thankyou for making choices that support a fair water distribution for all";

alloc = 400;
skipAllocation = true;
isMuted = true;

layers = [
  {
    title:"Select a <b>Carbohydrate</b> (“GO” FOODS)",
    isABurger:true,
    short: "Carbohydrate",
    list:[
      {name:"Wheat bun with sesame",  wd:120,   d:makeDescription(2000,2,60),      img:'./burger/burger0018.png', top:'./burger/burger0015.png', bottom:'./burger/burger0012.png'},
      {name:"Dark Rye",               wd:90,    d:makeDescription(1500,1.5,60),    img:'./burger/burger0017.png', top:'./burger/burger0014.png', bottom:'./burger/burger0011.png'},
      {name:"Native Millet",          wd:72,    d:makeDescription(1200,1.2,60),    img:'./burger/burger0016.png', top:'./burger/burger0013.png', bottom:'./burger/burger0010.png'},
    ]
  },{
    title:"Select a <b>Protein</b> (“GROW” FOODS)",
    short: "Protein",
    list:[
      {name:"Kangaroo",               wd:300,   d:makeDescription(3000,3,100),      img:'./burger/burger0003.png'},
      {name:"Beef",                   wd:1500,   d:makeDescription(15000,15,100),   img:'./burger/burger0001.png'},
      //{name:"Plant-based beef",       wd:190,   d:makeDescription(2523,2.523,75)},
      //{name:"Lab-grown Diprotodon",   wd:150,   d:makeDescription(1500,1.5,100)},
      {name:"Chickpea lentil",        wd:240,   d:makeDescription(2000,2,120),      img:'./burger/burger0002.png'},
      //{name:"Wild caught whiting",     wd:90,   d:makeDescription(1000,1,90)}
    ]
  },{
    title:"Select a <b>Vegetable</b> (“GLOW” FOODS)",
    short: "Vegetable",
    list:[
      {name:"Lettuce",                wd:1.33,   d:makeDescription(133,0.133,10),      img:'./burger/burger0007.png'},
      {name:"Tomato",                 wd:32.1,   d:makeDescription(214,0.214,150),      img:'./burger/burger0009.png'},
      /*{name:"Red onion",              wd:5.76,   d:makeDescription(192,0.192,30)},
      {name:"Mushroom",               wd:1.70,   d:makeDescription(20,0.02,85)},
      {name:"Pineapple",              wd:17.2,   d:makeDescription(215,0.215,80)},
      {name:"Tinned Beetroot",        wd:48,     d:makeDescription(800,0.8,60)},
      {name:"Toasted Nori Chips",     wd:0.5,    d:makeDescription(50,0.5,1)},
      {name:"Pickles",                wd:7.06,   d:makeDescription(353,0.353,20)},
      {name:"Coleslaw with egg mayo", wd:75,     d:makeDescription(1500,1.5,50)},*/
      {name:"Tomato sauce",           wd:5.40,   d:makeDescription(270,0.270,20),      img:'./burger/burger0008.png'},
      //{name:"Bush tomato Relish",     wd:5,      d:makeDescription(250,0.250,20)},
      //{name:"Mustard",                wd:48,     d:makeDescription(2400,2.4,20)}
    ]
  },
  {
    title:"Select a <b>Healthy Fat</b> (“GLOW” FOODS)",
    short: "Fat",
    list:[
      //{name:"Garlic and herb Aioli",  wd:40,   d:makeDescription(2000,2,20)},
      //{name:"Avocado",                wd:17,   d:makeDescription(849,0.849,20)},
      {name:"Cow’s milk cheese",      wd:112,   d:makeDescription(4000,4,28),      img:'./burger/burger0004.png'},
      {name:"Camel’s milk cheese",    wd:28,   d:makeDescription(1000,1,28),      img:'./burger/burger0005.png'},
      {name:"Vegan cheese ",          wd:224,   d:makeDescription(8000,8,28),      img:'./burger/burger0006.png'}
    ]
  }
]

DATA.sequence = [
  {type:'screen-herald', copy:'Welcome to the<br>Water Dollar<br>Burger Bar'},
  {type:'screen-lecture', copy:'yo'},
  {type:'screen-alloc'},
  {type:'screen-shop', layers:layers },
  {type:'screen-herald', copy:'Thankyou for making choices that support a fair water distribution for all.'},
]








