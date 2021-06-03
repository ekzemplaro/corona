#! /usr/bin/node
// ---------------------------------------------------------------
//	merge.js
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
function merge_proc(dict_pref,dict_vaccine)
{
	var dict_merged = new Object ()
	
	for (var pref in dict_pref)
		{
		dict_merged[pref] = new Object ()
		dict_merged[pref]["over_65"] = dict_pref[pref].over_65
		dict_merged[pref]["code"] = dict_vaccine[pref].code
		dict_merged[pref]["1"] = dict_vaccine[pref]["1"]
		dict_merged[pref]["2"] = dict_vaccine[pref]["2"]
		dict_merged[pref]["3"] = dict_vaccine[pref]["3"]
		const code = dict_vaccine[pref]["code"]
		console.log(pref,code)
		}

	return dict_merged
}

// ---------------------------------------------------------------
function array_to_dict_proc(array_vaccine)
{
	var dict_vaccine = new Object ()

	for (var it in array_vaccine)
		{
		const unit_aa = array_vaccine[it]
		if (unit_aa["0"])
			{
			const code = unit_aa["0"].substring(0,2)
			if (isFinite(code))
				{
//				console.log(unit_aa["0"],code)
				const pref = unit_aa["0"].substring(3,)
				if (1 < pref.length)
					{
//				console.log(unit_aa["0"],code,pref)
				dict_vaccine[pref] = new Object ()
				dict_vaccine[pref]["code"] = code
				dict_vaccine[pref]["1"] = unit_aa["1"]
				dict_vaccine[pref]["2"] = unit_aa["2"]
				dict_vaccine[pref]["3"] = unit_aa["3"]
					}
				}
			}
		}  

	return dict_vaccine
}

// ---------------------------------------------------------------
console.error ("*** 開始 ***")
//
const file_pref=process.argv[2]
const file_vaccine=process.argv[3]
const file_out=process.argv[4]

console.log (file_pref)

if (fs.existsSync(file_pref))
	{
	const str_pref = fs.readFileSync (file_pref,'utf8')
	const dict_pref = JSON.parse (str_pref)

	const str_vaccine = fs.readFileSync (file_vaccine,'utf8')
	const array_vaccine = JSON.parse (str_vaccine)

	const dict_vaccine = array_to_dict_proc(array_vaccine)
	const dict_merged = merge_proc(dict_pref,dict_vaccine)


	json_write_proc(file_out,dict_merged)
	}
else
	{
	console.error ("*** error *** " + file_pref+ " doesn't exist. ***")
	}

// ---------------------------------------------------------------
