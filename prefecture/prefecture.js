// -----------------------------------------------------------------------
//	prefecture.js
//
//					Apr/21/2020
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** start *** prefecture.js ***")

	jQuery ("button").click (function ()
		{

		jQuery ("button").css ("color","black")
		jQuery ("button#" + this.id).css ("color","blue")

		const key = this.id

		const file_json = file_define_proc(key)

		jQuery("#outarea_bb").text (key + " clicked ***")
		jQuery("#outarea_cc").text (file_json)
		
		jQuery.getJSON (file_json,function (data_aa)
			{
			const str_out = display_proc(data_aa)
			jQuery(".contents").html (str_out)
			})

		})
//		})

	jQuery("#outarea_hh").text ("*** end *** prefecture.js ***")
})

// -----------------------------------------------------------------------
function file_define_proc(key)
{
	var prefecture = "---"

	switch(key)
		{
		case "p07":
			prefecture = "fukushima"
			break

		case "p08":
			prefecture = "ibaraki"
			break

		case "p09":
			prefecture = "tochigi"
			break

		case "p10":
			prefecture = "gunma"
			break

		case "p11":
			prefecture = "saitama"
			break
			}

	const file_json = "data_" + prefecture + ".json"

	return file_json
}

// -----------------------------------------------------------------------
function display_proc(data_aa)
{
//	array_aa.sort (compare_by_key_proc)

	var str_out = ""
	str_out += "<table>"
	str_out += "<tr>"
	str_out += "<th>No</th>"
	str_out += "<th>陽性判明日</th>"
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
		if ("occupation" in unit_aa)
			{
			str_out += "<td>" + unit_aa.occupation + "</td>"
			}
		else
			{
			str_out += "<td>---</td>"
			}

		str_out += "</tr>"
		}

	str_out += "</table>"

	return str_out
}

// -----------------------------------------------------------------------
function compare_by_key_proc (left,right)
{
	var aa = left.code.split('-')
	var bb = right.code.split('-')

	var rvalue = 0

	const iaa = parseInt(aa[1])
	const ibb = parseInt(bb[1])

	if (iaa < ibb)
		{
		rvalue = 1
		}
	else if (iaa > ibb)
		{
		rvalue = -1
		}

	return	rvalue
}
// -----------------------------------------------------------------------
