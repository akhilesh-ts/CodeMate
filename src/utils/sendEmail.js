const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

// const createSendEmailCommand = (toAddress, fromAddress) => {
//   return new SendEmailCommand({
//     Destination: {
//       CcAddresses: [],
//       ToAddresses: [toAddress],
//     },
//     Message: {
//       Body: {
//         Html: {
//           Charset: "UTF-8",
//           Data: "<h1>send email body</h1>",
//         },
//         Text: {
//           Charset: "UTF-8",
//           Data: "codematee",
//         },
//       },
//       Subject: {
//         Charset: "UTF-8",
//         Data: "connection request",
//       },
//     },
//     Source: fromAddress,
//     ReplyToAddresses: [],
//   });
// };

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background: #f5f7fa;
      font-family: 'Inter', Arial, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="padding: 40px 0; background: #f5f7fa"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background: #ffffff;
              border-radius: 14px;
              padding: 40px;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            "
          >
            <!-- LOGO -->
            <tr>
              <td style="text-align: center; padding-bottom: 20px;">
                <img
                  src="https://codematee.in/logo.png"
                  alt="CodeMate"
                  width="120"
                  style="display: block; margin: auto;"
                />
              </td>
            </tr>

            <!-- TITLE -->
            <tr>
              <td
                style="
                  text-align: center;
                  font-size: 24px;
                  font-weight: 600;
                  color: #111827;
                  padding-bottom: 10px;
                "
              >
                New Connection Request
              </td>
            </tr>

            <!-- SUBTITLE -->
            <tr>
              <td
                style="
                  text-align: center;
                  font-size: 16px;
                  color: #6b7280;
                  padding-bottom: 30px;
                "
              >
                Someone wants to connect with you on CodeMate.
              </td>
            </tr>

            <!-- CARD SECTION -->
            <tr>
              <td>
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    background: #f9fafb;
                    border-radius: 12px;
                    padding: 25px;
                    border: 1px solid #e5e7eb;
                  "
                >
                  <tr>
                    <td
                      style="
                        font-size: 15px;
                        color: #374151;
                        line-height: 1.6;
                      "
                    >
                      <p style="margin: 0 0 12px 0;">
                        Hi there,
                      </p>

                      <p style="margin: 0 0 12px 0;">
                        You’ve received a new connection request on
                        <strong>CodeMate</strong>. Click the button below to
                        view the details and respond:
                      </p>
                    </td>
                  </tr>

                  <!-- BUTTON -->
                  <tr>
                    <td style="text-align: center; padding-top: 20px;">
                      <a
                        href="https://codematee.in"
                        style="
                          background: #2563eb;
                          color: #ffffff;
                          padding: 12px 24px;
                          text-decoration: none;
                          border-radius: 8px;
                          font-size: 15px;
                          font-weight: 500;
                          display: inline-block;
                        "
                      >
                        View Request
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- SPACING -->
            <tr><td style="padding: 25px 0;"></td></tr>

            <!-- FOOTER -->
            <tr>
              <td
                style="
                  text-align: center;
                  font-size: 13px;
                  color: #9ca3af;
                "
              >
                © 2025 CodeMate. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

          `,
        },
        Text: {
          Charset: "UTF-8",
          Data: "You have a new connection request from CodeMate.",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Connection Request",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "akhileshts091@gmail.com",
    "akhil@codematee.in"
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;

      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = { run };
