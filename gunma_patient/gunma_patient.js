// -----------------------------------------------------------------------
//	gunma_patient.js
//
//					Mar/31/2020
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** gunma_patient *** start ***")

	const file_in = "./data_gunma.json"

	jQuery.getJSON (file_in,function (data_aa)
		{
		var str_out = ""
		str_out += "<table>"
		str_out += "<tr>"
		str_out += "<th>No</th>"
		str_out += "<th>日付</th>"
		str_out += "<th>年代</th>"
		str_out += "<th>性別</th>"
		str_out += "<th>居住地</th>"
		str_out += "<th>職業</th>"
		str_out += "</tr>"

		for (var key in data_aa)
			{
			const unit_aa = data_aa[key]
			str_out += "<tr>"
			str_out += "<td>" + key + "</td>"
			str_out += "<td>" + unit_aa.date + "</td>"
			str_out += "<td>" + unit_aa.age + "</td>"
			str_out += "<td>" + unit_aa.sex + "</td>"
			str_out += "<td>" + unit_aa.place + "</td>"
			str_out += "<td>" + unit_aa.occupation + "</td>"
			str_out += "</tr>"

			}

		str_out += "</table>"

		jQuery(".contents").html (str_out)
		})

	jQuery("#outarea_hh").text ("*** gunma_patient *** end ***")

})

// -----------------------------------------------------------------------
