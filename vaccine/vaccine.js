// -----------------------------------------------------------------------
//	vaccine.js
//
//					May/18/2021
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** vaccine *** start ***")

	const file_in = "./KOREI-kenbetsu-vaccination_data.json"

	jQuery.getJSON (file_in,function (data_in)
		{
		const data_aa = filter_proc(data_in)
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>都道府県名</th>"
		str_out += "<th>接種回数</th>"
		str_out += "<th>内1回目</th>"
		str_out += "<th>内2回目</th>"
		str_out += "</tr>"

		var count = 1
		for (var key in data_aa)
			{
			const unit_aa = data_aa[key]
			str_out += "<tr>"
			str_out += "<td>" + count + "</td>"
			str_out += "<td>" + unit_aa["0"] + "</td>"
			str_out += "<td>" + unit_aa["1"] + "</td>"
			str_out += "<td>" + unit_aa["2"] + "</td>"
			str_out += "<td>" + unit_aa["3"] + "</td>"
			str_out += "</tr>"

			count += 1
			}

		str_out += "</table>"

		jQuery(".contents").html (str_out)
		})

	jQuery("#outarea_hh").text ("*** vaccine *** end ***")

})

// -----------------------------------------------------------------------
function filter_proc(data_in)
{
	var data_out = []
	count = 0
	for (var key in data_in)
		{
		if ((4 <= key) && (key <= 50))
			{
			data_out.push(data_in[key])
			}
		}

	data_out.sort (compare_by_key_proc)

	return	data_out
}


// -----------------------------------------------------------------------
function compare_by_key_proc (left,right)
{
	var aa = left["1"]
	var bb = right["1"]

	var rvalue = 0

	if (aa < bb)
		{
		rvalue = 1
		}
	else if (aa > bb)
		{
		rvalue = -1
		}

	return	rvalue
}
 
// -----------------------------------------------------------------------
