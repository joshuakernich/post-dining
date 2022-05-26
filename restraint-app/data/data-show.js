function makeDescription(LitresPerKG,WDPerGram,grams){
  return ""+LitresPerKG+" Litres per kg | "+grams+"g at <wd></wd>"+WDPerGram+" per gram"
}

var profiles = [
  { first:'Tester', last:'Testings', dob:'42804', age:33, occ:'app tester', code:'123456' },
  { first:'Nigel', last:'Ilunga', dob:'42804', age:33, occ:'Product designer - Youth Market Sector', code:'ILU0310' },
  { first:'Susie', last:'Flan-Corbett', dob:'17-02-2015', age:35, occ:'Engineer - Household Appliances Team', code:'FLA1702' },
  { first:'Eric', last:'Boon', dob:'28-04-2029', age:21, occ:'Student intern', code:'BOO0506' },
  { first:'Morgan', last:'Head-Turner', dob:'32999', age:60, occ:'Head of Agricultural Engineering', code:'HEA0506' },
  { first:'Paloma', last:'Ibrahim', dob:'28-09-2001', age:49, occ:'Biochemist ', code:'IBR2809' },
  { first:'Wayne', last:'Drakos', dob:'14-03-1984', age:66, occ:'Chief Taste Tester', code:'DRA1403' },
  { first:'Carlos', last:'Santos', dob:'30-5-2022', age:28, occ:'Didi`s PA', code:'SAN3005' },
  { first:'XSTNC', last:'34CF', dob:'51136', age:10, occ:'Receptionist', code:'34C0101' },
  { first:'Loto', last:'Faletutulu', dob:'30-06-2023', age:29, occ:'Edible Insect Farmer', code:'FAL3006' },
  { first:'Simona', last:'Marić', dob:'16-12-1989', age:61, occ:'De-Extinction Geneticist', code:'-105128' },
  { first:'River', last:'Rockman', dob:'37663', age:47, occ:'Head of Research and Development', code:'ROC0211' },
  { first:'Diya', last:'Shukla', dob:'29-05-2012', age:38, occ:'Space Botanist ', code:'SHU2905' },
  { first:'Wren', last:'Evans', dob:'22-07-2018', age:32, occ:'Disability Inclusion Officer', code:'EVA2207' },
  { first:'Jarlo', last:'Smith', dob:'21-02-2018', age:32, occ:'Product Designer - Biomimicry Team', code:'SMI2102' },
  { first:'Kirra', last:'Wanganeen', dob:'45748', age:25, occ:'Product Designer - Kids', code:'WAN0401' },
  { first:'Ottis', last:'Patel', dob:'19-06-2008', age:42, occ:'Lab technician', code:'PAT1906' },
  { first:'Anneke', last:'Larsson', dob:'16-10-2002', age:48, occ:'AI Educator', code:'LAR1610' },
  { first:'Siri', last:'Sian', dob:'29587', age:69, occ:'Aesthetitician ', code:'SIA0101' },
  { first:'Zion', last:'Chesson', dob:'44137', age:30, occ:'Cross-Cultural Capability Facilitator', code:'CHE1102' },
  { first:'Jei', last:'Kanunba', dob:'42227', age:35, occ:'Microbiologist ', code:'KAN0811' },
  { first:'Marie', last:'Zabelle', dob:'3086', age:142, occ:'Nostalgist', code:'AB0612' },
  { first:'Li', last:'Wei Shun', dob:'28-09-2001', age:50, occ:'Solar Efficiency Consultant', code:'WEI2809' },
  { first:'Julie', last:'Wang', dob:'47096', age:22, occ:'Social Media Assistant', code:'SAN1209' },
  { first:'Mimi', last:'Sok', dob:'29-07-2009', age:41, occ:'Head of Marketing', code:'SOK2907' },
  { first:'Dorothy', last:'Carter', dob:'46913', age:23, occ:'People and Culture', code:'CAR0609' },
  { first:'Lila', last:'Singh', dob:'24-08-2006', age:44, occ:'Consumer Research ', code:'SIN2408' },
  { first:'Archie', last:'Arrow-Jones', dob:'22-07-1990', age:60, occ:'Cleaner', code:'ARR2207' },
  { first:'Aberash', last:'Ali', dob:'36596', age:50, occ:'Head of Security', code:'ALI0311' },
  { first:'Jordan', last:'Mohamed', dob:'17-08-2012', age:38, occ:'Accountant', code:'MOH1708' },
  { first:'Dionysis', last:'Pettas', dob:'11233', age:120, occ:'Board Member', code:'PET1002' },
]


