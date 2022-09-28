import Constants from '../constants.js';

export const MigrationResult = {
	UNNECESSARY: 0,
	FAILED: 1,
	SUCCESS: 2
};

function createMigrations(foundryGame) {
	return [
		{
			version: '1.1.2',
			func: async (lastVersion) => {
				if (lastVersion) {
					return MigrationResult.UNNECESSARY;
				}

				if (foundryGame.settings.get(Constants.MODULE_NAME, Constants.MINIMUM_PERMISSION) === 0) {
					await foundryGame.settings.set(Constants.MODULE_NAME, Constants.MINIMUM_PERMISSION, 1);
				}

				return MigrationResult.SUCCESS;
			}
		}
	];
}

export async function migrate(foundryGame) {
	try {
		foundryGame.settings.register(Constants.MODULE_NAME, Constants.LAST_VERSION, {
			config: false,
			scope: 'client',
			type: String,
			default: ''
		});
		let finalResult = undefined;
		let lastVersion = foundryGame.settings.get(Constants.MODULE_NAME, Constants.LAST_VERSION);
		const firstRun = !lastVersion;
		for (const migration of createMigrations(foundryGame)) {
			const result = await migration.func(lastVersion);
			if (result === MigrationResult.FAILED) {
				finalResult = result;
				break;
			} else if (finalResult !== MigrationResult.SUCCESS) {
				finalResult = result;
			}
			lastVersion = migration.version;
		}
		if (firstRun && finalResult === MigrationResult.SUCCESS) return 'firstRun';
		return finalResult === MigrationResult.SUCCESS ? lastVersion : finalResult;
	} catch (e) {
		console.error(`${Constants.MODULE_NAME} settings migration failed:`, e);
		return MigrationResult.FAILED;
	}
}
