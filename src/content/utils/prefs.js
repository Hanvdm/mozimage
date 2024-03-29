mozimage.include("chrome://mozimage/content/utils/file.js");

mozimage.ns("mozimage.utils");

mozimage.utils.Prefs = mozimage.define({

	JS_PREFS_CID : "@mozilla.org/preferences-service;1", //"@mozilla.org/preferences;1";

	JS_PREFS_I_PREF : "nsIPrefService", //"nsIPrefBranch"; //"nsIPref";

	PREF_INVALID : 0,

	PREF_STRING : 32,

	PREF_INT : 64,

	PREF_BOOL : 128,

	init : function (aPrefRoot) {
		// create instance of prefs xpcom object
		//this.prefInst = mozimage.createInstance(JS_PREFS_CID, JS_PREFS_I_PREF);
		this.prefServiceInst = mozimage.createInstance(this.JS_PREFS_CID, this.JS_PREFS_I_PREF);
		this.prefInst = this.prefServiceInst.getBranch(aPrefRoot);
		/////this.prefInst = mozimage.qIntf(this.prefInst, "nsIPrefBranch");

		// support nsIPref method names
		this.addMethods();
	},

	prefInst: null,
	getPrefType: null,
	getBoolPref: null,
	setBoolPref: null,
	setCharPref: null,
	getCharPref: null,
	setIntPref: null,
	getIntPref: null,
	ResetPrefs: null,
	ResetUserPrefs: null,
	savePrefFile: null,
	ClearUserPref: null,

	/*********** GET Type ****************/
	// pref type
	getType: function (aPrefName) {
		return this.prefInst.getPrefType(aPrefName);
	},

	/*********** EXISTS *****************/
	isValid: function (aPrefName) {
		if (!aPrefName)
			throw Error("NS_ERROR_XPC_NOT_ENOUGH_ARGS");

		return (this.prefInst.getPrefType(aPrefName) != this.PREF_INVALID);
	},

	/*********** SET BOOL ****************/
	setBool: function (aPrefName, aInBool) {
		if (!aPrefName)
			throw Error("NS_ERROR_XPC_NOT_ENOUGH_ARGS");

		this.prefInst.setBoolPref(aPrefName, aInBool);
	},

	/*********** GET BOOL ****************/
	getBool: function (aPrefName, defaulValue) {
		var value = defaulValue;
		if (!aPrefName)
			throw Error("NS_ERROR_XPC_NOT_ENOUGH_ARGS");

		if (this.isValid(aPrefName)) {
			value = this.prefInst.getBoolPref(aPrefName);
		}
		return value;
	},

	/*********** SET CHAR PREF ***********/
	setChar: function (aPrefName, aPrefString) {
		if (!aPrefName && !aPrefString)
			throw Error("NS_ERROR_XPC_NOT_ENOUGH_ARGS");

		this.prefInst.setCharPref(aPrefName, aPrefString);
	},

	/*********** GET CHAR PREF ***********/
	getChar: function (aPrefName, defaulValue) {
		var value = defaulValue;
		if (!aPrefName)
			throw Error("NS_ERROR_XPC_NOT_ENOUGH_ARGS");

		if (this.isValid(aPrefName)) {
			value = this.prefInst.getCharPref(aPrefName);
		}
		return value;
	},

	/*********** SET INT PREF ***********/
	setInt: function (aPrefName, aInt) {
		if (!aPrefName && !aInt)
			throw Error("NS_ERROR_XPC_NOT_ENOUGH_ARGS");

		this.prefInst.setIntPref(aPrefName, aInt);
	},

	/*********** GET INT PREF ***********/
	getInt: function (aPrefName, defaulValue) {
		var value = defaulValue;
		if (!aPrefName)
			throw Error("NS_ERROR_XPC_NOT_ENOUGH_ARGS");

		if (this.isValid(aPrefName)) {
			value = this.prefInst.getIntPref(aPrefName);
		}
		return value;
	},

	/*********** RESET PREF *************/
	reset: function () {
		this.prefServiceInst.resetPrefs();
	},

	/*********** RESET USER PREF ********/
	resetUser: function () {
		this.prefServiceInst.resetUserPrefs();
	},

	/*********** SAVE PREF **************/
	save: function (aFile) {
		var file;
		switch (typeof(aFile)) {
			case "object":
				// check object is an nsIFile object
				if (typeof(aFile.path) == "string") {
					file = aFile;
				} else {
					throw Error("prefs.save: aFile should be a valid file object or a file name");
				}
				break;

			case "string":
				// path is a string, make it into an nsIFile
				file = (new mozimage.utils.File(aFile)).nsIFile;
				break;
		}

		this.prefServiceInst.savePrefFile(file);
	},

	/*********** CLEAR USER PREF ********/
	clear: function (aPrefName) {
		this.prefInst.ClearUserPref(aPrefName);
	},

	/*********** GET NSIPREF ********/
	get nsIPref() {
		return this.prefInst;
	},

	/*********** SUPPORT NSIPREF METHODS ********/
	addMethods: function () {
		this.getPrefType = this.getType;
		this.setBoolPref = this.setBool;
		this.getBoolPref = this.getBool;
		this.setCharPref = this.setChar;
		this.getCharPref = this.getChar;
		this.setIntPref = this.setInt;
		this.getIntPref = this.getInt;
		this.ResetPrefs = this.reset;
		this.ResetUserPrefs = this.resetUser;
		this.savePrefFile = this.save;
		this.ClearUserPref = this.clear;
	}

}); // END CLASS
