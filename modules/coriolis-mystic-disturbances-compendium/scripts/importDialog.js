import { importContent } from './import.js';
import { moduleTitle } from './constants.js';

export class ImportModuleDialog extends Dialog {
  constructor() {
    const diagOpts = {
      width: 500,
    };
    super(
      {
        title: `Import ${moduleTitle}`,
        content: `
<div>
<h1>Mystic Disturbances</h1>
<hr />
<p>This will import the following in the <em>Coriolis Mystic Disturbances</em> item folder:</p>
<ul>
<li>7 Items (mystic disturbances as talents)</li>
</div>
`,
        buttons: {
          initialize: {
            label: 'Import Compendium',
            callback: async () => {
              const imported = await importContent();
              if (imported) {
                ui.notifications.notify(
                  'Coriolis Mystic Disturbances imported successfully.'
                );
              } else {
                ui.notifications.notify('Import cancelled.');
              }
            },
          },
          cancel: {
            label: 'Cancel',
            callback: async () => {
              ui.notifications.notify('Import cancelled.');
            },
          },
        },
      },
      diagOpts
    );
  }
}
