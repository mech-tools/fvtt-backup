import {
  importContent,
  isImportedModule,
  setModuleImported,
  updateMigrationVersionToLatest,
} from "./import.js";
import { moduleScopeKey, moduleTitle } from "./constants.js";

Hooks.on("init", () => {
  game.settings.register(moduleScopeKey, "imported", {
    name: "Imported Compendiums",
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });
  game.settings.register(moduleScopeKey, "migrationVersion", {
    name: "Imported Version",
    scope: "world",
    config: false,
    type: String,
    default: "0",
  });
  game.settings.registerMenu(moduleScopeKey, "import", {
    name: "Import Compendiums",
    label: "Import",
    hint: "Welcome to Coriolis - Emissary Lost!  Click above to import the content to your world.",
    type: ImportFormWrapper, // TODO
    restricted: true,
  });
});

Hooks.on("ready", () => {
  const requiredMinSystemVersion = "2.1.0";
  const current = game.system.version;
  if (isNewerVersion(requiredMinSystemVersion, current)) {
    throw Dialog.prompt({
      title: "System version below minimum requirement",
      content:
        "<h3>Your Coriolis system is below the minimum required version.</h3><p>Please update your Coriolis system before attempting to use this module.</p>",
      label: "Okay",
      callback: () =>
        ui.notifications.warn(
          "Aborted importing of compendium content. Please update your system and try again",
        ),
    });
  } else {
    //TODO: re-enable this!
    // check if we haven't imported before. otherwise start the import process
    if (!isImportedModule()) {
      new ImportModuleDialog().render(true);
    }
  }
});
class ImportFormWrapper extends FormApplication {
  render() {
    new ImportModuleDialog().render(true);
  }
}

class ImportModuleDialog extends Dialog {
  constructor() {
    // handle any pre-flight checks before starting the import process
    const diagOpts = {
      width: 650,
      height: 900,
      classes: ["dialog", "intro-dialog"],
    };

    super(
      {
        title: `Import ${moduleTitle}`,
        content: `
<div class="entryBGVTT">
<div class="entryContainer">
<div class="entryContent">
<h1>Emissary Lost</h1>
<hr />
<p>This will import the following Coriolis Emissary Lost content into your world and organize them into folders:</p>
<ul>
<li>222 Items (armor, gear, talents, weapons, injuries, ship features, ship modules, ship problems, etc)</li>
<li>60 Journal entries (full core rules and some example scenarios)</li>
<li>68 Actors (Beasts, djinni, NPCs, ships)</li>
<li>7 Rollable tables (critical injuries, failure tables, encounters, faction names, etc)</li>
<li>11 Scenes (maps, locations, and player handouts)</li>
</ul>
<p>Published by: <strong>Free League Publishing</strong><br />Foundry adaptation by <strong>Alex Okafor</strong></p>
<p><a href="https://freeleaguepublishing.com/en/">Free League</a></p>
<div class="coreCenteredImageContainer"><img src="modules/coriolis-emissarylost/images/logos.webp" /></div>
</div>
</div>
</div>
`,
        buttons: {
          initialize: {
            label: "Import!",
            callback: async () => {
              await importContent();
              await setModuleImported(true);
              await updateMigrationVersionToLatest();
              await showIntro();
              ui.notifications.notify(
                "Coriolis Emissary Lost import completed successfully.",
              );
            },
          },
          cancel: {
            label: "Cancel",
            callback: async () => {
              await setModuleImported(true);
              ui.notifications.notify(
                "Import cancelled. If you wish to import at a later time, you can do so via the module settings menu.",
              );
            },
          },
        },
      },
      diagOpts,
    );
  }
}

async function showIntro() {
  setTimeout(() => {
    try {
      game.scenes.getName("Coriolis - Emissary Lost").activate();
      game.journal.getName("Emissary Lost - How To Use This Module").show(); // TODO: make sure to direct to Emissary Lost 'how to'
      // game.playlists.getName("Coriolis Soundtrack").playAll();
    } catch (e) {
      console.error("failed to load intro", e);
    }
  }, 500);
}
