// ----------------------------------------------------------------------
//	inspect.js
//
//					Mar/13/2020
// ----------------------------------------------------------------------
const file_json = "data.json"

jQuery.getJSON(file_json,function (data)
	{
	jQuery("#outarea_aa").text ("*** start ***")
	const graph_data = convert01(data)
	jQuery("#outarea_cc").text (graph_data.labels.toString())
	jQuery("#outarea_dd").text (graph_data.datasets[0].data.toString())
	prog01 (graph_data)
	jQuery("#outarea_hh").text ("*** end ***")
	})


// ----------------------------------------------------------------------
function convert01(data)
{
	var count = 0
	var labels = []
	var numbers = []
	var number_before = 0
	for (it in data.transition)
		{
		if (0 < it)
			{
			number_before = data.transition[it-1][3]
			}

		unit = data.transition[it]
		if ((2 < unit[0]) && (4 < unit[1]))
			{
			const label = String(unit[0]) + "-" + String(unit[1])
			labels.push(label)
			const number = unit[3] - number_before
			numbers.push(number)
			count += 1
			}
		}

	graph_data = {}

	graph_data['labels'] = labels
	graph_data['datasets'] = []

	const unit_aa =		{
		label: "Inspect",
		lineTension: 0,
		data : numbers
		}

	graph_data['datasets'].push(unit_aa)

	jQuery("#outarea_bb").text ("count = " + count)

	return graph_data
}

// ----------------------------------------------------------------------
function prog01 (graph_data)
{
	const config = {
		type: 'line',
		data: graph_data
		}

	const context = jQuery("#chart")
	const chart = new Chart(context,config)
}

// ----------------------------------------------------------------------
