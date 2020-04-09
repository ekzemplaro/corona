// ------------------------------------------------------------------------
//	saitama_area.js
//
//						Apr/03/2020
// ------------------------------------------------------------------------
const file_json = "saitama.json"
const file_status = "saitama_status.json"

jQuery.getJSON(file_json,function (data)
	{
	jQuery.getJSON(file_status,function (status_aa)
		{
		jQuery("#outarea_aa").text ("*** start ***")
		const status_bb = to_district_proc(status_aa)
		draw_map_proc(data,status_bb)
		jQuery("#outarea_hh").text ("*** end ***")
		})
	})

// ------------------------------------------------------------------------
// [4]:
function to_district_proc(status_in)
{
	var status_out = {}
	var str_out = ""

	for (var key in status_in)
		{
		const unit_aa = status_in[key]
		str_out += key + "<br />"

		if (key == "11100")
			{
			for (var it=1; it<= 10; it += 1)
				{
				const key_dd = "111" + ('00' + it).slice(-2)
				str_out += "key_dd = " + key_dd + "<br />"
				status_out[key_dd] = unit_aa
				}
			}
		else
			{
			status_out[key] = unit_aa
			}
		}

//	jQuery("#outarea_cc").html (str_out)

	return status_out
}

// ------------------------------------------------------------------------
// [6]:
function draw_map_proc(data_in,status_in)
{
	const WIDTH = 700
//	const HEIGHT = 560
	const HEIGHT = 350

	var svg = d3.selectAll("#map")
		.attr("width", WIDTH)
		.attr("height", HEIGHT);

	var gg = svg.append("g");

        var projection = d3.geoMercator()
            .scale(25000)
            .center(d3.geoCentroid(data_in))
            .translate([WIDTH / 2, HEIGHT / 2])

        var path = d3.geoPath()
            .projection(projection)

        gg.selectAll('path')
		.data(data_in.features)
		.enter()
		.append('path')
		.attr('d', path)
		.attr('class', 'area')
		.attr('name', function(d) {
			const pp = d.properties;
           		this.style.fill = add_color_proc(pp,status_in)
			return pp.N03_004;
			})
		.attr('key', function(d) {
			const pp = d.properties;
			return pp.N03_007
			})
/*
		.on('mouseover', function() {
                this.style.fill = 'red';
            })
            .on('mouseout', function() {
                this.style.fill = 'silver';
		})
*/
            .on('click', function() {
                this.style.fill = 'blue';
		const key = this.getAttribute('key')
		const name = this.getAttribute('name')
		var str_out = key + "<br />"
		str_out += name + "<br />"
		str_out += status_in[key].data + "<br />"
		str_out += "前週 " + status_in[key].count_a + "<br />"
		str_out += "今週 " + status_in[key].count_b + "<br />"
		jQuery("#outarea_cc").html (str_out)
            })

}

// ------------------------------------------------------------------------
// [6-4]:
function add_color_proc(pp,status_in)
{
	var color = 'silver'

	const key = pp.N03_007

	if (key in status_in)
		{
		const status = status_in[key].status

		if (status == 2)
			color = 'red'
		else if (status == 1)
			color = 'yellow'
		else if (status == 0)
			color = 'silver'
		}

	return	color
}

// ------------------------------------------------------------------------
