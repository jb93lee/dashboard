$(function(){

var layoutPadding = 50;

var layoutDuration = 500;

// get exported json from cytoscape desktop via ajax

var graphP = {

"format_version" : "1.0",

"generated_by" : "cytoscape-3.2.0",

"target_cytoscapejs_version" : "~2.1",

"data" : {

"selected" : true,

"__Annotations" : [ ],

"shared_name" : "WineCheeseNetwork",

"SUID" : 52,

"name" : "WineCheeseNetwork"

},

"elements" : {

"nodes" : [

//red

{

"data" : {

"id" : "200",

"Strength" : 5,

"selected" : false,

"cytoscape_alias_list" : [ "66.240.192.138" ],

"canonicalName" : "66.240.192.138",

"Milk" : "Raw cow's milk",

"Synonym" : "Kuentener",

"Quality" : 90,

"Type" : "Semi-soft",

"SUID" : 200,

"NodeType" : "RedWine",

"name" : "66.240.192.138",

"Country" : "Switzerland",

"shared_name" : "66.240.192.138"

},

"position" : {

"x" : 3991.9853515625,

"y" : 1400

},

"selected" : false

},

{

"data" : {

"id" : "201",

"Strength" : 5,

"selected" : false,

"cytoscape_alias_list" : [ "61.216.2.15" ],

"canonicalName" : "61.216.2.15",

"Milk" : "Raw cow's milk",

"Synonym" : "Kuentener",

"Quality" : 90,

"Type" : "Semi-soft",

"SUID" : 201,

"NodeType" : "RedWine",

"name" : "61.216.2.15",

"Country" : "Switzerland",

"shared_name" : "61.216.2.15"

},

"position" : {

"x" : 3850,

"y" : 1250

},

"selected" : false

},

{

"data" : {

"id" : "202",

"Strength" : 5,

"selected" : false,

"cytoscape_alias_list" : [ "173.194.126.240" ],

"canonicalName" : "173.194.126.240",

"Milk" : "Raw cow's milk",

"Synonym" : "Kuentener",

"Quality" : 90,

"Type" : "Soft",

"SUID" : 202,

"NodeType" : "RedWine",

"name" : "173.194.126.240",

"Country" : "Switzerland",

"shared_name" : "173.194.126.240"

},

"position" : {

"x" : 4300,

"y" : 1350

},

"selected" : false

}, {

"data" : {

"id" : "203",

"Strength" : 5,

"selected" : false,

"cytoscape_alias_list" : [ "202.179.177.22" ],

"canonicalName" : "202.179.177.22",

"Milk" : "Raw cow's milk",

"Synonym" : "Kuentener",

"Quality" : 90,

"Type" : "Soft",

"SUID" : 203,

"NodeType" : "RedWine",

"name" : "202.179.177.22",

"Country" : "Switzerland",

"shared_name" : "202.179.177.22"

},

"position" : {

"x" : 4180,

"y" : 1200

},

"selected" : false

}, {

"data" : {

"id" : "204",

"Strength" : 5,

"selected" : false,

"cytoscape_alias_list" : [ "61.111.62.35" ],

"canonicalName" : "61.111.62.35",

"Milk" : "Raw cow's milk",

"Synonym" : "Kuentener",

"Quality" : 90,

"Type" : "Soft",

"SUID" : 204,

"NodeType" : "RedWine",

"name" : "61.111.62.35",

"Country" : "Switzerland",

"shared_name" : "61.111.62.35"

},

"position" : {

"x" : 4100,

"y" : 1100

},

"selected" : false

},

{

"data" : {

"id" : "205",

"Strength" : 5,

"selected" : false,

"cytoscape_alias_list" : [ "74.125.34.46" ],

"canonicalName" : "74.125.34.46",

"Milk" : "Raw cow's milk",

"Synonym" : "Kuentener",

"Quality" : 90,

"Type" : "Soft",

"SUID" : 205,

"NodeType" : "RedWine",

"name" : "74.125.34.46",

"Country" : "Switzerland",

"shared_name" : "74.125.34.46"

},

"position" : {

"x" : 4250,

"y" : 1560

},

"selected" : false

},

{

"data" : {

"id" : "206",

"Strength" : 5,

"selected" : false,

"cytoscape_alias_list" : [ "163.152.127.98" ],

"canonicalName" : "163.152.127.98",

"Milk" : "Raw cow's milk",

"Synonym" : "Kuentener",

"Quality" : 90,

"Type" : "Semi-soft",

"SUID" : 206,

"NodeType" : "RedWine",

"name" : "163.152.127.98",

"Country" : "Switzerland",

"shared_name" : "163.152.127.98"

},

"position" : {

"x" : 3900,

"y" : 1550

},

"selected" : false

},

//yellow

{

"data" : {

"id" : "100",

"Quality" : 90,

"selected" : false,

"cytoscape_alias_list" : [ "192.168.33.101" ],

"canonicalName" : "192.168.33.101",

"SUID" : 100,

"NodeType" : "Cheese",

"name" : "192.168.33.101",

"shared_name" : "192.168.33.101"

},

"position" : {

"x" : 3600,

"y" : 1000

},

"selected" : false

},

{

"data" : {

"id" : "101",

"selected" : false,

"Quality" : 90,

"cytoscape_alias_list" : [ "192.168.33.31" ],

"canonicalName" : "192.168.33.31",

"SUID" : 101,

"NodeType" : "Cheese",

"name" : "192.168.33.31",

"shared_name" : "192.168.33.31"

},

"position" : {

"x" : 3600,

"y" : 1300

},

"selected" : false

},

{

"data" : {

"id" : "102",

"Quality" : 90,

"selected" : false,

"cytoscape_alias_list" : [ "192.168.33.171" ],

"canonicalName" : "192.168.33.171",

"SUID" : 102,

"NodeType" : "Cheese",

"name" : "192.168.33.171",

"shared_name" : "192.168.33.171"

},

"position" : {

"x" : 3600,

"y" : 1600

},

"selected" : false

},

//white

{

"data" : {

"id" : "1",

"selected" : false,

"cytoscape_alias_list" : [ "IPS" ],

"canonicalName" : "IPS",

"SUID" : 1,

"NodeType" : "WhiteWine",

"name" : "IPS",

"shared_name" : "IPS"

},

"position" : {

"x" : 4550,

"y" : 1000

},

"selected" : false

},

{

"data" : {

"id" : "2",

"selected" : false,

"cytoscape_alias_list" : [ "WAF" ],

"canonicalName" : "WAF",

"SUID" : 2,

"NodeType" : "WhiteWine",

"name" : "WAF",

"shared_name" : "WAF"

},

"position" : {

"x" : 4550,

"y" : 1150

},

"selected" : false

},

{

"data" : {

"id" : "3",

"selected" : false,

"cytoscape_alias_list" : [ "Web_Server" ],

"canonicalName" : "Web_Server",

"SUID" : 3,

"NodeType" : "WhiteWine",

"name" : "Web_Server",

"shared_name" : "Web_Server"

},

"position" : {

"x" : 4550,

"y" : 1300

},

"selected" : false

},

{

"data" : {

"id" : "4",

"selected" : false,

"cytoscape_alias_list" : [ "Mail_Server" ],

"canonicalName" : "Mail_Server",

"SUID" : 4,

"NodeType" : "WhiteWine",

"name" : "Mail_Server",

"shared_name" : "Mail_Server"

},

"position" : {

"x" : 4550,

"y" : 1450

},

"selected" : false

},

{

"data" : {

"id" : "5",

"selected" : false,

"cytoscape_alias_list" : [ "Honeypot" ],

"canonicalName" : "Honeypot",

"SUID" : 5,

"NodeType" : "WhiteWine",

"name" : "Honeypot",

"shared_name" : "Honeypot"

},

"position" : {

"x" : 4550,

"y" : 1600

},

"selected" : false

}

],

//connect

"edges" : [

{

"data" : {

"id" : "10",

"source" : "1",

"target" : "200",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) IPS",

"SUID" : 10,

"name" : "66.240.192.138 (cw) IPS",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) IPS"

},

"selected" : false

},{

"data" : {

"id" : "11",

"source" : "2",

"target" : "200",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) WAF",

"SUID" : 11,

"name" : "66.240.192.138 (cw) WAF",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) WAF"

},

"selected" : false

},

{

"data" : {

"id" : "12",

"source" : "3",

"target" : "200",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) web",

"SUID" : 12,

"name" : "66.240.192.138 (cw) web",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) web"

},

