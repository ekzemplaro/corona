#! /usr/bin/node
// ---------------------------------------------------------------
//	pick_japan.js
//
//					May/22/2021
//
// ---------------------------------------------------------------
'use strict'

var fs = require("fs")
// ---------------------------------------------------------------
console.error ("*** 開始 ***")

const file_world=process.argv[2]
const file_japan=process.argv[3]
console.error (file_world)
console.error (file_japan)

const json_str = fs.readFileSync (file_world,'utf8')
const array_aa = JSON.parse (json_str)
console.error (array_aa.length)

var data_japan = {}
for (var it in array_aa)
	{
	const unit_aa = array_aa[it]
	if (unit_aa.country == "Japan")
		{
		console.log (unit_aa.country)
		data_japan = unit_aa
		}
	}

const json_out = JSON.stringify(data_japan)

fs.writeFile (file_japan,json_out,function (err)
	{
	if (err) {
		console.error ("Error on write: " + err)
		}
	else {
		console.log("File written.")
		console.error ("*** 終了 ***")
		}
	})
// ---------------------------------------------------------------
