#! /usr/bin/node
// ---------------------------------------------------------------
//	population_gen.js
//
//						Jun/01/2021
// ---------------------------------------------------------------
'use strict'

var fs = require("fs")
// ---------------------------------------------------------------
function text_read_proc(file_in)
{
	var dict_aa = new Object ()
	const data = fs.readFileSync (file_in,'utf8')

	const lines_in = ("" + data).split ("\n")

	lines_in.forEach (function(line)
		{
		const separator_string = /\s+/
		const rr = line.split (separator_string)
		const pref = rr[1]
//		if (1< pref.length)
		if (pref)
			{
			const number = rr[3]
			const removed = number.replace(/,/g, '')
			const pp = parseInt(removed,10) * 1000
			dict_aa[pref] = {"over_65": pp}
			console.log(pref)
			}
		})

	return dict_aa
}

// ---------------------------------------------------------------
function json_write_proc(file_json,dict_aa)
{
	const json_str = JSON.stringify(dict_aa)

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
}

// ---------------------------------------------------------------
console.error ("*** 開始 ***")
//
const file_in=process.argv[2]
const file_pref=process.argv[3]
const file_json=process.argv[4]

console.log (file_in)

if (fs.existsSync(file_in))
	{
	const dict_aa = text_read_proc(file_in)

	json_write_proc(file_json,dict_aa)
	}
else
	{
	console.error ("*** error *** " + file_in + " doesn't exist. ***")
	}

// ---------------------------------------------------------------
