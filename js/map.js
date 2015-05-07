
var index;
var op;
var list;
var listOfArrays=[];
var conditionArray=[];

//function for adding options upon clicking the +
document.querySelector("#add").onclick =
function addCondition(){
  
  var currentDiv = document.createElement("div");
  var select0 = document.createElement("select");select0.setAttribute("class","condition");
  //select0.setAttribute
  var op01 = document.createElement("option");
  var t01 = document.createTextNode("AND");
  var op02 = document.createElement("option");
  var or = document.createTextNode("OR");
  op01.appendChild(t01);
  op02.appendChild(or);
  select0.appendChild(op01);
  select0.appendChild(op02);

  var select1 = document.createElement("select");select1.setAttribute("class","condition");
 // console.log("k0");
  var op1 = document.createElement("option");
  var t1 = document.createTextNode("GDP");
  var op2 = document.createElement("option");
  var t2 = document.createTextNode("Population");
  var op3 = document.createElement("option");
  var t3 = document.createTextNode("gender-ratio");
//console.log("test");
  op1.appendChild(t1);
  op2.appendChild(t2);
  op3.appendChild(t3);

  select1.appendChild(op1);
  select1.appendChild(op2);
  select1.appendChild(op3);
//console.log("1");

  var select2 = document.createElement("select");select2.setAttribute("class","condition");
  var op21 = document.createElement("option");
  var t21 = document.createTextNode("is less than");
  var op22 = document.createElement("option");
  var t22 = document.createTextNode("is greater than");
  var op23 = document.createElement("option");
  var t23 = document.createTextNode("is equal to");
  op21.appendChild(t21);
  op22.appendChild(t22);
  op23.appendChild(t23);
  select2.appendChild(op21);select2.appendChild(op22);select2.appendChild(op23);


  var x = document.createElement("INPUT");x.setAttribute("class","condition");
  x.setAttribute("type", "number");

  
  var mydiv = document.getElementById("selector"); 
  //document.body.insertBefore(newDiv, currentDiv);
  var para = document.createElement("p"); 
  var para2 = document.createElement("p"); 
  var para3 = document.createElement("p");
  var para4 = document.createElement("p"); 
  var para5 = document.createElement("p"); 
 
  para5.appendChild(text); 
  currentDiv.appendChild(para);
  currentDiv.appendChild(select0);
  currentDiv.appendChild(para2);
  currentDiv.appendChild(select1);
  currentDiv.appendChild(para3);
  currentDiv.appendChild(select2);
  currentDiv.appendChild(para4);
  currentDiv.appendChild(x);
  currentDiv.appendChild(para5);
 
 // document.body.insertBefore(currentDiv, d);
mydiv.appendChild(currentDiv);

}



//function for hitting go. assigns all selections and entered boundary to variables, makes a matrix of the needed arrays. 
document.querySelector("#go").onclick =
function go(){
  //num = input number 
  var boundary1 = document.querySelector("#num").value;
 
  //attribute = population, GDP, etc. 
  var attr1 = document.querySelector("#attribute").selectedIndex;
  
  //comparison = less than, greater than, equal to 
  var comparison1 = document.querySelector("#comparison").selectedIndex;

  var year1 = document.querySelector("#year").selectedIndex; 

  var arr=[];
  arr=query(attr1,comparison1, boundary1);
  
  listOfArrays.push(arr);
  
  list = document.querySelectorAll(".condition");

  var i=0;var vals=[];
  for(i=0;i<list.length;i++){  
    if(i%4==3)
      {
        vals.push(list[i].value);
      }
    vals.push(list[i].selectedIndex);
    }
  console.log(vals);
  var j=0;
  for(j=0;j<vals.length;j+=5){
    conditionArray.push(vals[j]);
    arr=query(vals[j+1],vals[j+2],vals[j+3]);
    listOfArrays.push(arr);
}
  // console.log(conditionArray);
  // console.log(listOfArrays);
  finalArray();
}

function finalArray(){
  var i;var farr=[];
  for(i=conditionArray.length-1;i>=0;i--){
    var k=listOfArrays.length-1;
    if(conditionArray[i]==1){
      var a= _.union(listOfArrays[k], listOfArrays[k-1]);
      }
    else if(conditionArray[i]==0){
      var a= _.intersection(listOfArrays[k], listOfArrays[k-1]);
    }
    listOfArrays.pop(listOfArrays[k]);
    listOfArrays.pop(listOfArrays[k-1]);
    listOfArrays.push(a);
  }
  console.log(listOfArrays);
  initialize(); 
}

