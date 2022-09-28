import { moduleScopeKey } from './constants.js';
import { getSingleFolder, createFolderPath, DIRECTORIES } from './folders.js';

const ROOT_DIR_FOLDER_NAME = 'Coriolis Mystic Disturbances';
const ITEMS_PACK = `${moduleScopeKey}.coriolis-mystic-disturbances`;

export async function importContent() {
  const folder = getSingleFolder(null, ROOT_DIR_FOLDER_NAME, DIRECTORIES.item);
  if (!!folder) {
    ui.notifications.notify(
      `Item folder ${ROOT_DIR_FOLDER_NAME} already exists.`
    );
    return false;
  } else {
    await createFolderPath(ROOT_DIR_FOLDER_NAME, DIRECTORIES.item, '#000000');
    await importItems();
    return true;
  }
}

async function importItems() {
  const pack = game.packs.get(ITEMS_PACK);
  if (!pack) {
    console.warn('items pack not found');
    return;
  }
  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    const targetFolder = getSingleFolder(
      null,
      ROOT_DIR_FOLDER_NAME,
      DIRECTORIES.item
    );
    game.items.importFromCompendium(pack, entity.id, {
      folder: targetFolder.id,
    });
  }
}
