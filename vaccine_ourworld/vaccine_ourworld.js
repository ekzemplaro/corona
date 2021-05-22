// -----------------------------------------------------------------------
//	vaccine_ourworld.js
//
//					May/22/2021
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** vaccine_daily *** start ***")

	const file_in = "./vaccinations_japan.json"

	jQuery.getJSON (file_in,function (dict_aa)
		{
		create_table_proc(dict_aa["data"])
		})

	jQuery("#outarea_hh").text ("*** vaccine_daily *** end ***")
})

// -----------------------------------------------------------------------
function create_table_proc(data_aa)
{
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>接種日</th>"
		str_out += "<th>総接種回数</th>"
		str_out += "<th>接種回数</th>"
		str_out += "<th>接種者比率 (%)</th>"
		str_out += "</tr>"

		var count = 1
		const llx = data_aa.length
		for (var it in data_aa)
			{
			jt = llx -1 - it
			const unit_aa = data_aa[jt]
	const total = pick_value_proc(unit_aa,"total_vaccinations")
	const raw = pick_value_proc(unit_aa,"daily_vaccinations_raw")
	const percent = pick_value_proc(unit_aa,"people_vaccinated_per_hundred")

			str_out += "<tr>"
			str_out += "<td>" + count + "</td>"
			str_out += "<td>" + unit_aa["date"] + "</td>"
			str_out += "<td>" + total + "</td>"
			str_out += "<td>" + raw + "</td>"
			str_out += "<td>" + percent + "</td>"
			str_out += "</tr>"

			count += 1
			}

		str_out += "</table>"

		jQuery(".contents").html (str_out)
}

// -----------------------------------------------------------------------
function pick_value_proc(unit_aa,key)
{
	var rvalue = "-----"
	if (key in unit_aa)
		{
		rvalue = unit_aa[key]
		}

	return rvalue
}

// -----------------------------------------------------------------------
