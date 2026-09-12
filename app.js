const printerData = {

  name: "Printer 01",

  ip: "10.11.17.42",

  status: {
    level: "healthy",
    title: "Online"
  },

  tonerRemaining: 64,

  cartridge: {
    installedDate: "2026-09-01",
    startingLifetimeCount: 24380,
    currentLifetimeCount: 25615,
    typicalLife: 2800
  },

  history: [
    {
      installed: "Sep 1, 2026",
      status: "Current",
      pages: 1235
    },
    {
      installed: "Jul 20, 2026",
      status: "Replaced",
      pages: 2811
    },
    {
      installed: "Jun 5, 2026",
      status: "Replaced",
      pages: 2904
    }
  ]

};


// ==============================
// HELPERS
// ==============================

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}


function formatDate(dateString) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  ).format(
    new Date(dateString + "T00:00:00")
  );

}


// ==============================
// DASHBOARD
// ==============================

function updateDashboard(data) {

  const pagesPrinted =
    data.cartridge.currentLifetimeCount -
    data.cartridge.startingLifetimeCount;


  const usagePercent =
    Math.min(
      100,
      Math.round(
        (
          pagesPrinted /
          data.cartridge.typicalLife
        ) * 100
      )
    );


  // ------------------------------
  // Printer name
  // ------------------------------

  document
    .getElementById("printerName")
    .textContent =
    data.name;


  document
    .getElementById("printerNameInfo")
    .textContent =
    data.name;



  // ------------------------------
  // Printer status
  // ------------------------------

  document
    .getElementById("statusTitle")
    .textContent =
    data.status.title;



  // ------------------------------
  // Printer IP
  // ------------------------------

  document
    .getElementById("printerIp")
    .textContent =
    data.ip;



  // ------------------------------
  // Toner
  // ------------------------------

  document
    .getElementById("tonerRemaining")
    .textContent =
    `${data.tonerRemaining}%`;


  document
    .getElementById("tonerInfo")
    .textContent =
    `${data.tonerRemaining}%`;



  // ------------------------------
  // Current cartridge
  // ------------------------------

  document
    .getElementById("currentCartridgePages")
    .textContent =
    formatNumber(pagesPrinted);


  document
    .getElementById("pagesPrinted")
    .textContent =
    formatNumber(pagesPrinted);



  // ------------------------------
  // Lifetime prints
  // ------------------------------

  document
    .getElementById("lifetimePrints")
    .textContent =
    formatNumber(
      data.cartridge.currentLifetimeCount
    );



  // ------------------------------
  // Cartridge details
  // ------------------------------

  document
    .getElementById("installedDate")
    .textContent =
    formatDate(
      data.cartridge.installedDate
    );


  document
    .getElementById("startingCount")
    .textContent =
    formatNumber(
      data.cartridge.startingLifetimeCount
    );


  document
    .getElementById("currentCount")
    .textContent =
    formatNumber(
      data.cartridge.currentLifetimeCount
    );


  document
    .getElementById("typicalLife")
    .textContent =
    `~${formatNumber(
      data.cartridge.typicalLife
    )}`;


  document
    .getElementById("typicalLifeLabel")
    .textContent =
    `~${formatNumber(
      data.cartridge.typicalLife
    )} pages`;



  // ------------------------------
  // Usage %
  // ------------------------------

  document
    .getElementById("usageBadge")
    .textContent =
    `${usagePercent}% used`;


  document
    .getElementById("usageBar")
    .style.width =
    `${usagePercent}%`;



  // ------------------------------
  // Cartridge history
  // ------------------------------

  const historyBody =
    document.getElementById(
      "historyBody"
    );


  historyBody.innerHTML = "";


  data.history.forEach(item => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        ${item.installed}
      </td>

      <td>
        <span class="history-status ${
          item.status === "Current"
            ? "current"
            : "replaced"
        }">
          ${item.status}
        </span>
      </td>

      <td>
        ${formatNumber(item.pages)}
      </td>

    `;


    historyBody.appendChild(row);

  });



  // ------------------------------
  // Updated time
  // ------------------------------

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


// ==============================
// START
// ==============================

updateDashboard(printerData);
