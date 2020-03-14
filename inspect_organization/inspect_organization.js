// ----------------------------------------------------------------------
//	inspect_organization.js
//
//					Mar/14/2020
// ----------------------------------------------------------------------
const file_json = "data_inspect.json"

jQuery.getJSON(file_json,function (data)
	{
	jQuery("#outarea_aa").text ("*** start ***")
	const graph_data = convert01(data)
	prog01 (graph_data)
	jQuery("#outarea_hh").text ("*** end ***")
	})


// ----------------------------------------------------------------------
function convert01(data)
{
	var count = 0
	var labels = []
	var data_aa = []
	var data_bb = []
	var data_cc = []
	var data_dd = []
	var data_ee = []

	const llx = data.array_date.length - 1
	jQuery("#outarea_bb").text ("llx = " + llx)

	for (var it = 0; it < llx; it += 1)
		{
		labels.push(data.array_date[it])
		data_aa.push(data.array_aa[it])
		data_bb.push(data.array_bb[it])
		data_cc.push(data.array_cc[it])
		data_dd.push(data.array_dd[it])
		data_ee.push(data.array_ee[it])
		}

	graph_data = {}

	graph_data['labels'] = labels
	graph_data['datasets'] = []

	const unit_aa =	{ label: "国立感染症研究所",
		lineTension: 0, data : data_aa , borderColor: 'green'}

	const unit_bb =	{ label: "検疫所",
		lineTension: 0, data : data_bb, borderColor: 'blue' }

	const unit_cc =	{ label: "地方衛生研究所・保健所",
		lineTension: 0, data : data_cc ,borderColor: 'cyan'}

	const unit_dd =	{ label: "民間検査会社",
		lineTension: 0, data : data_dd, borderColor: 'yellow' }

	const unit_ee =	{ label: "大学",
		lineTension: 0, data : data_ee, borderColor: 'magenta' }

	graph_data['datasets'].push(unit_aa)
	graph_data['datasets'].push(unit_bb)
	graph_data['datasets'].push(unit_cc)
	graph_data['datasets'].push(unit_dd)
	graph_data['datasets'].push(unit_ee)

	return graph_data
}

// ----------------------------------------------------------------------
function prog01 (graph_data)
{
	var options = {}

	const config = {
		type: 'line',
		data: graph_data,
		options: options
		}

	const context = jQuery("#chart")
	const chart = new Chart(context,config)
}

// ----------------------------------------------------------------------