"selected" : false

},

{

"data" : {

"id" : "13",

"source" : "3",

"target" : "200",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) mail",

"SUID" : 13,

"name" : "66.240.192.138 (cw) mail",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) mail"

},

"selected" : false

},

{

"data" : {

"id" : "14",

"source" : "100",

"target" : "200",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.101",

"SUID" : 14,

"name" : "66.240.192.138 (cw) 33.101",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.101"

},

"selected" : false

},

{

"data" : {

"id" : "15",

"source" : "101",

"target" : "200",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 15,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "16",

"source" : "100",

"target" : "201",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 16,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "17",

"source" : "1",

"target" : "201",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 17,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "18",

"source" : "2",

"target" : "201",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 18,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "18",

"source" : "2",

"target" : "201",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 18,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "19",

"source" : "5",

"target" : "200",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 19,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "20",

"source" : "5",

"target" : "201",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 20,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "21",

"source" : "100",

"target" : "202",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 21,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "22",

"source" : "100",

"target" : "203",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 22,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "23",

"source" : "101",

"target" : "203",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 23,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "24",

"source" : "102",

"target" : "204",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 24,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "25",

"source" : "102",

"target" : "205",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 25,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "26",

"source" : "102",

"target" : "202",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 26,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "27",

"source" : "100",

"target" : "206",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 27,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "28",

"source" : "101",

"target" : "206",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 28,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "29",

"source" : "1",

"target" : "206",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 29,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "30",

"source" : "2",

"target" : "206",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 30,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

{

"data" : {

"id" : "31",

"source" : "3",

"target" : "206",

"selected" : false,

"canonicalName" : "66.240.192.138 (cw) 33.31",

"SUID" : 31,

"name" : "66.240.192.138 (cw) 33.31",

"interaction" : "cw",

"shared_interaction" : "cw",

"shared_name" : "66.240.192.138 (cw) 33.31"

},

"selected" : false

},

]

}

}

