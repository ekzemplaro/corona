// -----------------------------------------------------------------------
//	capacity_pref.js
//
//					Feb/25/2019
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** capacity_pref *** start ***")

	const file_in = "./data_capacity.json"

	jQuery.getJSON (file_in,function (data_aa)
		{
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>Pref</th>"
		str_out += "<th>Mar/7</th>"
		str_out += "<th>Mar/24</th>"
		str_out += "</tr>"
		var sum_mar07 = 0
		var sum_mar24 = 0

		for (var key in data_aa)
			{
			const unit_aa = data_aa[key]
			str_out += "<tr>"
			str_out += "<td>" + key + "</td>"
			str_out += "<td>" + unit_aa.name + "</td>"
			str_out += "<td>" + unit_aa.mar07 + "</td>"
			str_out += "<td>" + unit_aa.mar24 + "</td>"
			str_out += "</tr>"

			sum_mar07 += parseInt(unit_aa.mar07)
			sum_mar24 += parseInt(unit_aa.mar24)
			}

		str_out += "<tr>"
		str_out += "<td></td>"
		str_out += "<th>計</th>"
		str_out += "<td>" + sum_mar07 + "</td>"
			str_out += "<td>" + sum_mar24 + "</td>"
		str_out += "</tr>"
		str_out += "</table>"

		jQuery(".contents").html (str_out)
		})

	jQuery("#outarea_hh").text ("*** capacity_pref *** end ***")

})

// -----------------------------------------------------------------------
