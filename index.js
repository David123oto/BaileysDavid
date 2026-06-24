const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  const phoneNumber = "2347033661864"; // Replace with your number

  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode(phoneNumber);
    console.log("Your Pairing Code:", code);
  }

  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log("Bot connected successfully!");
    }
  });
}

startBot();
