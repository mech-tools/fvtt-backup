export const DIRECTORIES = {
  journal: "JournalEntry",
  item: "Item",
  actor: "Actor",
  playlist: "Playlist",
  table: "RollTable",
  scene: "Scene",
};

// folderPathExists always searches from the root of a directory. Returns
// true/false if the folder path exists.
export function folderPathExists(folderPath, directory) {
  return _folderPathExists(null, folderPath, directory);
}

function _folderPathExists(parentId, folderPath, directory) {
  const elements = folderPath.split("/");
  if (elements.length === 1) {
    return singleFolderExists(parentId, elements[0], directory);
  }

  const rootElement = elements.shift();
  if (!singleFolderExists(parentId, rootElement, directory)) {
    return false;
  }
  const rootFolder = getSingleFolder(parentId, rootElement, directory);

  const restOfPath = elements.join("/");
  return _folderPathExists(rootFolder.id, restOfPath, directory);
}

// createFolderPath creates a folder path in the root of a directory. This will
// skip any already existing folders along the path.
export async function createFolderPath(folderPath, directory, color) {
  return _createFolderPath(null, folderPath, directory, color);
}

async function _createFolderPath(parentId, folderPath, directory, color) {
  const elements = folderPath.split("/");
  if (elements.length === 1) {
    if (!singleFolderExists(parentId, elements[0], directory)) {
      return createSingleFolder(parentId, elements[0], directory, color);
    }
    return getSingleFolder(parentId, elements[0], directory);
  }

  const rootElement = elements.shift();
  const restOfPath = elements.join("/");
  let rootFolder = getSingleFolder(parentId, rootElement, directory);
  if (rootFolder === undefined) {
    rootFolder = await createSingleFolder(parentId, rootElement, directory);
  }
  return _createFolderPath(rootFolder.id, restOfPath, directory);
}

// getFolderAtEndOfPath walks a folder tree and returns the folder entity at the end of it.
export function getFolderAtEndOfPath(folderPath, directory) {
  if (!folderPathExists(folderPath, directory)) {
    return null;
  }
  return _getFolderAtEndOfPath(null, folderPath, directory);
}

function _getFolderAtEndOfPath(parentId, folderPath, directory) {
  const elements = folderPath.split("/");
  if (elements.length === 1) {
    return getSingleFolder(parentId, elements[0], directory);
  }
  const rootElement = elements.shift();
  const restOfPath = elements.join("/");
  let rootFolder = getSingleFolder(parentId, rootElement, directory);
  return _getFolderAtEndOfPath(rootFolder.id, restOfPath, directory);
}

function singleFolderExists(parentId, folderName, directory) {
  return !!getSingleFolder(parentId, folderName, directory);
}

function getSingleFolder(parentId, folderName, directory) {
  return game.folders.find((f) => {
    return (
      // >:( JS in in its infinite wisdom thought having null and undefined were
      // great ideas.
      (f.folder?.id ?? null) === parentId &&
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
    parent: parentId,
  });
}
