// -----------------------------------------------------------------------
//	oyama_medical.js
//
//					Jan/25/2022
//
// -----------------------------------------------------------------------
function true_false_convert(boolean_in)
{
	var rvalue = "X"

	if (boolean_in)
		{
		rvalue = "O"
		}

	return ("<td>" + rvalue + "</td>")
}

// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** oyama_medical *** start ***")

	const file_in = "./oyama_medical.json"

	jQuery.getJSON (file_in,function (data_aa)
		{
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>医療機関名</th>"
		str_out += "<th>郵便番号</th>"
		str_out += "<th>所在地</th>"
		str_out += "<th>電話番号</th>"
		str_out += "<th>検査</th>"
		str_out += "<th>自院患者以外も可</th>"
		str_out += "<th>特記事項</th>"
		str_out += "</tr>"

		no = 1
		for (var key in data_aa)
			{
			const unit_aa = data_aa[key]
			str_out += "<tr>"
			str_out += "<td>" + no + "</td>"
			str_out += "<td>" + unit_aa.name + "</td>"
			str_out += "<td>" + unit_aa.postal + "</td>"
			str_out += "<td>" + unit_aa.address + "</td>"
			str_out += "<td>" + unit_aa.phone + "</td>"
			str_out += true_false_convert(unit_aa.inspect)
			str_out += true_false_convert(unit_aa.others)
			if ("comment" in unit_aa)
				str_out += "<td>" + unit_aa.comment + "</td>"
			else
				str_out += "<td></td>"
			str_out += "</tr>"

			no += 1
			}

		str_out += "</table>"

		jQuery(".contents").html (str_out)
		})

	jQuery("#outarea_hh").text ("*** oyama_medical *** end ***")

})

// -----------------------------------------------------------------------
