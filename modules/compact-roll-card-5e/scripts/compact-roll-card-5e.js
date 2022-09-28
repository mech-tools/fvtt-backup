class CompactRollCard5e {
  static MODULE_NAME = "compact-roll-card-5e";
  static MODULE_TITLE = "Compact Roll Card DnD5e";

  static log(...args) {
    if (game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.MODULE_NAME)) {
      console.log(this.MODULE_TITLE, '|', ...args);
    }
  }
}

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(CompactRollCard5e.MODULE_NAME);
});


Hooks.on('renderChatMessage', async (chatMessage, html) => {
  const chatMessageIndex = game.messages.contents.indexOf(chatMessage);
  CompactRollCard5e.log('renderingChatMessage', {
    chatMessageIndex,
    minus: chatMessageIndex - 1,
  });
  const previousChatMessage = game.messages.contents[chatMessageIndex - 1];

  if (!previousChatMessage) {
    return;
  }

  if (chatMessage.data.timestamp - previousChatMessage.data.timestamp > 300) {
    return;
  }

  const speakerToken = chatMessage.data.speaker.token;
  const prevSpeakerToken = previousChatMessage.data.speaker.token;

  if (speakerToken && prevSpeakerToken && speakerToken === prevSpeakerToken) {
    // these are definitely from the same character
    html.addClass('compact-roll-card-5e-collapse-up');
    return;
  }

  const speakerActor = chatMessage.data.speaker.actor;
  const prevSpeakerActor = previousChatMessage.data.speaker.actor;

  if (speakerActor && prevSpeakerActor && speakerActor === prevSpeakerActor) {
    // these are probably from the same character
    html.addClass('compact-roll-card-5e-collapse-up');
    return;
  }
});