import { moduleScopeKey } from "./constants.js";
import {
  createFolderPath,
  DIRECTORIES,
  getFolderAtEndOfPath,
} from "./folders.js";

const ROOT_DIR_FOLDER_NAME = "Coriolis - Last Voyage of the Ghazali"; // name of folder in each directory that coriolis content is stored.
const JOURNALS_PACK = `${moduleScopeKey}.journalentry`;
const ITEMS_PACK = `${moduleScopeKey}.item`;
const ACTORS_PACK = `${moduleScopeKey}.actor`;
const TABLES_PACK = `${moduleScopeKey}.table`;
const SCENE_PACK = `${moduleScopeKey}.scene`;

export async function setModuleImported(imported) {
  return game.settings.set(moduleScopeKey, "imported", imported);
}

export function isImportedModule() {
  return game.settings.get(moduleScopeKey, "imported");
}

export async function updateMigrationVersionToLatest() {
  return game.settings.set(
    moduleScopeKey,
    "migrationVersion",
    game.modules.get(moduleScopeKey).version,
  );
}

export async function importContent() {
  // load up our folders.
  await importFolders();
  await importJournals();
  await importItems();
  await importActors();
  // await importPlaylists();
  await importTables();
  await importScenes();
  // await linkScenes();
}

async function importFolders() {
  // go through each db file by type and pull out all folder keys. ie, go
  // through journalEntry, and create journal folders. Since folder names are
  // not unique and don't have a heirachy built into their naming schemes, then
  // a 'folder exists' if and only if the name matches AND chain of parents are
  // correct AND the type (directory) is the same.
  await importFoldersForDirectory(JOURNALS_PACK, DIRECTORIES.journal);
  await importFoldersForDirectory(ITEMS_PACK, DIRECTORIES.item);
  await importFoldersForDirectory(ACTORS_PACK, DIRECTORIES.actor);
  // await importFoldersForDirectory(PLAYLIST_PACK, DIRECTORIES.playlist);
  await importFoldersForDirectory(TABLES_PACK, DIRECTORIES.table);
  await importFoldersForDirectory(SCENE_PACK, DIRECTORIES.scene);
}

async function importFoldersForDirectory(packName, directory) {
  const pathMap = new Map();
  await loadFolderPaths(packName, pathMap);
  for await (const importPath of pathMap.keys()) {
    await createFolderPath(`${importPath}`, directory, "#000000");
  }
}
// loadFolderPaths loads the path into the folder map.
async function loadFolderPaths(packName, folderMap) {
  const pack = game.packs.get(packName);
  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    const importPath = getImportPath(entity);
    if (!importPath) {
      continue;
    }
    if (!folderMap.has(importPath)) {
      folderMap.set(importPath, true);
    }
  }
}

// getImportPath loads the import path of an entity from its flags. NOTE: due to
// how entities are processed in hugo, the first element in the path is
// effectively the Foundry 'Directory' (ie, Journals, Actors, etc). This is
// replaced with the 'ROOT_FOLDER_NAME'.
function getImportPath(entity) {
  const importPath = entity.getFlag(moduleScopeKey, "importPath");
  if (!importPath) {
    return null;
  }
  const pathElements = importPath.split("/");
  // this lops off the 'JournalEntry' root part of the dirPath for normal
  // entries that reside in folders.
  pathElements.shift();
  // if we actually are supposed to be right under the root dir, just return the
  // root dir
  if (pathElements.length === 0) {
    return ROOT_DIR_FOLDER_NAME;
  }
  return `${ROOT_DIR_FOLDER_NAME}/${pathElements.join("/")}`;
}

export function hasImportPath(entity) {
  const importPath = entity.getFlag(moduleScopeKey, "importPath");
  if (!importPath) {
    return false;
  }
  return true;
}

async function importJournals() {
  const pack = game.packs.get(JOURNALS_PACK);
  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    const importPath = getImportPath(entity);
    const targetFolder = getFolderAtEndOfPath(importPath, DIRECTORIES.journal);
    if (entityExists(targetFolder.id, entity)) {
      continue;
    }
    game.journal.importFromCompendium(
      pack,
      entity.id,
      {
        folder: targetFolder.id,
      },
      {
        keepId: true,
      },
    );
  }
}

async function importItems() {
  const pack = game.packs.get(ITEMS_PACK);
  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    const importPath = getImportPath(entity);
    const targetFolder = getFolderAtEndOfPath(importPath, DIRECTORIES.item);
    if (entityExists(targetFolder.id, entity)) {
      continue;
    }
    game.items.importFromCompendium(pack, entity.id, {
      folder: targetFolder.id,
    });
  }
}

async function importActors() {
  const pack = game.packs.get(ACTORS_PACK);
  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    const importPath = getImportPath(entity);
    const targetFolder = getFolderAtEndOfPath(importPath, DIRECTORIES.actor);
    if (entityExists(targetFolder.id, entity)) {
      continue;
    }
    game.actors.importFromCompendium(pack, entity.id, {
      folder: targetFolder.id,
    });
  }
}

async function importTables() {
  const pack = game.packs.get(TABLES_PACK);
  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    const importPath = getImportPath(entity);
    const targetFolder = getFolderAtEndOfPath(importPath, DIRECTORIES.table);
    if (entityExists(targetFolder.id, entity)) {
      continue;
    }
    await game.tables.importFromCompendium(
      pack,
      entity.id,
      {
        folder: targetFolder.id,
      },
    );
  }
}

async function importScenes() {
  const pack = game.packs.get(SCENE_PACK);
  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    const importPath = getImportPath(entity);
    const targetFolder = getFolderAtEndOfPath(importPath, DIRECTORIES.scene);
    if (entityExists(targetFolder.id, entity)) {
      continue;
    }
    const importedScene = await game.scenes.importFromCompendium(
      pack,
      entity.id,
      {
        folder: targetFolder.id,
      },
    );
    await importedScene.createThumbnail().then((data) => {
      importedScene.update({ thumb: data.thumb }, { diff: false });
    });
  }
}

function entityExists(targetFolderId, compendiumEntity) {
  // looks for an entity with the same name
  const all = getAllEntities();
  const candidates = all.filter((t) => t.name === compendiumEntity.name);
  if (candidates.length === 0) {
    return false;
  }
  for (let i = 0; i < candidates.length; i++) {
    const found = candidates[i];
    // they must match the same kind of entity
    if (found.documentName !== compendiumEntity.documentName) {
      continue;
    }

    // the found entity has to be in a folder to begin with
    if (!found.folder) {
      continue;
    }

    // they have to be in the same folder.
    if (found.folder.id !== targetFolderId) {
      continue;
    }
    return true;
  }
}

// allEntities returns all compendium related entities
function getAllEntities() {
  const allEntities = [];
  game.journal.contents.forEach((j) => {
    allEntities.push(j);
  });
  game.actors.contents.forEach((j) => {
    allEntities.push(j);
  });
  game.items.contents.forEach((j) => {
    allEntities.push(j);
  });
  game.tables.contents.forEach((j) => {
    allEntities.push(j);
  });
  game.scenes.contents.forEach((j) => {
    allEntities.push(j);
  });
  game.playlists.contents.forEach((j) => {
    allEntities.push(j);
  });
  return allEntities;
}
