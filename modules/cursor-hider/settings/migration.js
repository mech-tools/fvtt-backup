import Constants from '../constants.js';

export const MigrationResult = {
	UNNECESSARY: 0,
	FAILED: 1,
	SUCCESS: 2
};

function createMigrations(foundryGame) {
	return [
		{
			version: '1.3.2',
			func: async () => {
				let minMoveVal = foundryGame.settings.get(Constants.MODULE_NAME, Constants.MINIMUM_PERMISSION);
				if (typeof minMoveVal === 'string') {
					await foundryGame.settings.set(Constants.MODULE_NAME, Constants.MINIMUM_PERMISSION,
						Number(minMoveVal));
					return MigrationResult.SUCCESS;
				} else {
					return MigrationResult.UNNECESSARY;
				}
			}
		}
	];
}

export async function migrate(foundryGame) {
	try {
		foundryGame.settings.register(Constants.MODULE_NAME, 'lastVersion', {
			config: false,
			scope: 'client',
			type: Number,
			default: -1
		});

		let finalResult = MigrationResult.UNNECESSARY
		let lastVersion = foundryGame.settings.get(Constants.MODULE_NAME, Constants.LAST_VERSION);
		if (lastVersion === -1) {
			return MigrationResult.UNNECESSARY;
		}
		const migrations = createMigrations(foundryGame);
		for (let i = 0; i < migrations.length; ++i) {
			const migration = migrations[i];
			const result = lastVersion >= i ? MigrationResult.UNNECESSARY : await migration.func(lastVersion);
			if (result === MigrationResult.FAILED) {
				return MigrationResult.FAILED;
			} else if (result === MigrationResult.SUCCESS) {
				finalResult = migrations[migrations.length - 1].version;
			}

			lastVersion = i;
			await foundryGame.settings.set(Constants.MODULE_NAME, Constants.LAST_VERSION, lastVersion);
		}
		return finalResult;
	} catch (e) {
		console.error('Cursor Hider MigrationResult failed:', e);
		return { type: MigrationResult.FAILED };
	}
}