function makeRandomAllocation(target){

  var start = 172;
  var left = start-target;
  var penalties = [];

  function allocate(name,wd){
    left -= wd;
    penalties.push({name:name,wd:wd});
  }

  if(left > 100){
    var amt = 60 + Math.floor(Math.random()*20);
    allocate('Bath: '+Math.round(amt*1.5)+' Litres',amt)
  }
  if(left > 70){
    var amt = 35 + Math.floor(Math.random()*20);
    allocate('Shower: '+Math.round(amt/4)+' minutes',amt);
  }

  while( left ){
    var amt = Math.round(left*0.6 + Math.random()*left*0.4);
    if(left < 10) amt = left;
    
    allocate('Faucet: '+Math.round(amt*1.5)+ ' seconds',amt);
  }

  return {global:895826182710, start:start, penalties:penalties, wd:target}
}

var allocations = [
  makeRandomAllocation(50),
  makeRandomAllocation(64),
  makeRandomAllocation(73),
  makeRandomAllocation(86),
  makeRandomAllocation(108),
]

DATA.SHOW = [
  {type:'screen-pin',profiles:profiles},
  {type:'screen-lecture', copy:'<p>Hello there,</p>\
<p>Welcome to the Global Water Allocation Trust Canteen Kiosk.</p>\
<p>Today, you will be granted the privelege to digitally construct and redeem a socially responsible canapé.</p>\
<p>Your compliance is mandatory.</p>'},
  {type:'screen-alloc', allocations:allocations },
  {type:'screen-shop',timer:120,doCodeGen:true,layers:[
    {
      title:"Select your <b>GO</b> food",
      subtitle: "Go foods contain carbohydrates for energy",
      short: "GO",
      list:[
        {name:"Rice cracker", wd:7.89, d:makeDescription(2628,2.63,3), img:'./ing/show0022.png' },
        {name:"Seed cracker", wd:40.98, d:makeDescription(6383,6.38,6), img:'./ing/show0023.png' },
        {name:"Wheat cracker", wd:7.40, d:makeDescription(1849,1.85,4), img:'./ing/show0024.png' },
       ]
    },
    {
      title:"Select your <b>GROW</b> food",
      subtitle: "GROW foods contain protein for muscle maintenance",
      short: "GROW",
      list:[
        {name:"Kangaroo mettwurst", wd:45, d:makeDescription(3000,3,15), img:'./ing/show0027.png' },
        {name:"Hommus", wd:40.50, d:makeDescription(2700,2.70,15), img:'./ing/show0026.png' },
        {name:"Cheese", wd:59.55, d:makeDescription(3968,3.97,15), img:'./ing/show0025.png' },
        {name:"Beef", wd:227.70, d:makeDescription(15182,15.18,15), img:'./ing/show0028.png' },
       ]
    },
    {
      title:"Select your <b>GLOW</b> food",
      subtitle: "GLOW foods provide vitamins, minerals and phytonutrients for metabolism and immunity",
      short: "GLOW",
      list:[
        {name:"Native Herb", wd:0.15, d:makeDescription(150,0.15,1), img:'./ing/show0030.png' },
        {name:"Dijon Mustard", wd:4.40, d:makeDescription(2200,2.20,2), img:'./ing/show0029.png' },
        {name:"Tomato relish", wd:1.63, d:makeDescription(534,0.534,3), img:'./ing/show0031.png' },
       ]
    },
    
  ] },
  //{type:'screen-herald', copy:'Thankyou for using the Global Water Allocation Trust Canteen Kiosk.'},
]

