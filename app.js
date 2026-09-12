const printerData = {

  name: "Printer 01",

  ip: "10.11.17.42",


  status: {

    level: "healthy",

    title: "Online & Ready"

  },


  tonerRemaining: 64,


  cartridge: {

    installedDate:
      "2026-09-01",

    startingLifetimeCount:
      24380,

    currentLifetimeCount:
      25615,

    typicalLife:
      2800

  },


  history: [

    {
      date: "Sep 1, 2026",
      status: "Current",
      pages: 1235
    },

    {
      date: "Jul 20, 2026",
      status: "Replaced",
      pages: 2811
    },

    {
      date: "Jun 5, 2026",
      status: "Replaced",
      pages: 2904
    }

  ]

};



function number(value) {

  return new Intl.NumberFormat(
    "en-US"
  ).format(value);

}



function date(value) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  ).format(

    new Date(
      value + "T00:00:00"
    )

  );

}



function updateDashboard(data) {


  const pagesPrinted =

    data.cartridge.currentLifetimeCount

    -

    data.cartridge.startingLifetimeCount;



  const usagePercent =

    Math.min(

      100,

      Math.round(

        pagesPrinted

        /

        data.cartridge.typicalLife

        * 100

      )

    );



  /* Printer */

  document.getElementById(
    "printerName"
  ).textContent =
    data.name;


  document.getElementById(
    "printerIp"
  ).textContent =
    data.ip;


  document.getElementById(
    "statusTitle"
  ).textContent =
    data.status.title;



  /* Toner */

  document.getElementById(
    "tonerRemaining"
  ).textContent =
    `${data.tonerRemaining}%`;



  const tonerDegrees =

    data.tonerRemaining

    / 100

    * 360;



  document.getElementById(
    "tonerGauge"
  ).style.background =

    `conic-gradient(
      #4f6ff7 0deg,
      #4f6ff7 ${tonerDegrees}deg,
      #edf0f6 ${tonerDegrees}deg,
      #edf0f6 360deg
    )`;



  /* Cartridge */

  document.getElementById(
    "pagesPrinted"
  ).textContent =
    number(pagesPrinted);


  document.getElementById(
    "currentCartridgePages"
  ).textContent =
    number(pagesPrinted);


  document.getElementById(
    "installedDate"
  ).textContent =
    date(
      data.cartridge.installedDate
    );


  document.getElementById(
    "startingCount"
  ).textContent =
    number(
      data.cartridge.startingLifetimeCount
    );


  document.getElementById(
    "lifetimePrints"
  ).textContent =
    number(
      data.cartridge.currentLifetimeCount
    );


  document.getElementById(
    "typicalLife"
  ).textContent =
    `~${number(
      data.cartridge.typicalLife
    )}`;


  document.getElementById(
    "typicalLifeLabel"
  ).textContent =
    `~${number(
      data.cartridge.typicalLife
    )} pages`;


  document.getElementById(
    "usageBadge"
  ).textContent =
    `${usagePercent}% used`;


  document.getElementById(
    "usageBar"
  ).style.width =
    `${usagePercent}%`;



  /* History */

  const historyList =

    document.getElementById(
      "historyList"
    );


  historyList.innerHTML = "";


  data.history.forEach(
    item => {


      const row =

        document.createElement(
          "div"
        );


      row.className =
        "history-row";


      row.innerHTML = `

        <span>
          ${item.date}
        </span>

        <span>
          ${item.status}
        </span>

        <strong>
          ${number(item.pages)}
          pages
        </strong>

      `;


      historyList.appendChild(
        row
      );

    }

  );



  /* Updated */

  document.getElementById(
    "lastUpdated"
  ).textContent =

    new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    )
    .format(
      new Date()
    );

}



updateDashboard(
  printerData
);
