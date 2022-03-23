const data = [
    {campus:'UT KNOXVILLE', enrollment: 29460, color:'#fd8105'},
    {campus:'UT CHATTANOOGA', enrollment: 11590, color:'#ecaa1f'},
    {campus:'MARTIN', enrollment: 7280, color:'#0e223f'},
    {campus:'HEALTH SCIENCE CENTER', enrollment: 2815, color:'#036646'},
]



var margin = {top: 25, right: 20, bottom: 50, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.campus; }))
    .padding(0.1);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "middle");

var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => {
        return d.enrollment
    })])
    .range([ height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.campus); })
    .attr("y", function(d) { return y(d.enrollment); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.enrollment); })
    .attr('fill', function(d) { return d.color})

svg.append("text")
    .attr("x", width/2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .text("The Enrollment of UT Campuses");
