import { moduleScopeKey } from './constants.js';
import { ImportModuleDialog } from './importDialog.js';

class ImportFormWrapper extends FormApplication {
  render() {
    new ImportModuleDialog().render(true);
  }
}

Hooks.on('init', () => {
  game.settings.registerMenu(moduleScopeKey, 'import', {
    name: 'Import Compendium',
    label: 'Import',
    hint: 'This will import mystic disturbances as talents in the Coriolis Mystic Disturbances item folder',
    type: ImportFormWrapper,
    restricted: true,
  });
});
