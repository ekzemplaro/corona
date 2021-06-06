// -----------------------------------------------------------------------
//	vaccine.js
//
//					Jun/07/2021
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** vaccine *** start ***")

	const file_in = "./vaccine_merged.json"

	jQuery.getJSON (file_in,function (dict_in)
		{
		const data_aa = sort_proc(dict_in)
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>都道府県名</th>"
		str_out += "<th>接種回数</th>"
		str_out += "<th>内1回目</th>"
		str_out += "<th>内2回目</th>"
		str_out += "<th>65歳以上高齢者</th>"
		str_out += "<th>1回目接種率</th>"
		str_out += "</tr>"

		var count = 1
		for (var it in data_aa)
			{
			const unit_aa = data_aa[it]
			const pref = unit_aa.pref
			str_out += "<tr>"
			str_out += "<td>" + count + "</td>"
			str_out += "<td>" + pref + "</td>"
			const sum = unit_aa["first"] + unit_aa["second"]
			str_out += "<td>" + sum + "</td>"
			str_out += "<td>" + unit_aa["first"] + "</td>"
			str_out += "<td>" + unit_aa["second"] + "</td>"
			str_out += "<td>" + unit_aa.over_65 + "</td>"
			str_out += "<td>" + unit_aa.percent.toFixed(2) + "</td>"
			str_out += "</tr>"

			count += 1
			}

		str_out += "</table>"

		jQuery(".contents").html (str_out)
		})

	jQuery("#outarea_hh").text ("*** vaccine *** end ***")

})

// -----------------------------------------------------------------------
function sort_proc(dict_in)
{
	var data_out = []

	for (var pref in dict_in)
		{
		var unit_aa = dict_in[pref]
		unit_aa["pref"] = pref
		const percent = unit_aa["first"] * 100.0 / unit_aa.over_65
		unit_aa["percent"] = percent
		data_out.push(unit_aa)
		}


	data_out.sort (compare_by_key_proc)

	return	data_out
}


// -----------------------------------------------------------------------
function compare_by_key_proc (left,right)
{
	var aa = left["percent"]
	var bb = right["percent"]

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
