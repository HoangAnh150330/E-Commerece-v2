const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AXLd1AzbTjtUOydl_5iZ7ol1lBh3X4dlp8aAYl1wGlQv159MAB3bk1dMbTVRnXahZXLkb3X0l6SEynnM",
  client_secret: "EIsWaAEwCyIsd-iM7Tpljt_ZZBBM_4cTJNC1moBYOK121qM2RnPH361bFKFNDhTCw8o8A1J0RlEcXt0T",
});

module.exports = paypal;
