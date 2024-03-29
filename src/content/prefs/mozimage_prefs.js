mozimage.include("chrome://mozimage/content/utils/prefs.js");

mozimage.Prefs = mozimage.define({

	init : function () {
		this.prefs = new mozimage.utils.Prefs();
		this.load();
	},

	load: function () {
		this.homeDir = this.prefs.getChar("extensions.mozimage.home_directory", "");
		this.autoSize = this.prefs.getBool("browser.enable_automatic_image_resizing");
		this.slideshow = this.prefs.getBool("extensions.mozimage.slideshow");
		this.delay = this.prefs.getInt("extensions.mozimage.delay");
		this.zoom = this.prefs.getChar("extensions.mozimage.zoom", "");
		this.listCollapsed = false;
		this.thumbSize = this.prefs.getChar("extensions.mozimage.thumbsize", "");
		this.orderBy = this.prefs.getChar("extensions.mozimage.orderby", "");
		this.descending = this.prefs.getBool("extensions.mozimage.descending");
		this.forceHttpTumb = this.prefs.getBool("extensions.mozimage.forcehttptumb");
		if (this.prefs.getType("extensions.mozimage.enablecache") == mozimage.utils.Prefs.PREF_INVALID)
			this.enableCache = false;
		else
			this.enableCache = this.prefs.getBool("extensions.mozimage.enablecache");

		if (this.prefs.getType("extensions.mozimage.enablecurrent") == mozimage.utils.Prefs.PREF_INVALID)
			this.enableCurrent = true;
		else
			this.enableCurrent = this.prefs.getBool("extensions.mozimage.enablecurrent");

		this.convertPath = this.prefs.getChar("extensions.mozimage.convertpath", "");

		this.editorName1 = this.prefs.getChar("extensions.mozimage.editorname_1", "");
		this.editorPath1 = this.prefs.getChar("extensions.mozimage.editorpath_1", "");
		this.editorName2 = this.prefs.getChar("extensions.mozimage.editorname_2", "");
		this.editorPath2 = this.prefs.getChar("extensions.mozimage.editorpath_2", "");
		this.editorName3 = this.prefs.getChar("extensions.mozimage.editorname_3", "");
		this.editorPath3 = this.prefs.getChar("extensions.mozimage.editorpath_3", "");
		this.editorName4 = this.prefs.getChar("extensions.mozimage.editorname_4", "");
		this.editorPath4 = this.prefs.getChar("extensions.mozimage.editorpath_4", "");

		this.macroName = [];
		this.macroCode = [];

		for (var i = 0; i < 10; i++) {
			this.macroName[i] = this.prefs.getChar("extensions.mozimage.macroname_" + i, "");
			this.macroCode[i] = this.prefs.getChar("extensions.mozimage.macrocode_" + i, "");
		}

		var extListStr = this.prefs.getChar("extensions.mozimage.extlist", "");

		if (this.orderBy == "")
			this.orderBy = "nume";

		if (this.thumbSize == "")
			this.thumbSize = 64;
		else
			this.thumbSize = Number(this.thumbSize);

		if (extListStr == "")
			this.extList = new Array("jpg", "jpeg", "gif", "bmp", "png");
		else
			this.parseExtStr(extListStr);


		if (this.delay <= 0)
			this.delay = 2000;
		if (this.zoom <= 1)
			this.zoom = 1.5;

		// get default image directory
		if (this.homeDir == "") {
			this.firstRun = true;
			mozimage.include("chrome://mozimage/content/utils/specialDir.js");
			var dirUtils = new mozimage.utils.SpecialDir();
			this.homeDir = dirUtils.getPath("Pct");
			if (!this.homeDir) {
				this.homeDir = dirUtils.getPath("XDGPict");
			}
			if (!this.homeDir) {
				this.homeDir = dirUtils.getPath("Pers");
			}
			if (!this.homeDir) {
				this.homeDir = dirUtils.getHomeDir();
			}
		}
	},

	parseExtStr: function (extListStr) {

		var ext = "";
		this.extList = [];

		for (var i = 0; i < extListStr.length; i++) {
			if (extListStr[i] == ",") {
				this.extList.push(ext);
				ext = "";
			}
			else
				ext = ext + extListStr[i];
		}
		if (ext != "")
			this.extList.push(ext);
	},

	save: function () {
		this.prefs.setChar("extensions.mozimage.extlist", this.extList.toString());
		this.prefs.setChar("extensions.mozimage.home_directory", this.homeDir);
		this.prefs.setBool("browser.enable_automatic_image_resizing", this.autoSize);
		this.prefs.setBool("extensions.mozimage.slideshow", this.slideshow);
		this.prefs.setInt("extensions.mozimage.delay", this.delay);
		this.prefs.setChar("extensions.mozimage.zoom", this.zoom);
		this.prefs.setChar("extensions.mozimage.thumbsize", this.thumbSize);
		this.prefs.setChar("extensions.mozimage.orderby", this.orderBy);
		this.prefs.setBool("extensions.mozimage.descending", this.descending);
		this.prefs.setBool("extensions.mozimage.forcehttptumb", this.forceHttpTumb);
		this.prefs.setBool("extensions.mozimage.enablecache", this.enableCache);
		this.prefs.setBool("extensions.mozimage.enablecurrent", this.enableCurrent);
		this.prefs.setChar("extensions.mozimage.convertpath", this.convertPath);
		this.prefs.setChar("extensions.mozimage.editorname_1", this.editorName1);
		this.prefs.setChar("extensions.mozimage.editorpath_1", this.editorPath1);
		this.prefs.setChar("extensions.mozimage.editorname_2", this.editorName2);
		this.prefs.setChar("extensions.mozimage.editorpath_2", this.editorPath2);
		this.prefs.setChar("extensions.mozimage.editorname_3", this.editorName3);
		this.prefs.setChar("extensions.mozimage.editorpath_3", this.editorPath3);
		this.prefs.setChar("extensions.mozimage.editorname_4", this.editorName4);
		this.prefs.setChar("extensions.mozimage.editorpath_4", this.editorPath4);

		for (var i = 0; i < 10; i++) {
			this.prefs.setChar("extensions.mozimage.macroname_" + i, this.macroName[i]);
			this.prefs.setChar("extensions.mozimage.macrocode_" + i, this.macroCode[i]);
		}
	},

	getHomeDir: function () {
		return(this.homeDir);
	},

	setHomeDir: function (aValue) {
		this.homeDir = aValue;
	},

	getListCollapsed: function () {
		return(this.listCollapsed);
	},

	setListCollapsed: function (aValue) {
		this.listCollapsed = Boolean(aValue);
	},

	getExtList: function () {
		return(this.extList);
	},

	setExtList: function (aValue) {
		this.extList = aValue;
	},

	getAutoSize: function () {
		return(Boolean(this.autoSize));
	},

	setAutoSize: function (aValue) {
		this.autoSize = Boolean(aValue);
	},

	getSlideshow: function () {
		return(Boolean(this.slideshow));
	},

	setSlideshow: function (aValue) {
		this.slideshow = Boolean(aValue);
	},

	getDelay: function () {
		return(Number(this.delay));
	},

	setDelay: function (aValue) {
		this.delay = Number(aValue);
	},

	getZoom: function () {
		return(Number(this.zoom));
	},

	setZoom: function (aValue) {
		this.zoom = Number(aValue);
	},

	getThumbSize: function () {
		return(Number(this.thumbSize));
	},

	setThumbSize: function (aValue) {
		this.thumbSize = Number(aValue);
	},

	getOrderBy: function () {
		return(this.orderBy);
	},

	setOrderBy: function (aValue) {
		this.orderBy = aValue;
	},

	getDescending: function () {
		return(Boolean(this.descending));
	},

	setDescending: function (aValue) {
		this.descending = Boolean(aValue);
	},

	getForceHttpTumb: function () {
		return(Boolean(this.forceHttpTumb));
	},

	setForceHttpTumb: function (aValue) {
		this.forceHttpTumb = Boolean(aValue);
	},

	getEnableCache: function () {
		return(Boolean(this.enableCache));
	},

	setEnableCache: function (aValue) {
		this.enableCache = Boolean(aValue);
	},

	getEnableCurrent: function () {
		return(Boolean(this.enableCurrent));
	},

	setEnableCurrent: function (aValue) {
		this.enableCurrent = Boolean(aValue);
	},

	getMacroName: function () {
		return(this.macroName);
	},

	setMacroName: function (aValue) {
		this.macroName = aValue;
	},

	getMacroCode: function () {
		return(this.macroCode);
	},

	setMacroCode: function (aValue) {
		this.macroCode = aValue;
	},

	getConvertPath: function () {
		return(this.convertPath);
	},

	setConvertPath: function (aValue) {
		this.convertPath = aValue;
	},

	getEditorsName: function () {
		return(new Array(this.editorName1, this.editorName2, this.editorName3, this.editorName4));
	},

	setEditorsName: function (aValue) {
		this.editorName1 = aValue[0];
		this.editorName2 = aValue[1];
		this.editorName3 = aValue[2];
		this.editorName4 = aValue[3];
	},

	getEditorsPath: function () {
		return(new Array(this.editorPath1, this.editorPath2, this.editorPath3, this.editorPath4));
	},

	setEditorsPath: function (aValue) {
		this.editorPath1 = aValue[0];
		this.editorPath2 = aValue[1];
		this.editorPath3 = aValue[2];
		this.editorPath4 = aValue[3];
	}

}); // END CLASS

/*
 **
 ** Predefined instance of the preferences class
 ** do not use any other instances
 **
 */

mozimage.prefs = new mozimage.Prefs();
//top.prefs = prefs;
