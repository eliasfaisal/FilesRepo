'''
Setup Script Files Repo 
=======================
Author : ELias Faisal
Github : github.com/eliasfaisal
Date   : 14 Sep 2022 | 16:58

init.setup file pattern
-------------------
[subject name]
[subject folder name]
[semester number]

example
-------
Computer Science Introduction 
computer-science-introduction
2
'''

import os
import json

# make things shorter
jsdec = json.JSONDecoder().decode
jsenc = json.JSONEncoder().encode

def build():
	# files in the directory
	files = os.listdir()

	# read and parse setup file
	setupFile = open("init.setup","r")
	setupFileData = setupFile.read().split("\n")
	setupFile.close()

	# terminate if file not compatible
	if len(setupFileData) < 3:
		exit()

	# move files to target dir and create folder if not excisted
	os.chdir(f'../subjects/semester-{setupFileData[2]}-subjects')
	if setupFileData[1] not in os.listdir():
		os.mkdir(setupFileData[1])
	os.chdir(f'{setupFileData[1]}')
	os.system("rm ../../../setup/init.setup")
	os.system(f"mv ../../../setup/* ./")

	# read and decode config file
	configFile = open("../../config.json","r")
	configFileData = jsdec(configFile.read())
	configFile.close()

	# modify config and update
	loc = f"Semester {setupFileData[2]}"
	if setupFileData[1] not in configFileData[loc]["subjects"]:
		configFileData[loc]["subjects"][setupFileData[1]] = {"name":"","files":[]}
		configFileData[loc]["subjects"][setupFileData[1]]["name"] = setupFileData[0]
	for file in files:
		if file != "init.setup" and file != ".nofile":
			configFileData[loc]["subjects"][setupFileData[1]]["files"].append(file)
	
	# write the updated config file
	configFile = open("../../config.json","w")
	configFile.write(jsenc(configFileData))
	configFile.close()


build()