// also get style via ajax

var styleP = $.ajax({

url: 'https://cdn.rawgit.com/maxkfranz/9210c03a591f8736b82d/raw', // wine-and-cheese-style.cycss

type: 'GET',

dataType: 'text'

});

var infoTemplate = Handlebars.compile([

'<p class="ac-name">{{name}}</p>',

'<p class="ac-node-type"><i class="fa fa-info-circle"></i> {{NodeTypeFormatted}} {{#if Type}}({{Type}}){{/if}}</p>',

'{{#if Milk}}<p class="ac-milk"><i class="fa fa-angle-double-right"></i> {{Milk}}</p>{{/if}}',

'{{#if Country}}<p class="ac-country"><i class="fa fa-map-marker"></i> {{Country}}</p>{{/if}}',

'<p class="ac-more"><i class="fa fa-external-link"></i> <a target="_blank" href="https://duckduckgo.com/?q={{name}}">More information</a></p>'

].join(''));

// when both graph export json and style loaded, init cy

Promise.all([ graphP, styleP ]).then(initCy);

function highlight( node ){

var nhood = node.closedNeighborhood();

cy.batch(function(){

cy.elements().not( nhood ).removeClass('highlighted').addClass('faded');

nhood.removeClass('faded').addClass('highlighted');

var npos = node.position();

var w = window.innerWidth;

var h = window.innerHeight;

cy.stop().animate({

fit: {

eles: cy.elements(),

padding: layoutPadding

}

}, {

duration: layoutDuration

}).delay( layoutDuration, function(){

nhood.layout({

name: 'concentric',

padding: layoutPadding,

animate: true,

animationDuration: layoutDuration,

boundingBox: {

x1: npos.x - w/2,

x2: npos.x + w/2,

y1: npos.y - w/2,

y2: npos.y + w/2

},

fit: true,

concentric: function( n ){

if( node.id() === n.id() ){

return 2;

} else {

return 1;

}

},

levelWidth: function(){

return 1;

}

});

} );

});

}

function clear(){

cy.batch(function(){

cy.$('.highlighted').forEach(function(n){

n.animate({

position: n.data('orgPos')

});

});

cy.elements().removeClass('highlighted').removeClass('faded');

});

}

