const printerData = {

  name: "Printer 01",

  ip: "10.11.17.42",

  status: "Online",

  tonerRemaining: 64,

  cartridge: {
    installedDate: "2026-09-01",
    startingLifetimeCount: 24380,
    currentLifetimeCount: 25615,
    typicalLife: 2800
  },

  history: [
    {
      date: "Sep 1, 2026",
      pages: 1235,
      status: "Current"
    },

    {
      date: "Jul 20, 2026",
      pages: 2811,
      status: "Replaced"
    },

    {
      date: "Jun 5, 2026",
      pages: 2904,
      status: "Replaced"
    }
  ]

};


function formatNumber(value) {
  return new Intl.NumberFormat(
    "en-US"
  ).format(value);
}


function shortDate(value) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric"
    }
  ).format(
    new Date(
      value + "T00:00:00"
    )
  );

}


function updateDashboard(data) {

  const pagesPrinted =
    data.cartridge.currentLifetimeCount -
    data.cartridge.startingLifetimeCount;


  const usagePercent =
    Math.min(
      100,
      Math.round(
        pagesPrinted /
        data.cartridge.typicalLife *
        100
      )
    );


  /* STATUS */

  document
    .getElementById("statusTitle")
    .textContent =
    data.status;


  document
    .getElementById("printerIp")
    .textContent =
    data.ip;


  /* TONER */

  document
    .getElementById("tonerRemaining")
    .textContent =
    `${data.tonerRemaining}%`;


  const degrees =
    data.tonerRemaining /
    100 *
    360;


  document
    .getElementById("tonerRing")
    .style.background =
    `
      conic-gradient(
        #ffffff 0deg ${degrees}deg,
        rgba(255,255,255,.18)
        ${degrees}deg 360deg
      )
    `;


  /* NUMBERS */

  document
    .getElementById("lifetimePrints")
    .textContent =
    formatNumber(
      data.cartridge.currentLifetimeCount
    );


  document
    .getElementById("pagesPrinted")
    .textContent =
    formatNumber(
      pagesPrinted
    );


  document
    .getElementById("typicalLife")
    .textContent =
    formatNumber(
      data.cartridge.typicalLife
    );


  /* USAGE */

  document
    .getElementById("usagePercent")
    .textContent =
    `${usagePercent}%`;


  document
    .getElementById("usageBar")
    .style.width =
    `${usagePercent}%`;


  document
    .getElementById("installedDate")
    .textContent =
    shortDate(
      data.cartridge.installedDate
    );


  document
    .getElementById("usedPages")
    .textContent =
    `${formatNumber(
      pagesPrinted
    )} pages`;


  document
    .getElementById("typicalLifeBottom")
    .textContent =
    `~${formatNumber(
      data.cartridge.typicalLife
    )} pages`;


  /* HISTORY */

  const historyList =
    document.getElementById(
      "historyList"
    );


  historyList.innerHTML = "";


  data.history.forEach(
    item => {

      const card =
        document.createElement(
          "div"
        );


      card.className =
        `history-item ${
          item.status === "Current"
            ? "current"
            : ""
        }`;


      card.innerHTML = `

        <span class="history-date">
          ${item.date}
        </span>

        <strong>
          ${formatNumber(item.pages)}
        </strong>

        <small>
          pages
        </small>

        <br>

        <span class="history-status">
          ${item.status}
        </span>

      `;


      historyList.appendChild(
        card
      );

    }
  );


  /* TIME */

  document
    .getElementById("lastUpdated")
    .textContent =

    new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    ).format(
      new Date()
    );

}


updateDashboard(
  printerData
);
