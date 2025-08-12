Hooks.once('init', () => {
    console.log("Automated Animations For All | Initializing");

    // Settings (mantidos como no original)
    game.settings.register('automated-animations-for-all', 'requireTarget', {
        name: game.i18n.localize("AAFA.SettingsRequireTarget"),
        hint: game.i18n.localize("AAFA.SettingsRequireTargetHint"),
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register('automated-animations-for-all', 'onlyDuringCombat', {
        name: game.i18n.localize("AAFA.SettingsOnlyDuringCombat"),
        hint: game.i18n.localize("AAFA.SettingsOnlyDuringCombatHint"),
        scope: 'world',
        config: true,
        type: Boolean,
        default: true
    });

    game.settings.register('automated-animations-for-all', 'checkItem', {
        name: game.i18n.localize("AAFA.SettingsCheckItem"),
        hint: game.i18n.localize("AAFA.SettingsCheckItemHint"),
        scope: 'world',
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register('automated-animations-for-all', 'enableEquipMacro', {
        name: game.i18n.localize("AAFA.SettingsEnableEquipMacro"),
        hint: game.i18n.localize("AAFA.SettingsEnableEquipMacroHint"),
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
    	requiresReload: true
    });

    game.settings.register('automated-animations-for-all', 'equipItemPath', {
        name: game.i18n.localize("AAFA.SettingsEquipItemPath"),
        hint: game.i18n.localize("AAFA.SettingsEquipItemPathHint"),
        scope: 'world',
        config: true,
        type: String,
        default: ""
    });

    game.settings.register('automated-animations-for-all', 'equipMessageTemplate', {
        name: game.i18n.localize("AAFA.SettingsEquipMessageTemplate"),
        hint: game.i18n.localize("AAFA.SettingsEquipMessageTemplateHint"),
        scope: 'world',
        config: true,
        type: String,
        default: "{attacker} attacks {target} using {item}!"
    });

    game.settings.register('automated-animations-for-all', 'equipGenericName', {
        name: game.i18n.localize("AAFA.SettingsAnonymousName"),
        hint: game.i18n.localize("AAFA.SettingsAnonymousNameHint"),
        scope: 'world',
        config: true,
        type: String,
        default: "Unknown"
    });
});

Hooks.once('ready', () => {
    console.log("Automated Animations For All | Ready");

    let lastMessageId = null;

    Hooks.on('createChatMessage', async (chatMessage, options, userId) => {
        if (chatMessage.id === lastMessageId && !chatMessage.isRoll) { // Adicionado !chatMessage.isRoll para evitar problemas com mensagens de rolagem duplicadas
            return;
        }
        lastMessageId = chatMessage.id;

        // --- AJUSTE PRINCIPAL AQUI ---
        // Apenas o usuário que enviou a mensagem (ou o GM) deve processar a lógica de animação.
        // O AutomatedAnimations cuidará de mostrar a animação para todos os clientes.
        if (userId !== game.user.id) {
            // console.log(`AAFA | Skipping: Message from other user (${userId}). My user ID: ${game.user.id}`);
            return;
        }
        // A partir daqui, canvas.tokens.controlled e game.user.targets são do CONTEXTO DO REMETENTE.
        // console.log(game.i18n.format("AAFA.NotificationAnimationTriggeredBy", {senderName: chatMessage.user.name}));


        const requireTargetSetting = game.settings.get('automated-animations-for-all', 'requireTarget');
        const onlyDuringCombatSetting = game.settings.get('automated-animations-for-all', 'onlyDuringCombat');
        const checkItemSetting = game.settings.get('automated-animations-for-all', 'checkItem');

        const messageContent = chatMessage.content;
        if (!messageContent) return;

        // Priorizar o token do "speaker" da mensagem, se existir.
        // Se não, usar o token controlado pelo remetente (como antes).
        let sourceToken;
        if (chatMessage.speaker && chatMessage.speaker.token) {
            sourceToken = canvas.tokens.get(chatMessage.speaker.token);
        }
        
        // Se não houver token no speaker, ou se o token do speaker não for válido/encontrado,
        // usar o token controlado pelo remetente (que é o game.user atual devido ao filtro acima)
        if (!sourceToken) {
            const controlledTokens = canvas.tokens.controlled;
            if (controlledTokens.length > 0) {
                sourceToken = controlledTokens[0];
            }
        }

        if (!sourceToken) {
            // Se ainda não há sourceToken (nem no speaker, nem controlado pelo remetente)
            // Tenta pegar um token do ator do speaker, se houver
            if(chatMessage.speaker && chatMessage.speaker.actor && !sourceToken){
                const speakerActor = game.actors.get(chatMessage.speaker.actor);
                if(speakerActor){
                    const actorTokens = speakerActor.getActiveTokens(true, true); // document = true, anObject = true
                    if(actorTokens.length > 0) {
                        sourceToken = actorTokens[0]; // Pega o primeiro token ativo do ator
                    }
                }
            }
            if (!sourceToken) {
                 //console.log("AAFA | " + game.i18n.localize("AAFA.LogNoTokenSelectedBySender")); // Usar uma string mais genérica
                 console.log("AAFA | " + game.i18n.localize("AAFA.LogNoSourceToken"));
                 return;
            }
        }
        
        // Alvos são sempre os alvos do remetente (game.user atual)
        let targets = Array.from(game.user.targets);

        if (onlyDuringCombatSetting) {
            const combat = game.combat;
            if (!combat) {
                // console.log("AAFA | " + game.i18n.localize("AAFA.LogNoCombat")); // Desabilitar para não poluir console se não estiver em combate
                return;
            }
            // Se o sourceToken não for o combatente atual, não fazer nada (a menos que seja o GM)
            if (!game.user.isGM) {
                const currentCombatant = combat.combatant;
                if (!currentCombatant || currentCombatant.tokenId !== sourceToken.id) {
                    // console.log("AAFA | " + game.i18n.localize("AAFA.LogNotYourTurn")); // Desabilitar para não poluir console
                    return;
                }
            }
        }

        if (!requireTargetSetting && targets.length === 0) {
            // Se não requer alvo e não há alvos, e a animação for de "ranged" ou "melee",
            // ela pode não ter um "ponto final" claro se não for no próprio token.
            // Para muitas animações de "ataque", um alvo é visualmente melhor.
            // Considerar se aqui deveria ser um alvo em área ou algo assim.
            // Por enquanto, manter a lógica de alvo no próprio token se não houver alvos.
            targets = [sourceToken];
        }

        if (requireTargetSetting && targets.length === 0) {
            // console.log("AAFA | " + game.i18n.localize("AAFA.LogNoTarget")); // Desabilitar para não poluir console
            return;
        }

        let matchedItemName = null;

        if (checkItemSetting) {
            const allItems = sourceToken.actor?.items?.contents || [];
            const matchedItem = allItems.find(item => {
                // Regex para encontrar o nome do item exato, case-insensitive, como palavra inteira
                const regex = new RegExp(`\\b${item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                return regex.test(messageContent);
            });

            if (!matchedItem) {
                // console.log("AAFA | " + game.i18n.localize("AAFA.LogNoItemMatch")); // Desabilitar para não poluir console
                return;
            }
            matchedItemName = matchedItem.name;
        } else {
            const cleanMessage = messageContent.replace(/<[^>]*>/g, '').trim(); // Remove HTML tags
            // Tenta usar a mensagem inteira como nome do item se não for para checar item.
            // Isso pode ser muito amplo, mas é o comportamento anterior.
            if (cleanMessage.length === 0) {
                // console.log("AAFA | " + game.i18n.localize("AAFA.LogNoWords")); // Desabilitar para não poluir console
                return;
            }
            matchedItemName = cleanMessage;
            // console.log(`AAFA | ${game.i18n.localize("AAFA.LogUseMessageAsItem")} '${matchedItemName}'`); // Desabilitar para não poluir console
        }

        if (!matchedItemName) { // Adicionado para garantir que temos um nome
            // console.log("AAFA | No matched item name to play animation.");
            return;
        }

        const aa = AutomatedAnimations;
        if (!aa || !aa.playAnimation) {
            ui.notifications.error("AAFA | " + game.i18n.localize("AAFA.NotificationNoAA"));
            return;
        }

        try {
            // console.log(`AAFA | Playing animation: Source=${sourceToken.name}, Item='${matchedItemName}', Targets=${targets.map(t=>t.name).join(', ')}`);
            await aa.playAnimation(sourceToken, { name: matchedItemName }, { targets: targets });
            console.log(`AAFA | ${game.i18n.localize("AAFA.LogAnimationPlayed")} '${matchedItemName}'.`);
        } catch (err) {
            console.error("AAFA | " + game.i18n.localize("AAFA.LogAnimationError"), err);
        }
    });
});


// Macro via item equipado (mantido como no original, pois já funciona no contexto do usuário que o executa)
Hooks.once('ready', () => {
    const enableEquipMacro = game.settings.get('automated-animations-for-all', 'enableEquipMacro');

    game.AAFA = {
        async runEquipMacro() {
            if (!enableEquipMacro) {
                ui.notifications.warn(game.i18n.localize("AAFA.MacroOff"));
                console.warn("AAFA | Equip Macro is OFF.");
                return;
            }
            // O restante da macro já pega o contexto do usuário que a executa,
            // então sourceToken e targets já estão corretos para esse usuário.
            // A mensagem criada por ela será processada pelo hook 'createChatMessage' acima,
            // e o filtro (userId === game.user.id) garantirá que apenas o remetente da macro
            // dispare a animação.

            const itemPath = game.settings.get('automated-animations-for-all', 'equipItemPath');
            const messageTemplate = game.settings.get('automated-animations-for-all', 'equipMessageTemplate');
            const genericName = game.settings.get('automated-animations-for-all', 'equipGenericName');

            const tokens = canvas.tokens.controlled; // Token selecionado pelo usuário da macro
            if (tokens.length === 0) {
                ui.notifications.warn(game.i18n.localize("AAFA.NoToken"));
                console.warn("AAFA | No selected token for equip macro.");
                return;
            }

            const sourceToken = tokens[0];
            const actor = sourceToken.actor;
            if (!actor) {
                ui.notifications.warn(game.i18n.localize("AAFA.NoActor"));
                console.warn("AAFA | No actor in selected token for equip macro.");
                return;
            }

            const targets = Array.from(game.user.targets); // Alvos do usuário da macro
            const targetToken = targets[0]; // Pega o primeiro alvo para a mensagem

            // console.log(`AAFA | Equip Macro: Path informado: '${itemPath}'`);

            // A função findFirstNamedItemFromPath permanece a mesma
            function findFirstNamedItemFromPath(actor, itemPath) {
                // console.log(`AAFA | findFirstNamedItemFromPath: Path informado: '${itemPath}'`);
                let rawResult;
                try {
                    rawResult = foundry.utils.getProperty(actor, itemPath);
                } catch (e) {
                    // console.warn(`AAFA | findFirstNamedItemFromPath: Erro ao processar o path '${itemPath}':`, e);
                    return undefined;
                }

                // console.log("AAFA | findFirstNamedItemFromPath: Resultado bruto do path:", rawResult);

                if (rawResult == null) {
                    // console.log("AAFA | findFirstNamedItemFromPath: Resultado bruto é nulo ou indefinido.");
                    return undefined;
                }
                if (rawResult instanceof Item) {
                    // console.log("AAFA | findFirstNamedItemFromPath: Resultado é um Item:", rawResult);
                    return rawResult;
                }
                if (typeof rawResult === "string") {
                    const itemById = actor.items.get(rawResult);
                    if (itemById && typeof itemById.name === 'string') {
                        // console.log("AAFA | findFirstNamedItemFromPath: Path era um ID, item encontrado:", itemById);
                        return itemById;
                    }
                    // console.log("AAFA | findFirstNamedItemFromPath: Path era uma string, mas não é um ID de item válido ou o item não tem nome:", rawResult);
                }
                if (Array.isArray(rawResult)) {
                    // console.log(`AAFA | findFirstNamedItemFromPath: Resultado é um array de ${rawResult.length} elementos.`);
                    for (const element of rawResult) {
                        if (element instanceof Item) {
                            // console.log("AAFA | findFirstNamedItemFromPath: Encontrado Item no array:", element);
                            return element;
                        }
                        if (element && typeof element === 'object' && typeof element.name === 'string') {
                            // console.log("AAFA | findFirstNamedItemFromPath: Encontrado primeiro objeto com nome no array:", element);
                            return element;
                        }
                    }
                    // console.log("AAFA | findFirstNamedItemFromPath: Nenhum Item ou objeto com nome encontrado no array.");
                }
                if (typeof rawResult === 'object') {
                    // console.log("AAFA | findFirstNamedItemFromPath: Resultado é um objeto. Verificando se ele mesmo tem nome, ou seus valores.");
                    if (typeof rawResult.name === 'string') {
                        // console.log("AAFA | findFirstNamedItemFromPath: O próprio objeto resultado tem nome:", rawResult);
                        return rawResult;
                    }
                    // console.log("AAFA | findFirstNamedItemFromPath: Objeto não tem nome próprio. Verificando seus valores internos...");
                    const values = Object.values(rawResult);
                    if (values.length > 0) {
                        for (const value of values) {
                            if (value instanceof Item) {
                                // console.log("AAFA | findFirstNamedItemFromPath: Encontrado Item dentro dos valores do objeto:", value);
                                return value;
                            }
                            if (value && typeof value === 'object' && typeof value.name === 'string') {
                                // console.log(`AAFA | findFirstNamedItemFromPath: Encontrado objeto com nome DENTRO dos valores do objeto principal:`, value);
                                return value;
                            }
                        }
                        // console.log("AAFA | findFirstNamedItemFromPath: Nenhum Item ou objeto com nome encontrado nos valores do objeto principal.");
                    } else {
                        // console.log("AAFA | findFirstNamedItemFromPath: Objeto não tem nome próprio e não possui valores para iterar.");
                    }
                }
                // console.log("AAFA | findFirstNamedItemFromPath: Não foi possível determinar um item/objeto com nome a partir do resultado bruto.");
                return undefined;
            }

            let item = findFirstNamedItemFromPath(actor, itemPath);

            if (!item || typeof item.name !== 'string') {
                ui.notifications.warn(game.i18n.localize("AAFA.ItemNotFound"));
                console.warn(`AAFA | Equip Macro: Item não encontrado ou sem nome. Path usado: '${itemPath}'. Resultado da busca:`, item);
                return;
            }

            // console.log(`AAFA | Equip Macro: Item final selecionado com sucesso: '${item.name}'`, item);

            let minDisplayModeForPlayers;
            if (game.release.generation >= 10) {
                minDisplayModeForPlayers = CONST.TOKEN_DISPLAY_MODES.HOVER_BY_EVERYONE;
            } else {
                minDisplayModeForPlayers = CONST.TOKEN_DISPLAY_MODES.HOVER;
            }
            if (minDisplayModeForPlayers === undefined) {
                minDisplayModeForPlayers = game.release.generation >= 10 ? 30 : 20;
                // console.warn("AAFA | Equip Macro: Não foi possível determinar minDisplayModeForPlayers automaticamente, usando valor padrão.");
            }

            const attackerNameVisible = sourceToken.document.displayName >= minDisplayModeForPlayers;
            const targetNameVisible = targetToken ? targetToken.document.displayName >= minDisplayModeForPlayers : false;

            const attackerName = attackerNameVisible ? sourceToken.name : genericName;
            const targetName = targetToken ? (targetNameVisible ? targetToken.name : genericName) : ""; // Se não houver targetToken, targetName é vazio
            const finalItemName = item.name;

            // console.log(`AAFA | Equip Macro: Nomes - Atacante: '${attackerName}' | Alvo: '${targetName}' | Item: '${finalItemName}'`);

            const message = messageTemplate
                        .replaceAll("{attacker}", attackerName)
                        .replaceAll("{target}", targetName || game.i18n.localize("AAFA.NoTargetPlaceholder") || "nothing") // Adiciona um placeholder se não houver alvo
                        .replaceAll("{item}", finalItemName);

            // console.log(`AAFA | Equip Macro: Mensagem final: '${message}'`);

            await ChatMessage.create({
                content: message,
                speaker: ChatMessage.getSpeaker({ token: sourceToken.document }) // Garante que o speaker da mensagem é o token da macro
            });

            console.log("AAFA | Equip Macro: Mensagem enviada.");
        }
    };
});