function showNodeInfo( node ){

$('#info').html( infoTemplate( node.data() ) ).show();

}

function hideNodeInfo(){

$('#info').hide();

}

function initCy( then ){

var loading = document.getElementById('loading');

var expJson = then[0];

var styleJson = then[1];

var elements = expJson.elements;

elements.nodes.forEach(function(n){

var data = n.data;

data.NodeTypeFormatted = data.NodeType;

if( data.NodeTypeFormatted === 'RedWine' ){

data.NodeTypeFormatted = 'Red Wine';

} else if( data.NodeTypeFormatted === 'WhiteWine' ){

data.NodeTypeFormatted = 'White Wine';

}

n.data.orgPos = {

x: n.position.x,

y: n.position.y

};

});

loading.classList.add('loaded');

var cy = window.cy = cytoscape({

container: document.getElementById('cy'),

layout: { name: 'preset', padding: layoutPadding },

style: styleJson,

elements: elements,

motionBlur: true,

selectionType: 'single',

boxSelectionEnabled: false,

autoungrabify: true

});

cy.on('free', 'node', function( e ){

var n = e.cyTarget;

var p = n.position();

n.data('orgPos', {

x: p.x,

y: p.y

});

});

cy.on('tap', function(){

$('#search').blur();

});

cy.on('select', 'node', function(e){

var node = this;

highlight( node );

showNodeInfo( node );

});

cy.on('unselect', 'node', function(e){

var node = this;

clear();

hideNodeInfo();

});

}

$('#search').typeahead({

minLength: 2,

highlight: true,

},

{

name: 'search-dataset',

source: function( query, cb ){

function matches( str, q ){

str = (str || '').toLowerCase();

q = (q || '').toLowerCase();

return str.match( q );

}

var fields = ['name', 'NodeType', 'Country', 'Type', 'Milk'];

function anyFieldMatches( n ){

for( var i = 0; i < fields.length; i++ ){

var f = fields[i];

if( matches( n.data(f), query ) ){

return true;

}

}

return false;

}

function getData(n){

var data = n.data();

return data;

}

function sortByName(n1, n2){

if( n1.data('name') < n2.data('name') ){

return -1;

} else if( n1.data('name') > n2.data('name') ){

return 1;

}

return 0;

}

var res = cy.nodes().stdFilter( anyFieldMatches ).sort( sortByName ).map( getData );

cb( res );

},

templates: {

suggestion: infoTemplate

}

}).on('typeahead:selected', function(e, entry, dataset){

var n = cy.getElementById(entry.id);

n.select();

showNodeInfo( n );

});

$('#reset').on('click', function(){

cy.animate({

fit: {

eles: cy.elements(),

padding: layoutPadding

},

duration: layoutDuration

});

});

$('#filters').on('click', 'input', function(){

var soft = $('#soft').is(':checked');

var semiSoft = $('#semi-soft').is(':checked');

var na = $('#na').is(':checked');

var semiHard = $('#semi-hard').is(':checked');

var hard = $('#hard').is(':checked');

var red = $('#red').is(':checked');

var white = $('#white').is(':checked');

var cider = $('#cider').is(':checked');

cy.batch(function(){

cy.nodes().forEach(function( n ){

var type = n.data('NodeType');

n.removeClass('filtered');

var filter = function(){

n.addClass('filtered');

};

if( type === 'RedWine' ){

var cType = n.data('Type');

if(

(cType === 'Soft' && !soft)

|| (cType === 'Semi-soft' && !semiSoft)

|| (cType === undefined && !na)

|| (cType === 'Semi-hard' && !semiHard)

|| (cType === 'Hard' && !hard)

){

filter();

}

} else if( type === 'Cheese' ){

if( !red ){ filter(); }

} else if( type === 'WhiteWine' ){

if( !white ){ filter(); }

} else if( type === 'Cider' ){

if( !cider ){ filter(); }

}

});

});

});

$('#filter').qtip({

position: {

my: 'top center',

at: 'bottom center'

},

show: {

event: 'click'

},

hide: {

event: 'unfocus'

},

style: {

classes: 'qtip-bootstrap',

tip: {

width: 16,

height: 8

}

},

content: $('#filters')

});

});
