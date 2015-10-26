$(function() {
	Morris.Donut({
	  element: 'morris-donut-graph',
	  data: [
		{value: 70, label: 'foo'},
		{value: 15, label: 'bar'},
		{value: 10, label: 'baz'},
		{value: 5, label: 'A really really long label'}
	  ],
	  formatter: function (x) { return x + "%"}
	}).on('click', function(i, row){
	  console.log(i, row);
	});
})