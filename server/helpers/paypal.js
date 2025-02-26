const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ASyFN4I5RcNOFwfkdVHf4mZ2GwUHzt_aUGbcnrCcmbM2IgLFMxmC97UfqRCTop_S1pwID0qKuqAOvnJO",
  client_secret: "EJTP-LS8VmvqIfku70M6lXiu31CS6aspMBg2aBb6Zl-4etv5P7DlloZu0hfaoMokFWhOp7rmOprvVkRI",
});
//sb-ehi47g34537931@business.example.com
//w:.uNw96
module.exports = paypal;
