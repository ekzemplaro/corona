#! /usr/bin/node
// ---------------------------------------------------------------
//	merge.js
//
//						Jun/07/2021
// ---------------------------------------------------------------
'use strict'

var fs = require("fs")
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
function merge_proc(dict_pref,dict_vaccine_new)
{
	var dict_merged = new Object ()
	
	for (var pref in dict_pref)
		{
		const code = dict_vaccine_new[pref]["code"]
		dict_merged[pref] = new Object ()
		dict_merged[pref]["over_65"] = dict_pref[pref].over_65
		dict_merged[pref]["code"] = code
		dict_merged[pref]["first"] = dict_vaccine_new[pref]["first"]
		dict_merged[pref]["second"] = dict_vaccine_new[pref]["second"]
		console.log(pref,code)
		}

	return dict_merged
}

// ---------------------------------------------------------------
function vaccine_key_convert_proc(dict_vaccine,dict_code_pref)
{
	var dict_vaccine_new = new Object ()

	for (var key in dict_vaccine)
		{
		const pref = dict_code_pref[key]
		dict_vaccine_new[pref] = dict_vaccine[key]
		dict_vaccine_new[pref]["code"] = key
		}  

	return dict_vaccine_new
}

// ---------------------------------------------------------------
console.error ("*** 開始 ***")
//
const file_pref=process.argv[2]
const file_vaccine=process.argv[3]
const file_code_pref=process.argv[4]
const file_out=process.argv[5]

console.log (file_pref)

if (fs.existsSync(file_pref))
	{
	const str_pref = fs.readFileSync (file_pref,'utf8')
	const dict_pref = JSON.parse (str_pref)

	const str_vaccine = fs.readFileSync (file_vaccine,'utf8')
	const dict_vaccine = JSON.parse (str_vaccine)

	const str_code_pref = fs.readFileSync (file_code_pref,'utf8')
	const dict_code_pref = JSON.parse (str_code_pref)

	const dict_vaccine_new = vaccine_key_convert_proc(dict_vaccine,dict_code_pref)
	const dict_merged = merge_proc(dict_pref,dict_vaccine_new)


//	json_write_proc(file_out,dict_vaccine_new)
	json_write_proc(file_out,dict_merged)
	}
else
	{
	console.error ("*** error *** " + file_pref+ " doesn't exist. ***")
	}

// ---------------------------------------------------------------
