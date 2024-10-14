export const DIRECTORIES = {
  journal: 'JournalEntry',
  item: 'Item',
  actor: 'Actor',
  playlist: 'Playlist',
  table: 'RollTable',
  scene: 'Scene',
};

export async function createFolderPath(folderPath, directory, color) {
  return _createFolderPath(null, folderPath, directory, color);
}

async function _createFolderPath(parentId, folderPath, directory, color) {
  const elements = folderPath.split('/');
  if (elements.length === 1) {
    if (!singleFolderExists(parentId, elements[0], directory)) {
      return createSingleFolder(parentId, elements[0], directory, color);
    }
    return getSingleFolder(parentId, elements[0], directory);
  }

  const rootElement = elements.shift();
  const restOfPath = elements.join('/');
  let rootFolder = getSingleFolder(parentId, rootElement, directory);
  if (rootFolder === undefined) {
    rootFolder = await createSingleFolder(parentId, rootElement, directory);
  }
  return _createFolderPath(rootFolder.id, restOfPath, directory);
}

function singleFolderExists(parentId, folderName, directory) {
  return !!getSingleFolder(parentId, folderName, directory);
}

export function getSingleFolder(parentId, folderName, directory) {
  return game.folders.find((f) => {
    return (
      (f.parentFolder?.id ?? null) === parentId &&
      f.name === folderName &&
      f.type === directory
    );
  });
}

async function createSingleFolder(parentId, folderName, directory, color) {
  return Folder.create({
    name: folderName,
    type: directory,
    color: color,
    folder: parentId,
  });
}
