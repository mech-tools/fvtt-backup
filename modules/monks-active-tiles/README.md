## Version 12.01 If you are seeing a "Error: Module validation errors: documentTypes: is not a valid sub-types configuration: 'RegionBehavior' is not a valid document type" issue.  That is an error in Foundry.  There's nothing much I can do about that.  Foundry checks the validation of a manifest before it checks the version of a manifest.  In this case, the manifest checks out correctly in v12, but doesn't in v11 because it fails to consider the version.

# Monk's Active Tile Triggers
Add-On Module for Foundry VTT
Want to teleport, or open doors, or hide characters, or display a message, or play a sound, or change a token's elevation when a token walks over a tile... now you can

## Installation
Simply use the install module screen within the FoundryVTT setup

## Usage & Current Features
When a Tile is drawn on the scene, another tab will be added, called triggers.

![monks-active-tiles](/screenshots/main.png)

On this tab you have access to how the Tile is triggered.  There are many options to choose from, if you want actions to run when a Tile is clicked, or when a token enters the Tile.  You can also trigger the Tile when the scene lighting changes, combat starts, doors are opened, and more.
You also have access to a list of actions that will be performed when the Tile is activated.  This list is quite extensive by now and requires it's own Wiki to fully describe what each action does.  

## Wiki

A very large thank you to Crowguard for creating a wiki for Active Tiles.  Since it contains a lot of options, and changes constantly.  Please visit the site to learn more about how to use Active Tiles and all the actions available.
[https://github.com/ironmonk88/monks-module-wiki/wiki/Monk%27s-Active-Tile-Triggers](https://github.com/ironmonk88/monks-module-wiki/wiki/Monk%27s-Active-Tile-Triggers)

## Bug Reporting
Please feel free to contact me on discord if you have any questions or concerns. ironmonk88#4075
I also have a Discord site called Monk's Discord Server that I use to keep people up to date with changes.

## Support

If you feel like being generous, stop by my <a href="https://www.patreon.com/ironmonk">patreon</a>.  

Or [![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/R6R7BH5MT)

Not necessary but definitely appreciated.

## License
This Foundry VTT module, writen by Ironmonk, is licensed under [GNU GPLv3.0](https://www.gnu.org/licenses/gpl-3.0.en.html), supplemented by [Commons Clause](https://commonsclause.com/).

This work is licensed under Foundry Virtual Tabletop <a href="https://foundryvtt.com/article/license/">EULA - Limited License Agreement for module development from May 29, 2020.</a>
