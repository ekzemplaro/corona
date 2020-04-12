// -----------------------------------------------------------------------
//	prefecture.js
//
//					Apr/12/2020
//
// -----------------------------------------------------------------------
jQuery (function ()
{
	jQuery("#outarea_aa").text ("*** start *** prefecture.js ***")

	const file_in = "./data_all.json"

	jQuery.getJSON (file_in,function (data_aa)
		{
		jQuery ("button").click (function ()
		{

		jQuery ("button").css ("color","black")
		jQuery ("button#" + this.id).css ("color","blue")

		const key = this.id

		jQuery("#outarea_bb").text (key + " clicked ***")
		
		const str_out = display_proc(data_aa[key])

		jQuery(".contents").html (str_out)
		})
		})

	jQuery("#outarea_hh").text ("*** end *** prefecture.js ***")
})

// -----------------------------------------------------------------------
function display_proc(array_aa)
{
	array_aa.sort (compare_by_key_proc)

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

	for (var it in array_aa)
		{
		const unit_aa = array_aa[it]
		str_out += "<tr>"
		str_out += "<td>" + unit_aa.code + "</td>"
		str_out += "<td>" + unit_aa.date + "</td>"
		str_out += "<td>" + unit_aa.age + "</td>"
		str_out += "<td>" + unit_aa.sex + "</td>"
		str_out += "<td>" + unit_aa.city + "</td>"
		str_out += "<td>" + unit_aa.occupation + "</td>"
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
