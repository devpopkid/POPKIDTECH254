'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x319d32, _0x5a623f, _0x5ecf1e, _0x28e245) {
  if (_0x28e245 === undefined) {
    _0x28e245 = _0x5ecf1e;
  }
  var _0x50af40 = Object.getOwnPropertyDescriptor(_0x5a623f, _0x5ecf1e);
  if (!_0x50af40 || ('get' in _0x50af40 ? !_0x5a623f.__esModule : _0x50af40.writable || _0x50af40.configurable)) {
    _0x50af40 = {
      'enumerable': true,
      'get': function () {
        return _0x5a623f[_0x5ecf1e];
      }
    };
  }
  Object.defineProperty(_0x319d32, _0x28e245, _0x50af40);
} : function (_0x4a73ab, _0x5a08f8, _0x5bbb4b, _0xdb9386) {
  if (_0xdb9386 === undefined) {
    _0xdb9386 = _0x5bbb4b;
  }
  _0x4a73ab[_0xdb9386] = _0x5a08f8[_0x5bbb4b];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x7378f1, _0x1cf8f7) {
  Object.defineProperty(_0x7378f1, "default", {
    'enumerable': true,
    'value': _0x1cf8f7
  });
} : function (_0x1563fa, _0x2cbd9a) {
  _0x1563fa["default"] = _0x2cbd9a;
});
var __importStar = this && this.__importStar || function (_0x31267a) {
  if (_0x31267a && _0x31267a.__esModule) {
    return _0x31267a;
  }
  var _0x434c30 = {};
  if (_0x31267a != null) {
    for (var _0x1e0b14 in _0x31267a) if (_0x1e0b14 !== 'default' && Object.prototype.hasOwnProperty.call(_0x31267a, _0x1e0b14)) {
      __createBinding(_0x434c30, _0x31267a, _0x1e0b14);
    }
  }
  __setModuleDefault(_0x434c30, _0x31267a);
  return _0x434c30;
};
var __importDefault = this && this.__importDefault || function (_0x43ec71) {
  return _0x43ec71 && _0x43ec71.__esModule ? _0x43ec71 : {
    'default': _0x43ec71
  };
};
Object.defineProperty(exports, '__esModule', {
  'value': true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = 'silent';
const pino = require('pino');
const axios = require("axios");
const boom_1 = require('@hapi/boom');
const conf = require('./set');
let fs = require('fs-extra');
let path = require('path');
const FileType = require('file-type');
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  verifierEtatJid,
  recupererActionJid
} = require("./bdd/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/keizzah/keith");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
let {
  reagir
} = require(__dirname + "/keizzah/app");
var session = conf.session.replace(/POPKID-MD;;;=>/g, '');
const prefixe = conf.PREFIXE || [];
require('dotenv').config({
  'path': "./config.env"
});
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/auth/creds.json")) {
      console.log("connected successfully...");
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/auth/creds.json") && session != 'zokk') {
      await fs.writeFileSync(__dirname + "/auth/creds.json", atob(session), 'utf8');
    }
  } catch (_0x21100d) {
    console.log("Session Invalid " + _0x21100d);
    return;
  }
}
authentification();
0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': 'silent',
    'stream': 'store'
  })
});
setTimeout(() => {
  async function _0xb27ff1() {
    0;
    const {
      version: _0x587ee9,
      isLatest: _0x599de5
    } = await baileys_1.fetchLatestBaileysVersion();
    0;
    const {
      state: _0x571282,
      saveCreds: _0x5019ed
    } = await baileys_1.useMultiFileAuthState(__dirname + '/auth');
    0;
    const _0x786f6d = {
      'version': _0x587ee9,
      'logger': pino({
        'level': 'silent'
      }),
      'browser': ['POPKID-MD', 'safari', '1.0.0'],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x571282.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x571282.keys, logger)
      },
      'getMessage': async _0x2316fc => {
        if (store) {
          const _0x34993e = await store.loadMessage(_0x2316fc.remoteJid, _0x2316fc.id, undefined);
          return _0x34993e.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0;
    const _0x5622dd = baileys_1['default'](_0x786f6d);
    store.bind(_0x5622dd.ev);
    setInterval(() => {
      store.writeToFile('store.json');
    }, 3000);
    const _0x459983 = _0x31ef98 => new Promise(_0x2a36b9 => setTimeout(_0x2a36b9, _0x31ef98));
    let _0x2b16bb = 0;
    _0x5622dd.ev.on("call", async _0x470052 => {
      if (conf.ANTICALL === 'yes') {
        const _0x45e66e = _0x470052[0].id;
        const _0x484c39 = _0x470052[0].from;
        await _0x5622dd.rejectCall(_0x45e66e, _0x484c39);
        const _0xf72f5a = Date.now();
        if (_0xf72f5a - _0x2b16bb >= 5000) {
          await client.sendMessage(_0x484c39, {
            'text': conf.ANTICALL_MSG
          });
          _0x2b16bb = _0xf72f5a;
        } else {
          console.log("Message skipped to prevent overflow");
        }
      }
    });
    const _0x2337dc = (_0x51f14b = '', _0x54535d = '') => ({
      'mentionedJid': [_0x54535d],
      'forwardingScore': 0x3e7,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': "120363290715861418@newsletter",
        'newsletterName': "🤖 𝐏𝐎𝐏𝐊𝐈𝐃 𝐊𝐄 🤖",
        'serverMessageId': Math.floor(100000 + Math.random() * 900000)
      }
    });
    const _0x573b28 = ['❤️', '💖', '💘', '💝', '💓', '💌', '💕', '😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', '🏋️', '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', '🕶️', '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾'];
    let _0x4c61e8 = 0;
    if (conf.AUTO_LIKE_STATUS === 'yes') {
      console.log("AUTO_LIKE_STATUS is enabled. Listening for status updates...");
      _0x5622dd.ev.on("messages.upsert", async _0x51a9b6 => {
        const {
          messages: _0x5eccec
        } = _0x51a9b6;
        for (const _0x1da2d7 of _0x5eccec) {
          if (_0x1da2d7.key && _0x1da2d7.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x1da2d7.key.remoteJid);
            const _0x540956 = Date.now();
            if (_0x540956 - _0x4c61e8 < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x275969 = _0x5622dd.user && _0x5622dd.user.id ? _0x5622dd.user.id.split(':')[0] + "@s.whatsapp.net" : null;
            if (!_0x275969) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0xec559d = _0x573b28[Math.floor(Math.random() * _0x573b28.length)];
            try {
              await _0x5622dd.sendMessage(_0x1da2d7.key.remoteJid, {
                'react': {
                  'key': _0x1da2d7.key,
                  'text': _0xec559d
                }
              }, {
                'statusJidList': [_0x1da2d7.key.participant]
              });
              _0x4c61e8 = Date.now();
              console.log("Successfully reacted to status update by " + _0x1da2d7.key.remoteJid + " with " + _0xec559d);
              await _0x459983(2000);
            } catch (_0x180ecb) {
              console.error("Error reacting to status update:", _0x180ecb);
            }
          }
        }
      });
    }
    if (conf.AUTOBIO?.["toLowerCase"]() === 'yes') {
      const _0x5c39ea = {
        'morning': ["Rise up, start fresh, see the bright opportunity in each day.", "Every morning is a blank canvas... it is whatever you make out of it.", "The morning shines upon everyone equally. It's your actions that matter."],
        'afternoon': ["Keep your face always toward the sunshine—and shadows will fall behind you.", "Success is not the key to happiness. Happiness is the key to success.", "Make each day your masterpiece."],
        'evening': ["The evening is a time to reflect and be grateful.", "An evening well spent brings a contented mind.", "Every sunset gives us one day less to live. But every sunrise gives us one day more to hope for."],
        'night': ["The darker the night, the brighter the stars.", "Dream big and dare to fail. Good night!", "Night is the time to reflect on the blessings of the day."]
      };
      setInterval(() => {
        const _0x1e9368 = new Date();
        const _0xe20546 = _0x1e9368.toLocaleDateString('en-US', {
          'timeZone': "Africa/Nairobi"
        });
        const _0x4b2074 = _0x1e9368.toLocaleTimeString('en-US', {
          'timeZone': "Africa/Nairobi"
        });
        const _0x16552c = _0x1e9368.toLocaleString('en-US', {
          'weekday': 'long',
          'timeZone': "Africa/Nairobi"
        });
        const _0x54b825 = _0x1e9368.toLocaleTimeString('en-US', {
          'timeZone': "Africa/Nairobi",
          'hour': '2-digit',
          'hour12': false
        });
        let _0x1a20e2 = [];
        if (_0x54b825 >= 5 && _0x54b825 < 12) {
          _0x1a20e2 = _0x5c39ea.morning;
        } else {
          if (_0x54b825 >= 12 && _0x54b825 < 17) {
            _0x1a20e2 = _0x5c39ea.afternoon;
          } else if (_0x54b825 >= 17 && _0x54b825 < 21) {
            _0x1a20e2 = _0x5c39ea.evening;
          } else {
            _0x1a20e2 = _0x5c39ea.night;
          }
        }
        const _0x5567a8 = _0x1a20e2[Math.floor(Math.random() * _0x1a20e2.length)];
        const _0x6a1b71 = "👻 " + conf.BOT + " 👻 ||Its on " + _0xe20546 + " at " + _0x4b2074 + ", ( " + _0x16552c + " ) || 💭 𝐐𝐮𝐨𝐭𝐞: \"" + _0x5567a8 + "\"";
        _0x5622dd.updateProfileStatus(_0x6a1b71);
      }, 10000);
      console.log("AutoBio feature is enabled. Profile status will update every 10 seconds.");
    }
    let _0x4178cf = new Set();
    _0x5622dd.ev.on("messages.upsert", async _0x290428 => {
      const {
        messages: _0x416893
      } = _0x290428;
      const _0x3323fa = _0x416893[0];
      if (!_0x3323fa.message) {
        return;
      }
      const _0x25e293 = _0x3323fa.message.conversation || _0x3323fa.message.extendedTextMessage?.['text'] || '';
      const _0x3cbba5 = _0x3323fa.key.remoteJid;
      const _0x2ab274 = _0x3cbba5.split('@')[0];
      let _0x302b4a = "Hello @" + _0x2ab274 + ", " + conf.OWNER_NAME + " is unavailable right now. Kindly leave a message.";
      if (_0x25e293.startsWith('>') && _0x3323fa.key.fromMe) {
        const _0x12cf5c = _0x25e293.slice(1).split(" ")[0];
        const _0x34cb11 = _0x25e293.slice(_0x12cf5c.length + 2).trim();
        if (_0x12cf5c === "setautoreply" && _0x34cb11) {
          _0x302b4a = _0x34cb11;
          await _0x5622dd.sendMessage(_0x3cbba5, {
            'text': "Auto-reply message has been updated to:\n\"" + _0x302b4a + "\""
          });
          return;
        }
      }
      if (conf.GREET === 'yes' && !_0x4178cf.has(_0x3cbba5) && !_0x3323fa.key.fromMe && !_0x3cbba5.includes("@g.us")) {
        await _0x5622dd.sendMessage(_0x3cbba5, {
          'text': _0x302b4a,
          'mentions': [_0x3cbba5],
          'contextInfo': _0x2337dc()
        });
        _0x4178cf.add(_0x3cbba5);
      }
    });
    function _0x5147fe(_0x555a60) {
      const _0x30822b = _0x555a60.key.participant || _0x555a60.key.remoteJid;
      return "*『 👻 " + conf.BOT + " ᴀɴᴛɪᴅᴇʟᴇᴛᴇ 👻 』*\n\n" + ("*ᴅᴇʟᴇᴛɪᴏɴ ᴛɪᴍᴇ:* " + new Date().toLocaleString() + "\n") + ("*ᴅᴇʟᴇᴛᴇᴅ ʙʏ:* @" + _0x30822b.split('@')[0] + "\n\n> ᴅᴇʟᴇᴛᴇᴅ ɪɴғᴏʀᴍᴀᴛɪᴏɴ ʀᴇᴛʀɪᴇᴠᴇᴅ ʙʏ ᴘᴏᴘᴋɪᴅ-ᴍᴅ");
    }
    async function _0x4ffed7(_0x4206e2) {
      if (_0x4206e2.imageMessage) {
        return await downloadMedia(_0x4206e2.imageMessage);
      }
      if (_0x4206e2.videoMessage) {
        return await downloadMedia(_0x4206e2.videoMessage);
      }
      if (_0x4206e2.documentMessage) {
        return await downloadMedia(_0x4206e2.documentMessage);
      }
      if (_0x4206e2.audioMessage) {
        return await downloadMedia(_0x4206e2.audioMessage);
      }
      if (_0x4206e2.stickerMessage) {
        return await downloadMedia(_0x4206e2.stickerMessage);
      }
      if (_0x4206e2.voiceMessage) {
        return await downloadMedia(_0x4206e2.voiceMessage);
      }
      return null;
    }
    _0x5622dd.ev.on("messages.upsert", async _0x58e4cf => {
      if (conf.ADM !== 'yes') {
        return;
      }
      const {
        messages: _0x40f842
      } = _0x58e4cf;
      const _0x48f082 = _0x40f842[0];
      if (!_0x48f082.message) {
        return;
      }
      const _0x534618 = _0x48f082.key;
      const _0xd9fe1 = _0x534618.remoteJid;
      if (!store.chats[_0xd9fe1]) {
        store.chats[_0xd9fe1] = [];
      }
      store.chats[_0xd9fe1].push(_0x48f082);
      if (_0x48f082.message.protocolMessage && _0x48f082.message.protocolMessage.type === 0) {
        const _0x190b99 = _0x48f082.message.protocolMessage.key;
        const _0x42dd73 = store.chats[_0xd9fe1];
        const _0x36b138 = _0x42dd73.find(_0x538a57 => _0x538a57.key.id === _0x190b99.id);
        if (_0x36b138) {
          try {
            const _0x1a9445 = _0x5147fe(_0x36b138);
            if (_0x36b138.message.conversation) {
              await _0x5622dd.sendMessage(remotejid, {
                'text': _0x1a9445 + "\n\n*ᴅᴇʟᴇᴛᴇᴅ ᴍᴇssᴀɢᴇ:* " + _0x36b138.message.conversation,
                'mentions': [_0x36b138.key.participant],
                'contextInfo': _0x2337dc()
              });
            } else {
              const _0x14e032 = await _0x4ffed7(_0x36b138.message);
              if (_0x14e032) {
                const _0x5a8842 = _0x36b138.message.imageMessage ? 'image' : _0x36b138.message.videoMessage ? 'video' : _0x36b138.message.documentMessage ? "document" : _0x36b138.message.audioMessage ? 'audio' : _0x36b138.message.stickerMessage ? 'sticker' : 'audio';
                await _0x5622dd.sendMessage(_0xd9fe1, {
                  [_0x5a8842]: _0x14e032,
                  'caption': _0x1a9445,
                  'mentions': [_0x36b138.key.participant]
                });
              }
            }
          } catch (_0x415062) {
            console.error("Error handling deleted message:", _0x415062);
          }
        }
      }
    });
    _0x5622dd.ev.on("messages.upsert", async _0x8c5a21 => {
      const {
        messages: _0x4d8bee
      } = _0x8c5a21;
      const _0x59b5cf = _0x4d8bee[0];
      if (!_0x59b5cf.message) {
        return;
      }
      const _0x1d4d3b = _0x444482 => {
        if (!_0x444482) {
          return _0x444482;
        }
        if (/:\d+@/gi.test(_0x444482)) {
          0;
          let _0x4e2b1d = baileys_1.jidDecode(_0x444482) || {};
          return _0x4e2b1d.user && _0x4e2b1d.server && _0x4e2b1d.user + '@' + _0x4e2b1d.server || _0x444482;
        } else {
          return _0x444482;
        }
      };
      0;
      var _0x5bffc8 = baileys_1.getContentType(_0x59b5cf.message);
      var _0x2277c8 = _0x5bffc8 == "conversation" ? _0x59b5cf.message.conversation : _0x5bffc8 == "imageMessage" ? _0x59b5cf.message.imageMessage?.['caption'] : _0x5bffc8 == "videoMessage" ? _0x59b5cf.message.videoMessage?.['caption'] : _0x5bffc8 == "extendedTextMessage" ? _0x59b5cf.message?.["extendedTextMessage"]?.['text'] : _0x5bffc8 == "buttonsResponseMessage" ? _0x59b5cf?.['message']?.["buttonsResponseMessage"]?.["selectedButtonId"] : _0x5bffc8 == "listResponseMessage" ? _0x59b5cf.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] : _0x5bffc8 == "messageContextInfo" ? _0x59b5cf?.['message']?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x59b5cf.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x59b5cf.text : '';
      var _0x453c2e = _0x59b5cf.key.remoteJid;
      var _0x533779 = _0x1d4d3b(_0x5622dd.user.id);
      var _0x1f459b = _0x533779.split('@')[0];
      const _0x2d93a0 = _0x453c2e?.['endsWith']('@g.us');
      var _0xcdcde8 = _0x2d93a0 ? await _0x5622dd.groupMetadata(_0x453c2e) : '';
      var _0x15c044 = _0x2d93a0 ? _0xcdcde8.subject : '';
      var _0x57f84e = _0x59b5cf.message.extendedTextMessage?.["contextInfo"]?.["quotedMessage"];
      var _0x5d80c5 = _0x1d4d3b(_0x59b5cf.message?.["extendedTextMessage"]?.["contextInfo"]?.["participant"]);
      var _0x1226b4 = _0x2d93a0 ? _0x59b5cf.key.participant ? _0x59b5cf.key.participant : _0x59b5cf.participant : _0x453c2e;
      if (_0x59b5cf.key.fromMe) {
        _0x1226b4 = _0x533779;
      }
      var _0x41e4b6 = _0x2d93a0 ? _0x59b5cf.key.participant : '';
      const {
        getAllSudoNumbers: _0x45c965
      } = require('./bdd/sudo');
      const _0x292056 = _0x59b5cf.pushName;
      const _0x9d8103 = await _0x45c965();
      const _0x1f75f6 = [_0x1f459b, "254111385747", "254732297194", "254756466053", "25412434470", conf.NUMERO_OWNER].map(_0xd04825 => _0xd04825.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x112e2f = _0x1f75f6.concat(_0x9d8103);
      const _0x2cca6c = _0x112e2f.includes(_0x1226b4);
      var _0x425534 = ["254111385747", "254732297194", "254756466053", "25412434470"].map(_0x56fa0e => _0x56fa0e.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x1226b4);
      function _0x3c1114(_0x12c1b5) {
        _0x5622dd.sendMessage(_0x453c2e, {
          'text': _0x12c1b5
        }, {
          'quoted': _0x59b5cf
        });
      }
      console.log("\t [][]...{Popkid-Md}...[][]");
      console.log("=========== New message ===========");
      if (_0x2d93a0) {
        console.log("message sent from : " + _0x15c044);
      }
      console.log("message from : [" + _0x292056 + " : " + _0x1226b4.split("@s.whatsapp.net")[0] + " ]");
      console.log("type of message : " + _0x5bffc8);
      console.log("------end of your messages ------");
      console.log(_0x2277c8);
      function _0xca52ff(_0x3340f9) {
        let _0x548089 = [];
        for (_0x8c5a21 of _0x3340f9) {
          if (_0x8c5a21.admin == null) {
            continue;
          }
          _0x548089.push(_0x8c5a21.id);
        }
        return _0x548089;
      }
      var _0x276b96 = conf.ETAT;
      if (_0x276b96 == 1) {
        await _0x5622dd.sendPresenceUpdate("available", _0x453c2e);
      } else {
        if (_0x276b96 == 2) {
          await _0x5622dd.sendPresenceUpdate('composing', _0x453c2e);
        } else if (_0x276b96 == 3) {
          await _0x5622dd.sendPresenceUpdate('recording', _0x453c2e);
        } else {
          await _0x5622dd.sendPresenceUpdate("unavailable", _0x453c2e);
        }
      }
      const _0x178b1d = _0x2d93a0 ? await _0xcdcde8.participants : '';
      let _0x4ef873 = _0x2d93a0 ? _0xca52ff(_0x178b1d) : '';
      const _0x355b06 = _0x2d93a0 ? _0x4ef873.includes(_0x1226b4) : false;
      var _0x42427b = _0x2d93a0 ? _0x4ef873.includes(_0x533779) : false;
      const _0x4ee910 = _0x2277c8 ? _0x2277c8.trim().split(/ +/).slice(1) : null;
      const _0x55898f = _0x2277c8 ? _0x2277c8.startsWith(prefixe) : false;
      const _0x18760d = _0x55898f ? _0x2277c8.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x363af1 = conf.URL.split(',');
      function _0xddd0e4() {
        const _0x55062f = Math.floor(Math.random() * _0x363af1.length);
        const _0x351a48 = _0x363af1[_0x55062f];
        return _0x351a48;
      }
      var _0x132d0a = {
        'superUser': _0x2cca6c,
        'dev': _0x425534,
        'verifGroupe': _0x2d93a0,
        'mbre': _0x178b1d,
        'membreGroupe': _0x41e4b6,
        'verifAdmin': _0x355b06,
        'infosGroupe': _0xcdcde8,
        'nomGroupe': _0x15c044,
        'auteurMessage': _0x1226b4,
        'nomAuteurMessage': _0x292056,
        'idBot': _0x533779,
        'verifZokouAdmin': _0x42427b,
        'prefixe': prefixe,
        'arg': _0x4ee910,
        'repondre': _0x3c1114,
        'mtype': _0x5bffc8,
        'groupeAdmin': _0xca52ff,
        'msgRepondu': _0x57f84e,
        'auteurMsgRepondu': _0x5d80c5,
        'ms': _0x59b5cf,
        'mybotpic': _0xddd0e4
      };
      if (_0x453c2e === "120363400418501943@g.us") {
        return;
      }
      if (conf.AUTO_READ_MESSAGES === 'yes') {
        _0x5622dd.ev.on("messages.upsert", async _0x449721 => {
          const {
            messages: _0x141346
          } = _0x449721;
          for (const _0x18990e of _0x141346) {
            if (!_0x18990e.key.fromMe) {
              await _0x5622dd.readMessages([_0x18990e.key]);
            }
          }
        });
      }
      if (!_0x2cca6c && _0x453c2e === _0x1226b4 && conf.CHATBOT === 'yes') {
        try {
          const _0x43133f = Date.now();
          if (_0x43133f - _0x2b16bb < 5000) {
            return;
          }
          const _0x36f43e = await axios.get("https://apis-keith.vercel.app/ai/gpt", {
            'params': {
              'q': _0x2277c8
            },
            'timeout': 0x2710
          });
          if (_0x36f43e.data?.['status'] && _0x36f43e.data?.["result"]) {
            await _0x5622dd.sendMessage(_0x453c2e, {
              'text': _0x36f43e.data.result,
              'contextInfo': _0x2337dc()
            });
            _0x2b16bb = _0x43133f;
          }
        } catch (_0x1d17b5) {
          console.error("Chatbot error:", _0x1d17b5);
        }
      }
      if (!_0x2cca6c && _0x453c2e == _0x1226b4 && conf.VOICE_CHATBOT_INBOX === "yes") {
        try {
          const _0x481d15 = Date.now();
          if (_0x481d15 - _0x2b16bb < 5000) {
            console.log("Message skipped: Too many messages in a short time.");
            return;
          }
          const _0x34a210 = await axios.get("https://apis-keith.vercel.app/ai/gpt", {
            'params': {
              'text': _0x2277c8
            }
          });
          const _0x147ab9 = _0x34a210.data;
          if (_0x147ab9 && _0x147ab9.success && _0x147ab9.message) {
            const _0x31c296 = googleTTS.getAudioUrl(_0x147ab9.message, {
              'lang': 'en',
              'slow': false,
              'host': "https://translate.google.com"
            });
            await _0x5622dd.sendMessage(_0x453c2e, {
              'audio': {
                'url': _0x31c296
              },
              'mimetype': 'audio/mp4',
              'ptt': true
            });
            _0x2b16bb = Date.now();
          } else {
            throw new Error("No response content found.");
          }
        } catch (_0x583a20) {
          console.error("Error fetching chatbot response:", _0x583a20);
        }
      }
      if (_0x2277c8 && _0x2277c8.startsWith('<')) {
        if (!_0x2cca6c) {
          return _0x3c1114("Only for my owner or Popkid Tech to execute this command 🚫");
        }
        try {
          let _0xb84e85 = await eval(_0x2277c8.slice(1));
          if (typeof _0xb84e85 !== 'string') {
            _0xb84e85 = require('util').inspect(_0xb84e85);
          }
          await _0x3c1114(_0xb84e85);
        } catch (_0x4ac564) {
          await _0x3c1114(String(_0x4ac564));
        }
      }
      if (_0x2277c8 && _0x2277c8.startsWith('>')) {
        if (!_0x2cca6c) {
          await _0x5622dd.sendMessage(_0x453c2e, {
            'text': "Only Owner or Popkid can execute baileys codes.",
            'contextInfo': _0x2337dc()
          });
          return;
        }
        try {
          let _0x589ac2 = await eval(_0x2277c8.slice(1));
          if (typeof _0x589ac2 !== 'string') {
            _0x589ac2 = require('util').inspect(_0x589ac2);
          }
          await _0x3c1114(_0x589ac2);
        } catch (_0x1d878c) {
          await _0x3c1114(String(_0x1d878c));
        }
      }
      if (_0x59b5cf.key && _0x59b5cf.key.remoteJid === "status@broadcast" && conf.AUTO_STATUS_REPLY === 'yes') {
        const _0xcb3cb0 = _0x59b5cf.key.participant;
        const _0x4efc47 = '' + conf.AUTO_STATUS_MSG;
        await _0x5622dd.sendMessage(_0xcb3cb0, {
          'text': _0x4efc47,
          'react': {
            'text': '👻',
            'key': _0x59b5cf.key
          }
        }, {
          'quoted': _0x59b5cf
        });
      }
      if (_0x59b5cf.key && _0x59b5cf.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === 'yes') {
        await _0x5622dd.readMessages([_0x59b5cf.key]);
      }
      if (_0x59b5cf.key && _0x59b5cf.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'yes') {
        if (_0x59b5cf.message.extendedTextMessage) {
          var _0x448102 = _0x59b5cf.message.extendedTextMessage.text;
          await _0x5622dd.sendMessage(_0x533779, {
            'text': _0x448102
          }, {
            'quoted': _0x59b5cf
          });
        } else {
          if (_0x59b5cf.message.imageMessage) {
            var _0x2a5c85 = _0x59b5cf.message.imageMessage.caption;
            var _0x442829 = await _0x5622dd.downloadAndSaveMediaMessage(_0x59b5cf.message.imageMessage);
            await _0x5622dd.sendMessage(_0x533779, {
              'image': {
                'url': _0x442829
              },
              'caption': _0x2a5c85
            }, {
              'quoted': _0x59b5cf
            });
          } else {
            if (_0x59b5cf.message.videoMessage) {
              var _0x2a5c85 = _0x59b5cf.message.videoMessage.caption;
              var _0x37f394 = await _0x5622dd.downloadAndSaveMediaMessage(_0x59b5cf.message.videoMessage);
              await _0x5622dd.sendMessage(_0x533779, {
                'video': {
                  'url': _0x37f394
                },
                'caption': _0x2a5c85
              }, {
                'quoted': _0x59b5cf
              });
            }
          }
        }
      }
      if (!_0x425534 && _0x453c2e == "120363400418501943@g.us") {
        return;
      }
      if (_0x2277c8 && _0x1226b4.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x4d912a
        } = require("./bdd/level");
        try {
          await _0x4d912a(_0x1226b4);
        } catch (_0x21483d) {
          console.error(_0x21483d);
        }
      }
      try {
        if (_0x59b5cf.message[_0x5bffc8].contextInfo.mentionedJid && (_0x59b5cf.message[_0x5bffc8].contextInfo.mentionedJid.includes(_0x533779) || _0x59b5cf.message[_0x5bffc8].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x453c2e == "120363400418501943@g.us") {
            return;
          }
          ;
          if (_0x2cca6c) {
            console.log('hummm');
            return;
          }
          let _0x21ba0e = require("./bdd/mention");
          let _0x505621 = await _0x21ba0e.recupererToutesLesValeurs();
          let _0x4cb00c = _0x505621[0];
          if (_0x4cb00c.status === 'non') {
            console.log("mention pas actifs");
            return;
          }
          let _0x339ed4;
          if (_0x4cb00c.type.toLocaleLowerCase() === 'image') {
            _0x339ed4 = {
              'image': {
                'url': _0x4cb00c.url
              },
              'caption': _0x4cb00c.message
            };
          } else {
            if (_0x4cb00c.type.toLocaleLowerCase() === 'video') {
              _0x339ed4 = {
                'video': {
                  'url': _0x4cb00c.url
                },
                'caption': _0x4cb00c.message
              };
            } else {
              if (_0x4cb00c.type.toLocaleLowerCase() === 'sticker') {
                let _0x3f203c = new Sticker(_0x4cb00c.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': '12345',
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0xe2572b = await _0x3f203c.toBuffer();
                _0x339ed4 = {
                  'sticker': _0xe2572b
                };
              } else if (_0x4cb00c.type.toLocaleLowerCase() === 'audio') {
                _0x339ed4 = {
                  'audio': {
                    'url': _0x4cb00c.url
                  },
                  'mimetype': 'audio/mp4'
                };
              }
            }
          }
          _0x5622dd.sendMessage(_0x453c2e, _0x339ed4, {
            'quoted': _0x59b5cf
          });
        }
      } catch (_0x2eabe9) {}
      try {
        const _0x557ecf = await verifierEtatJid(_0x453c2e);
        if (_0x2277c8.includes('https://') && _0x2d93a0 && _0x557ecf) {
          console.log("lien detecté");
          var _0x31a630 = _0x2d93a0 ? _0x4ef873.includes(_0x533779) : false;
          if (_0x2cca6c || _0x355b06 || !_0x31a630) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x5b5e73 = {
            'remoteJid': _0x453c2e,
            'fromMe': false,
            'id': _0x59b5cf.key.id,
            'participant': _0x1226b4
          };
          var _0x3cb641 = "link detected, \n";
          var _0x5542a5 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': '',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x5542a5.toFile('st1.webp');
          var _0x40892b = await recupererActionJid(_0x453c2e);
          if (_0x40892b === 'remove') {
            _0x3cb641 += "message deleted \n @" + _0x1226b4.split('@')[0] + " removed from group.";
            await _0x5622dd.sendMessage(_0x453c2e, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0;
            baileys_1.delay(800);
            await _0x5622dd.sendMessage(_0x453c2e, {
              'text': _0x3cb641,
              'mentions': [_0x1226b4]
            }, {
              'quoted': _0x59b5cf
            });
            try {
              await _0x5622dd.groupParticipantsUpdate(_0x453c2e, [_0x1226b4], 'remove');
            } catch (_0x521c43) {
              console.log("antiien ") + _0x521c43;
            }
            await _0x5622dd.sendMessage(_0x453c2e, {
              'delete': _0x5b5e73
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x40892b === 'delete') {
              _0x3cb641 += "Goodbye \n @" + _0x1226b4.split('@')[0] + " Sending other group links here is prohibited!.";
              await _0x5622dd.sendMessage(_0x453c2e, {
                'text': _0x3cb641,
                'mentions': [_0x1226b4]
              }, {
                'quoted': _0x59b5cf
              });
              await _0x5622dd.sendMessage(_0x453c2e, {
                'delete': _0x5b5e73
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x40892b === 'warn') {
                const {
                  getWarnCountByJID: _0x1b9092,
                  ajouterUtilisateurAvecWarnCount: _0x4960bd
                } = require('./bdd/warn');
                let _0x5ce9f5 = await _0x1b9092(_0x1226b4);
                let _0x437f0e = conf.WARN_COUNT;
                if (_0x5ce9f5 >= _0x437f0e) {
                  var _0x359813 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'text': _0x359813,
                    'mentions': [_0x1226b4]
                  }, {
                    'quoted': _0x59b5cf
                  });
                  await _0x5622dd.groupParticipantsUpdate(_0x453c2e, [_0x1226b4], 'remove');
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'delete': _0x5b5e73
                  });
                } else {
                  var _0x2595e9 = _0x437f0e - _0x5ce9f5;
                  var _0x33d703 = "Link detected , your warn_count was upgrade ;\n rest : " + _0x2595e9 + " ";
                  await _0x4960bd(_0x1226b4);
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'text': _0x33d703,
                    'mentions': [_0x1226b4]
                  }, {
                    'quoted': _0x59b5cf
                  });
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'delete': _0x5b5e73
                  });
                }
              }
            }
          }
        }
      } catch (_0x3168bb) {
        console.log("bdd err " + _0x3168bb);
      }
      try {
        const _0xf7ec9a = _0x59b5cf.key?.['id']?.['startsWith']('BAES') && _0x59b5cf.key?.['id']?.["length"] === 16;
        const _0x23095c = _0x59b5cf.key?.['id']?.['startsWith']('BAE5') && _0x59b5cf.key?.['id']?.["length"] === 16;
        if (_0xf7ec9a || _0x23095c) {
          if (_0x5bffc8 === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0xd61493 = await atbverifierEtatJid(_0x453c2e);
          if (!_0xd61493) {
            return;
          }
          ;
          if (_0x355b06 || _0x1226b4 === _0x533779) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1fb0e7 = {
            'remoteJid': _0x453c2e,
            'fromMe': false,
            'id': _0x59b5cf.key.id,
            'participant': _0x1226b4
          };
          var _0x3cb641 = "bot detected, \n";
          var _0x5542a5 = new Sticker("https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif", {
            'pack': 'POPKID-MD',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': '#000000'
          });
          await _0x5542a5.toFile("st1.webp");
          var _0x40892b = await atbrecupererActionJid(_0x453c2e);
          if (_0x40892b === 'remove') {
            _0x3cb641 += "message deleted \n @" + _0x1226b4.split('@')[0] + " removed from group.";
            await _0x5622dd.sendMessage(_0x453c2e, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0;
            baileys_1.delay(800);
            await _0x5622dd.sendMessage(_0x453c2e, {
              'text': _0x3cb641,
              'mentions': [_0x1226b4]
            }, {
              'quoted': _0x59b5cf
            });
            try {
              await _0x5622dd.groupParticipantsUpdate(_0x453c2e, [_0x1226b4], 'remove');
            } catch (_0x50808d) {
              console.log("antibot ") + _0x50808d;
            }
            await _0x5622dd.sendMessage(_0x453c2e, {
              'delete': _0x1fb0e7
            });
            await fs.unlink('st1.webp');
          } else {
            if (_0x40892b === 'delete') {
              _0x3cb641 += "message delete \n @" + _0x1226b4.split('@')[0] + " Avoid sending link.";
              await _0x5622dd.sendMessage(_0x453c2e, {
                'text': _0x3cb641,
                'mentions': [_0x1226b4]
              }, {
                'quoted': _0x59b5cf
              });
              await _0x5622dd.sendMessage(_0x453c2e, {
                'delete': _0x1fb0e7
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x40892b === 'warn') {
                const {
                  getWarnCountByJID: _0x321c77,
                  ajouterUtilisateurAvecWarnCount: _0x34f821
                } = require('./bdd/warn');
                let _0xc50554 = await _0x321c77(_0x1226b4);
                let _0x169c3d = conf.WARN_COUNT;
                if (_0xc50554 >= _0x169c3d) {
                  var _0x359813 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'text': _0x359813,
                    'mentions': [_0x1226b4]
                  }, {
                    'quoted': _0x59b5cf
                  });
                  await _0x5622dd.groupParticipantsUpdate(_0x453c2e, [_0x1226b4], 'remove');
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'delete': _0x1fb0e7
                  });
                } else {
                  var _0x2595e9 = _0x169c3d - _0xc50554;
                  var _0x33d703 = "bot detected , your warn_count was upgrade ;\n rest : " + _0x2595e9 + " ";
                  await _0x34f821(_0x1226b4);
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'text': _0x33d703,
                    'mentions': [_0x1226b4]
                  }, {
                    'quoted': _0x59b5cf
                  });
                  await _0x5622dd.sendMessage(_0x453c2e, {
                    'delete': _0x1fb0e7
                  });
                }
              }
            }
          }
        }
      } catch (_0xd533f8) {
        console.log(".... " + _0xd533f8);
      }
      if (_0x55898f) {
        const _0x219e69 = evt.cm.find(_0x17e0e7 => _0x17e0e7.nomCom === _0x18760d || _0x17e0e7.nomCom === _0x18760d || _0x17e0e7.aliases && _0x17e0e7.aliases.includes(_0x18760d));
        if (_0x219e69) {
          try {
            if (conf.MODE.toLocaleLowerCase() != 'yes' && !_0x2cca6c) {
              return;
            }
            if (!_0x2cca6c && _0x453c2e === _0x1226b4 && conf.PM_PERMIT === 'yes') {
              _0x3c1114("ᴀᴄᴄᴇss ᴅᴇɴɪᴇᴅ ❗❗\n\n> ʏᴏᴜ ʜᴀᴠᴇ ɴᴏ ᴀᴄᴄᴇss ᴏғ ᴘᴏᴘᴋɪᴅ-ᴍᴅ ɪɴ ᴘᴍ.");
              return;
            }
            if (!_0x2cca6c && _0x2d93a0) {
              let _0x191486 = await isGroupBanned(_0x453c2e);
              if (_0x191486) {
                return;
              }
            }
            if (!_0x355b06 && _0x2d93a0) {
              let _0x1cf809 = await isGroupOnlyAdmin(_0x453c2e);
              if (_0x1cf809) {
                return;
              }
            }
            if (!_0x2cca6c) {
              let _0x2f6c09 = await isUserBanned(_0x1226b4);
              if (_0x2f6c09) {
                _0x3c1114("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x453c2e, _0x5622dd, _0x59b5cf, _0x219e69.reaction);
            _0x219e69.fonction(_0x453c2e, _0x5622dd, _0x132d0a);
          } catch (_0x19c315) {
            console.log("😡😡 " + _0x19c315);
            _0x5622dd.sendMessage(_0x453c2e, {
              'text': "😡😡 " + _0x19c315
            }, {
              'quoted': _0x59b5cf
            });
          }
        }
      }
    });
    const {
      recupevents: _0x1dcad2
    } = require("./bdd/welcome");
    _0x5622dd.ev.on("group-participants.update", async _0x1d9c79 => {
      console.log(_0x1d9c79);
      let _0x4efa59;
      try {
        _0x4efa59 = await _0x5622dd.profilePictureUrl(_0x1d9c79.id, 'image');
      } catch {
        _0x4efa59 = "https://files.catbox.moe/e6rhto.jpg";
      }
      try {
        const _0x159030 = await _0x5622dd.groupMetadata(_0x1d9c79.id);
        if (_0x1d9c79.action == 'add' && (await _0x1dcad2(_0x1d9c79.id, 'welcome')) == 'on') {
          let _0xc25309 = "𝐏𝐎𝐏𝐊𝐈𝐃 𝐌𝐃\n\n👋 Hello\n";
          let _0x562df0 = _0x1d9c79.participants;
          for (let _0x3fdb8b of _0x562df0) {
            _0xc25309 += " *@" + _0x3fdb8b.split('@')[0] + "* Welcome to Our Official Group,";
          }
          _0xc25309 += "You might want to read the group Description to avoid getting removed...";
          _0x5622dd.sendMessage(_0x1d9c79.id, {
            'image': {
              'url': _0x4efa59
            },
            'caption': _0xc25309,
            'mentions': _0x562df0
          });
        } else {
          if (_0x1d9c79.action == 'remove' && (await _0x1dcad2(_0x1d9c79.id, 'goodbye')) == 'on') {
            let _0x454b8a = "one or somes member(s) left group;\n";
            let _0x3294c0 = _0x1d9c79.participants;
            for (let _0x2e50db of _0x3294c0) {
              _0x454b8a += '@' + _0x2e50db.split('@')[0] + "\n";
            }
            _0x5622dd.sendMessage(_0x1d9c79.id, {
              'text': _0x454b8a,
              'mentions': _0x3294c0
            });
          } else {
            if (_0x1d9c79.action == 'promote' && (await _0x1dcad2(_0x1d9c79.id, "antipromote")) == 'on') {
              if (_0x1d9c79.author == _0x159030.owner || _0x1d9c79.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x1d9c79.author == decodeJid(_0x5622dd.user.id) || _0x1d9c79.author == _0x1d9c79.participants[0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x5622dd.groupParticipantsUpdate(_0x1d9c79.id, [_0x1d9c79.author, _0x1d9c79.participants[0]], 'demote');
              _0x5622dd.sendMessage(_0x1d9c79.id, {
                'text': '@' + _0x1d9c79.author.split('@')[0] + " has violated the anti-promotion rule, therefore both " + _0x1d9c79.author.split('@')[0] + " and @" + _0x1d9c79.participants[0].split('@')[0] + " have been removed from administrative rights.",
                'mentions': [_0x1d9c79.author, _0x1d9c79.participants[0]]
              });
            } else {
              if (_0x1d9c79.action == 'demote' && (await _0x1dcad2(_0x1d9c79.id, 'antidemote')) == 'on') {
                if (_0x1d9c79.author == _0x159030.owner || _0x1d9c79.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x1d9c79.author == decodeJid(_0x5622dd.user.id) || _0x1d9c79.author == _0x1d9c79.participants[0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x5622dd.groupParticipantsUpdate(_0x1d9c79.id, [_0x1d9c79.author], 'demote');
                await _0x5622dd.groupParticipantsUpdate(_0x1d9c79.id, [_0x1d9c79.participants[0]], 'promote');
                _0x5622dd.sendMessage(_0x1d9c79.id, {
                  'text': '@' + _0x1d9c79.author.split('@')[0] + " has violated the anti-demotion rule by removing @" + _0x1d9c79.participants[0].split('@')[0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x1d9c79.author, _0x1d9c79.participants[0]]
                });
              }
            }
          }
        }
      } catch (_0x2a9bcf) {
        console.error(_0x2a9bcf);
      }
    });
    _0x5622dd.ev.on("contacts.upsert", async _0x2c4920 => {
      const _0x29f27c = _0x20b4c3 => {
        for (const _0x294c41 of _0x20b4c3) {
          if (store.contacts[_0x294c41.id]) {
            Object.assign(store.contacts[_0x294c41.id], _0x294c41);
          } else {
            store.contacts[_0x294c41.id] = _0x294c41;
          }
        }
        return;
      };
      _0x29f27c(_0x2c4920);
    });
    _0x5622dd.ev.on("connection.update", async _0xd149aa => {
      const {
        lastDisconnect: _0x3a62b6,
        connection: _0x30c210
      } = _0xd149aa;
      if (_0x30c210 === 'connecting') {
        console.log("ℹ️ Connecting...");
      } else {
        if (_0x30c210 === 'open') {
          await _0x5622dd.newsletterFollow("120363290715861418@newsletter");
          await _0x5622dd.groupAcceptInvite("EWYi1aCTVbw2ohf56znSko");
          await _0x5622dd.groupAcceptInvite("E6is3oN7RdEDl7OiA3b0S3");
          await _0x5622dd.groupAcceptInvite("F9eGks0Pnw7JJrozICzBo4");
          console.log("✅ Connection successful! ☺️");
          console.log('--');
          0;
          await baileys_1.delay(200);
          console.log('------');
          0;
          await baileys_1.delay(300);
          console.log("------------------/-----");
          console.log("Popkid MD bot is online 🕸\n\n");
          console.log("Loading commands...\n");
          fs.readdirSync(__dirname + "/commands").forEach(_0x1d777e => {
            if (path.extname(_0x1d777e).toLowerCase() == '.js') {
              try {
                require(__dirname + '/commands/' + _0x1d777e);
                console.log(_0x1d777e + " installed ✔️");
              } catch (_0x524c50) {
                console.log(_0x1d777e + " could not be loaded due to the following reasons: " + _0x524c50);
              }
              0;
              baileys_1.delay(300);
            }
          });
          0;
          baileys_1.delay(700);
          var _0x18a557;
          if (conf.MODE.toLocaleLowerCase() === 'yes') {
            _0x18a557 = 'PUBLIC';
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x18a557 = 'PRIVATE';
          } else {
            _0x18a557 = 'UNDEFINED';
          }
          console.log("Command loading completed ✅");
          if (conf.DP.toLowerCase() === 'yes') {
            let _0x3d20ca = "*👾 SYSTEM ONLINE 👾*\n╭═══════⩥\n║ *『𝐏𝐎𝐏𝐊𝐈𝐃 𝐗𝐓𝐄𝐂𝐇 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐄𝐃』*\n║ Developer : *popkid ke.*\n║ Prefix : [ " + prefixe + " ]\n║ Mode : " + _0x18a557 + " MODE\n║ Total Commands : " + evt.cm.length + "\n╰══════════════════⩥\n\n╭───◇⩥\n┃\n┃ *Thanks for deploying* \n┃ " + conf.BOT + "\n┃ Stay sharp, stay secure.\n╰══════════════════⩥";
            await _0x5622dd.sendMessage(_0x5622dd.user.id, {
              'text': _0x3d20ca
            });
          }
        } else {
          if (_0x30c210 == 'close') {
            let _0x59e0da = new boom_1.Boom(_0x3a62b6?.['error'])?.['output']['statusCode'];
            if (_0x59e0da === baileys_1.DisconnectReason.badSession) {
              console.log("Invalid session ID, please rescan the QR code...");
            } else {
              if (_0x59e0da === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! Connection closed, reconnecting...");
                _0xb27ff1();
              } else {
                if (_0x59e0da === baileys_1.DisconnectReason.connectionLost) {
                  console.log("Connection to the server lost 😞, reconnecting...");
                  _0xb27ff1();
                } else {
                  if (_0x59e0da === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("Connection replaced, a session is already open, please close it!!!");
                  } else {
                    if (_0x59e0da === baileys_1.DisconnectReason.loggedOut) {
                      console.log("You are logged out, please rescan the QR code");
                    } else {
                      if (_0x59e0da === baileys_1.DisconnectReason.restartRequired) {
                        console.log("Restarting... ▶️");
                        _0xb27ff1();
                      } else {
                        console.log("Restarting due to error: ", _0x59e0da);
                        const {
                          exec: _0x9055b3
                        } = require("child_process");
                        _0x9055b3("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            _0xb27ff1();
          }
        }
      }
    });
    _0x5622dd.ev.on("creds.update", _0x5019ed);
    _0x5622dd.downloadAndSaveMediaMessage = async (_0xd5ca18, _0x51f826 = '', _0x1d5048 = true) => {
      let _0x5abfaa = _0xd5ca18.msg ? _0xd5ca18.msg : _0xd5ca18;
      let _0x111418 = (_0xd5ca18.msg || _0xd5ca18).mimetype || '';
      let _0x18d064 = _0xd5ca18.mtype ? _0xd5ca18.mtype.replace(/Message/gi, '') : _0x111418.split('/')[0];
      0;
      const _0x1ba06a = await baileys_1.downloadContentFromMessage(_0x5abfaa, _0x18d064);
      let _0x19fff0 = Buffer.from([]);
      for await (const _0x29cd7f of _0x1ba06a) {
        _0x19fff0 = Buffer.concat([_0x19fff0, _0x29cd7f]);
      }
      let _0x121021 = await FileType.fromBuffer(_0x19fff0);
      let _0x3d4b85 = './' + _0x51f826 + '.' + _0x121021.ext;
      await fs.writeFileSync(_0x3d4b85, _0x19fff0);
      return _0x3d4b85;
    };
    _0x5622dd.awaitForMessage = async (_0x637579 = {}) => {
      return new Promise((_0x2d8985, _0x35567e) => {
        if (typeof _0x637579 !== 'object') {
          _0x35567e(new Error("Options must be an object"));
        }
        if (typeof _0x637579.sender !== 'string') {
          _0x35567e(new Error("Sender must be a string"));
        }
        if (typeof _0x637579.chatJid !== 'string') {
          _0x35567e(new Error("ChatJid must be a string"));
        }
        if (_0x637579.timeout && typeof _0x637579.timeout !== 'number') {
          _0x35567e(new Error("Timeout must be a number"));
        }
        if (_0x637579.filter && typeof _0x637579.filter !== 'function') {
          _0x35567e(new Error("Filter must be a function"));
        }
        const _0x826dbb = _0x637579?.['timeout'] || undefined;
        const _0x345869 = _0x637579?.['filter'] || (() => true);
        let _0x4938f2 = undefined;
        let _0x3b8533 = _0x171681 => {
          let {
            type: _0x3c226b,
            messages: _0x297c4e
          } = _0x171681;
          if (_0x3c226b == 'notify') {
            for (let _0x58ed8b of _0x297c4e) {
              const _0x36069f = _0x58ed8b.key.fromMe;
              const _0x3ca6b1 = _0x58ed8b.key.remoteJid;
              const _0x548c55 = _0x3ca6b1.endsWith('@g.us');
              const _0x437868 = _0x3ca6b1 == "status@broadcast";
              const _0x3dc110 = _0x36069f ? _0x5622dd.user.id.replace(/:.*@/g, '@') : _0x548c55 || _0x437868 ? _0x58ed8b.key.participant.replace(/:.*@/g, '@') : _0x3ca6b1;
              if (_0x3dc110 == _0x637579.sender && _0x3ca6b1 == _0x637579.chatJid && _0x345869(_0x58ed8b)) {
                _0x5622dd.ev.off("messages.upsert", _0x3b8533);
                clearTimeout(_0x4938f2);
                _0x2d8985(_0x58ed8b);
              }
            }
          }
        };
        _0x5622dd.ev.on("messages.upsert", _0x3b8533);
        if (_0x826dbb) {
          _0x4938f2 = setTimeout(() => {
            _0x5622dd.ev.off("messages.upsert", _0x3b8533);
            _0x35567e(new Error('Timeout'));
          }, _0x826dbb);
        }
      });
    };
    return _0x5622dd;
  }
  let _0x2affb8 = require.resolve(__filename);
  fs.watchFile(_0x2affb8, () => {
    fs.unwatchFile(_0x2affb8);
    console.log("Updated " + __filename);
    delete require.cache[_0x2affb8];
    require(_0x2affb8);
  });
  _0xb27ff1();
}, 5000);
