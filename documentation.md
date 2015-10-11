# Installation #

The current release works with both Mozilla Browser and Firefox on win32 and with linux.

To install mozImage read the ReleaseNotes and then download the xpi [here](https://addons.mozilla.org/firefox/addon/mozimage/).

Once installed, a new menu item should appear under MozillaFirefox tools menu; click on this new menu item to open mozImage sidebar.

# Web page analysis #

There are two ways to open mozImage: through the tools menu and with the context menu of the current web page. With this last method mozImage reads the current page in search of links that point to an image. If the link itself is an image mozImage will display the image on the left of the link name (you must enable the thumbnails on the options panel).

# Configuring macros #

This release of mozImage offers the possibility of creating some macros. This macros allow you to use external applications to enhanche mozImage. For example you can use [ImageMagick](http://www.imagemagick.org/) to rotate or resize an image. If you go to the "macro|Config macro" menu, you will find a configuration panel that allows you to create your own macros. This panel consists of two columns: name and macro. In the "name" column you can insert a symbolic name, for example "Rotate 90°", while in the "macro" column you must write the command line to run the external application, for example:

```
'C:\Program files\ImageMagick6\convert.exe' %f -rotate 90 %f
```

If the application name contains some spaces, it’s important to enclose its path in quotes. In this example the %f will be replaced by the name of the current image. See also the [screenshots](screenshots.md).

# Bookmarks #

The bookmarks concept is much like that of a browser: when you are seeing the images inside a folder you can click on the "add bookmark" button and that folder will go to your bookmarks.

The bookmarks are stored on a file named _mozimage-bookmarks.txt_ on your profile directory, with name and directory separated by a new line.

# MozImage edit #

This module was developed by My Hoang and offers you the possibility to modify images throught [ImageMagick](http://www.imagemagick.org/). So you must first install ImageMagick then open the options panel of mozImage and fill the voice named "Path to convert" with the main executable of ImageMagick, for examples:

```
C:\Program files\ImageMagick6\convert.exe
```

# Shortcuts #

MozImage provide many single key shortcuts. Thus, you only have to press a single key (without ctrl, alt, etc) to activate a function.

  * **b**: View prior image
  * **n**: View next image
  * **c**: Clear image
  * **i**: Zoom in
  * **o**: Zoom out
  * **a**: Autosize
  * **s**: Slide show
  * **1**: 1st configured tool
  * **2**: 2nd configured tool
  * **3**: 3rd configured tool
  * **4**: 4th configured tool

# Old releases #

Click [here](http://mozimage.mozdev.org/) to see all releases

# License #

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA