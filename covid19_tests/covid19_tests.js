// -----------------------------------------------------------------------
//	pcr_test.js
//
//					Aug/16/2020
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** pcr_test *** start ***")

	var file_in = "./source.json"

	jQuery.getJSON (file_in,function (data_aa)
		{
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>Name</th>"
		str_out += "<th>Postal</th>"
		str_out += "<th>Address</th>"
		str_out += "<th>Conditions</th>"
		str_out += "</tr>"
		var icount = 0
		for (var key in data_aa)
			{
			const unit_aa = data_aa[key]
			if (1 < unit_aa.name.length)
				{
			str_out += "<tr>"
			str_out += "<td>" + (icount + 1) + "</td>"
			str_out += "<td>" + name_url_gen(unit_aa)  + "</td>"
			str_out += "<td>" + unit_aa.postal + "</td>"
			str_out += "<td>" + unit_aa.address + "</td>"
			str_out += "<td>" + unit_aa.conditions + "</td>"
			str_out += "</tr>"

				icount += 1
				}
			}

		str_out += "</table>"

		jQuery(".contents").html (str_out)
		})

	jQuery("#outarea_hh").text ("*** pcr_test *** end ***")

})

// -----------------------------------------------------------------------
function name_url_gen(unit_aa)
{
	var str_out = ""
	str_out += "<a href =\"" + unit_aa.url + "\">"
	str_out += unit_aa.name
	str_out += "</a>"

	return	str_out 
}

// -----------------------------------------------------------------------
