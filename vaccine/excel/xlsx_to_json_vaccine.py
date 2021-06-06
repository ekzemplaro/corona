#! /usr/bin/python
# -*- coding: utf-8 -*-
#
#	xlsx_to_json_vaccine.py
#
#					May/07/2021
# ------------------------------------------------------------------
import sys
import pandas as pd
#
# ------------------------------------------------------------------
sys.stderr.write("*** 開始 ***\n")
#
file_xlsx = sys.argv[1]
file_json = sys.argv[2]
sys.stderr.write(file_xlsx + "\n")
sys.stderr.write(file_json + "\n")
#
df=pd.read_excel(file_xlsx,header=None)
#
#
df.to_json(file_json,orient='records')
sys.stderr.write("*** 終了 ***\n")
# ------------------------------------------------------------------
