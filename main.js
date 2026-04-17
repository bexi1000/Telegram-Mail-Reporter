const nodemailer = require('nodemailer');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    console.log("--- bexi telegram report mailler ---\n");

    try {
        const myEmail = await askQuestion("your gmail adress: ");
        const myAppPassword = await askQuestion("your gmail app password (16 digit google app pasword): ");
        const receiverMail = await askQuestion("Telegram report mail (recommended : abuse@telegram.org): ");
        const targetTMe = await askQuestion("report t.me/ adress: ");
        const reason = await askQuestion("why you are report (like terrorism scam ?): ");

        const subject = `Official Inquiry Regarding Telegram Entity: ${targetTMe}`;
        const body = `
To the Telegram Support and Moderation Team,

This communication is a formal inquiry regarding the following Telegram entity:

- Target Link: ${targetTMe}
- Inquiry Category: ${reason}

As part of a professional OSINT (Open Source Intelligence) investigation, we have flagged this entity for activities that violate Telegram’s Terms of Service and international legal standards. 

We request that your team conducts a thorough internal review of the metadata associated with this address. If applicable, please take appropriate moderation actions in accordance with your security protocols.

Regards,

[Investigator/Researcher]
OSINT Division
`;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myEmail,
                pass: myAppPassword.replace(/\s+/g, '') 
            }
        });

        let mailOptions = {
            from: myEmail,
            to: receiverMail,
            subject: subject,
            text: body
        };

        console.log("created by bexi");
        
        let info = await transporter.sendMail(mailOptions);
        console.log("Message ID: " + info.messageId);

    } catch (error) {
        console.error("\nHATA: Mail gönderilemedi!");
        console.error("Detay:", error.message);
    } finally {
        rl.close();
    }
}

main();
