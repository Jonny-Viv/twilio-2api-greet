const fetch = require("node-fetch");
const mailer = require("@sendgrid/mail");

const todate = new Date();
let holiday = "";

exports.getData = async (req, res, next) => {
  const request = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/en.${req.params.location}%23holiday%40group.v.calendar.google.com/events?key=${process.env.calender}`,
    {
      method: "GET"
    }
  );
  const data = await request.json();
  for (var i = 0; i < data.items.length; i++) {
    if (
      todate.getFullYear().toString() ===
      data.items[i].start.date.split("-")[0].toString()
    ) {
      if (
        (todate.getMonth() + 1).toString() ===
        data.items[i].start.date.split("-")[1].toString()
      ) {
        if (
          todate.getDate().toString() ===
          data.items[i].start.date.split("-")[2].toString()
        ) {
          holiday = data.items[i].summary;
          return res.status(200).json({
            message:
              data.items[i].summary +
              " is today! want to send your loved ones a greeting card"
          });
        } else {
          continue;
        }
      } else {
        continue;
      }
    } else {
      continue;
    }
  }
  res.status(200).json({ message: "No Holiday Today" });
};

exports.send = async (req, res, next) => {
  mailer.setApiKey(process.env.sendgrid);
  const mail = {
    to: req.body.id,
    from: "motagamwala777@gmail.com",
    subject: `Greeting Card From ${req.body.yname} using Tiwiliday`,
    html: `<h3>Hello ${req.body.rname}.</h3> <br> ${req.body.yname} is wishing you and your family a very happy <b>${holiday}</b> ! .<br> Have a great day ahead. <br> Best wishes from <b>Tiwiliday and ${req.body.yname}</b>`
  };
  mailer
    .send(mail)
    .then(() => {
      res.status(200).json({ message: "Email sent successfully" });
    })
    .catch(() => {
      res.status(200).json({ message: "Email failed" });
    });
};
