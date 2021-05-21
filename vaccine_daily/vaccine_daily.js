// -----------------------------------------------------------------------
//	vaccine_daily.js
//
//					May/18/2021
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** vaccine_daily *** start ***")

	const file_korei = "./KOREI-vaccination_data.json"
	const file_iryo = "./IRYO-vaccination_data.json"

	jQuery.getJSON (file_korei,function (data_korei_raw)
		{
		const data_korei = filter_proc(data_korei_raw)
		jQuery.getJSON (file_iryo,function (data_iryo_raw)
			{
			const data_iryo = filter_proc(data_iryo_raw)
			const data_merged = merge_proc(data_korei,data_iryo)
			create_table_proc(data_merged)
			})
		})

	jQuery("#outarea_hh").text ("*** vaccine_daily *** end ***")
})

// -----------------------------------------------------------------------
function merge_proc(data_korei,data_iryo)
{
	const dict_korei = array_to_dict_proc(data_korei)
	const dict_iryo = array_to_dict_proc(data_iryo)

	for (var key in dict_korei)
		{
		dict_korei[key]["iryo_number"] = 0
		dict_korei[key]["iryo_first"] = 0
		dict_korei[key]["iryo_second"] = 0

		if (dict_iryo[key])
			{	
		dict_korei[key]["iryo_first"] = dict_iryo[key]["first"]
		dict_korei[key]["iryo_second"] = dict_iryo[key]["second"]
	dict_korei[key]["iryo_number"] = dict_iryo[key]["first"] + dict_iryo[key]["second"]
			}

		dict_korei[key]["sum"] = dict_korei[key]["number"] + dict_korei[key]["iryo_number"]
		}

	return dict_korei
}

// -----------------------------------------------------------------------
function array_to_dict_proc(array_in)
{
	var dict_out = {}

	for (var it in array_in)
		{
		const unit_aa = array_in[it]

		const key = unit_aa["date"]
		dict_out[key] = unit_aa
		}

	return dict_out
}

// -----------------------------------------------------------------------
function create_table_proc(data_korei)
{
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>接種日</th>"
		str_out += "<th>総接種回数</th>"
		str_out += "<th>内 高齢者等</th>"
		str_out += "<th>内 医療従事者等</th>"
		str_out += "</tr>"

		var count = 1
		for (var key in data_korei)
			{
			const unit_aa = data_korei[key]
			str_out += "<tr>"
			str_out += "<td>" + count + "</td>"
//			str_out += "<td>" + unit_aa["date"] + "</td>"
			str_out += "<td>" + key + "</td>"
			str_out += "<td>" + unit_aa["sum"] + "</td>"
			str_out += "<td>" + unit_aa["number"] + "</td>"
//			str_out += "<td>" + unit_aa["first"] + "</td>"
//			str_out += "<td>" + unit_aa["second"] + "</td>"
			str_out += "<td>" + unit_aa["iryo_number"] + "</td>"
//			str_out += "<td>" + unit_aa["iryo_first"] + "</td>"
//			str_out += "<td>" + unit_aa["iryo_second"] + "</td>"
			str_out += "</tr>"

			count += 1
			}

		str_out += "</table>"

		jQuery(".contents").html (str_out)
}

// -----------------------------------------------------------------------
function filter_proc(data_in)
{
	var data_out = []
	count = 0
	for (var key in data_in)
		{
//		if ((4 <= key) && (key <= 50))
		if (2 <= key)
			{
			data_out.push(data_in[key])
			}
		}

	return	data_out
}


// -----------------------------------------------------------------------