function query(attr,comparison,boundary){
  
 var plot=[];
  //takes GDP, comparison, boundary and year and returns a plot of all the arrays in GDP array that have GDP in the bound. 
  //attr: 0 is GDP, 1 is Population, 2 is gender ratio
  var index = attr+1; 
  if(comparison==0) {
    for(var i=0; i< GDParray.length; i++) {
      var city = GDParray[i]; 
        if(city[index] < boundary) {
          plot.push(city); 
        }
    }
  }

  if(comparison==1) {
    for(var i=0; i< GDParray.length; i++) {
      var city = GDParray[i]; 
        if(city[index] > boundary) {
          plot.push(city); 
        }
    }
  }

  if(comparison==2) {
    for(var i=0; i< GDParray.length; i++) {
      var city = GDParray[i]; 
        if(city[index]===boundary) {
          plot.push(city); 
        }
    }
  }
  //console.log(attr);console.log(boundary);
 /*index=attr+1;
 if(comparison==0){
  for(i=0;i<cities.length; i++){
    var city=cities[i];
   // console.log("1:"+city);
    if(city[index] < boundary)
      plot.push(city);
  }
}
//console.log(plot);
  if(comparison==1){
  for(i=0;i<cities.length; i++){
    var city=cities[i];
     if(city[index] > boundary)
      plot.push(cities[i]);
    
  }
}
  if(comparison==2){
  for(i=0;i<cities.length; i++){
    var city=cities[i];
    if(city[index]==boundary)
      plot.push(cities[i]);
  }
}*/
 console.log(plot);
return plot;
 
}
function initialize() {
        var myLatlng = new google.maps.LatLng(47, -30);
        var mapOptions = {
        zoom: 2,
        center: myLatlng
  }
    var map = new google.maps.Map(document.querySelector('#map-canvas'), mapOptions);
    setMarkers(map, listOfArrays[0]);
    listOfArrays=[];
 }

var GDPD = []; 
var GDPvalues = []; 
var GDPcodes = []; 
var GDParray = []; 
var printgdp = function(data) {
var dat = data[1]; 

for (var i=0; i<dat.length; i++) {
  var add = []; 
  add.push(dat[i].country.id);
  add.push(dat[i].value); 
  GDParray.push(add);
}
}

$.ajax({url:"http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD?date=2010:2010&format=jsonP&prefix=printgdp", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD?date=2010:2010&page=2&format=jsonP&prefix=printgdp", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD?date=2010:2010&page=3&format=jsonP&prefix=printgdp", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD?date=2010:2010&page=4&format=jsonP&prefix=printgdp", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries/all/indicators/NY.GDP.MKTP.CD?date=2010:2010&page=5&format=jsonP&prefix=printgdp", dataType: "JSONP", crossDomain: true})


//console.log(GDPD);

//console.log(GDPvalues);
//console.log(GDPcodes);


var latitudes = []; 
var longitudes = [];
var countryCodes = [] 

var print1 = function(data) {
var dat = data[1];
for(var i=0; i<dat.length; i++) {
  countryCodes.push(dat[i]);
}

for (var i=0; i<dat.length; i++) {
  latitudes.push(dat[i].latitude);
}
for (var i=0; i<dat.length; i++) {
  longitudes.push(dat[i].longitude);
}
for (var i=0; i<dat.length; i++) {
    for (var j=0; j<GDParray.length; j++) {
      if (dat[i].iso2Code == GDParray[j][0]) {
        GDParray[j][0]=dat[i].name; 
        GDParray[j].push(dat[i].latitude);
        GDParray[j].push(dat[i].longitude);
}
    }
}

}

$.ajax({url:"http://api.worldbank.org/countries?format=jsonP&prefix=print1", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries?page=2&format=jsonP&prefix=print1", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries?page=3&format=jsonP&prefix=print1", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries?page=4&format=jsonP&prefix=print1", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries?page=5&format=jsonP&prefix=print1", dataType: "JSONP", crossDomain: true})
$.ajax({url:"http://api.worldbank.org/countries?page=6&format=jsonP&prefix=print1", dataType: "JSONP", crossDomain: true})


console.log(GDParray);



 var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };
var table=['city', 'population','gdp', 'gender-ratio', 'latitude', 'longitude', 'n'];
var cities = [
  
  ['Mumbai',20222, 233, 87, 19.075984, 72.877656, 4],
  ['Delhi', 12345, 212, 97, 28.613939, 77.209021, 5],
  ['Lucknow', 12441, 233, 88, 26.846511, 80.946683, 3],
  ['Bangalore',42422, 433, 99, 12.971599, 77.594563, 2],
  ['Hyderabad',34242, 342, 87, 17.385044, 78.486671, 1],
  ['Pune', 18762, 121, 92, 18.520430, 73.856744,6],
  ['Bhopal', 19822, 134, 89, 23.259933, 77.412615, 7]
];

  
//For each country code in countries, scroll through countryCodes array and assign GDP; create object that has country name, GDP and code. 


function setMarkers(map, locations) {
  
  for (var i = 0; i < locations.length; i++) {
   //console.log(i);
    var place = locations[i];
    var myLatLng = new google.maps.LatLng(place[2], place[3]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        shape: shape,
        title: place[0],
        zIndex: 100000,
       
    });
  }

}





//google.maps.event.addDomListener(window, 'load', init);
