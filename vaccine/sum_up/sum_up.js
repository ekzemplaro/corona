#! /usr/bin/node
// ---------------------------------------------------------------
//	sum_up.js
//
//						Jun/06/2021
// ---------------------------------------------------------------
'use strict'

const ndjson = require('ndjson')
var fs = require("fs")

const file_in=process.argv[2]
const file_json=process.argv[3]
console.log (file_in)

var first = Array(47)
var second = Array(47)
first.fill(0)
second.fill(0)

fs.createReadStream(file_in)
	.pipe(ndjson.parse())
	.on('data', function(obj) {
	const pref = obj.prefecture
	const index = parseInt(pref,10) - 1
	if (obj.age == "65-")
		{
		if (obj.status == 1)
			{
			first[index] += obj.count
			}
		else if (obj.status == 2)
			{
			second[index] += obj.count
			}
		}
  })

	.on('end', function() {
		var data_out = new Object()
		for (var it in first)
			{
			const jt = parseInt(it) + 1
			const code_pref = ("00" + jt).slice( -2 )
			var unit_aa = new Object()
			unit_aa["first"] = first[it]
			unit_aa["second"] = second[it]
			data_out[code_pref] = unit_aa
			}

		const json_str = JSON.stringify(data_out)
		fs.writeFile (file_json,json_str,function (err)
	{
	if (err) {
		console.error ("Error on write: " + err)
		}
	else {
		console.log("File written.")
		console.error ("*** 終了 ***")
		}
	})	
//		console.log ("num_first = " + first[8])
//		console.log ("num_second = " + second[8])
		console.log("*** end ***")
	})


// ---------------------------------------------------------------
