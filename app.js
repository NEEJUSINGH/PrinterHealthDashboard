// ==========================================
// SAMPLE DATA
// ==========================================
//
// For now the dashboard uses sample data.
//
// Later we can replace this with:
// 1. Real printer data
// 2. Google Sheet data
// 3. Calculations based on both sources
//

const printerData = {

  name: "Printer 01",

  ip: "10.11.17.42",


  status: {

    level: "healthy",

    title: "Healthy",

    message:
      "Printer is online and ready."

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
      installed:
        "Sep 1, 2026",

      status:
        "Current",

      pages:
        1235
    },


    {
      installed:
        "Jul 20, 2026",

      status:
        "Replaced",

      pages:
        2811
    },


    {
      installed:
        "Jun 5, 2026",

      status:
        "Replaced",

      pages:
        2904
    }

  ]

};



// ==========================================
// HELPER FUNCTIONS
// ==========================================

function formatNumber(number) {

  return new Intl.NumberFormat(
    "en-US"
  ).format(number);

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
    new Date(
      dateString +
      "T00:00:00"
    )
  );

}


function shortDate(dateString) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric"
    }
  ).format(
    new Date(
      dateString +
      "T00:00:00"
    )
  );

}



// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard(data) {


  // -----------------------------
  // Cartridge calculations
  // -----------------------------

  const pagesPrinted =

    data.cartridge
      .currentLifetimeCount

    -

    data.cartridge
      .startingLifetimeCount;



  const usagePercent =

    Math.min(

      100,

      Math.round(

        (
          pagesPrinted
          /
          data.cartridge.typicalLife
        )

        * 100

      )

    );



  // -----------------------------
  // Printer information
  // -----------------------------

  document
    .getElementById(
      "printerName"
    )
    .textContent =
      data.name;


  document
    .getElementById(
      "printerIp"
    )
    .textContent =
      data.ip;



  // -----------------------------
  // Printer status
  // -----------------------------

  document
    .getElementById(
      "statusTitle"
    )
    .textContent =
      data.status.title;


  document
    .getElementById(
      "statusMessage"
    )
    .textContent =
      data.status.message;



  const statusDot =

    document.getElementById(
      "statusDot"
    );


  statusDot.className =

    `status-dot ${data.status.level}`;



  // -----------------------------
  // Toner
  // -----------------------------

  document
    .getElementById(
      "tonerRemaining"
    )
    .textContent =

      `${data.tonerRemaining}%`;


  document
    .getElementById(
      "tonerBar"
    )
    .style.width =

      `${data.tonerRemaining}%`;



  // -----------------------------
  // Main numbers
  // -----------------------------

  document
    .getElementById(
      "pagesCurrent"
    )
    .textContent =

      formatNumber(
        pagesPrinted
      );


  document
    .getElementById(
      "lifetimePrints"
    )
    .textContent =

      formatNumber(
        data.cartridge
          .currentLifetimeCount
      );



  document
    .getElementById(
      "installedShort"
    )
    .textContent =

      `Since ${
        shortDate(
          data.cartridge
            .installedDate
        )
      }`;



  // -----------------------------
  // Cartridge details
  // -----------------------------

  document
    .getElementById(
      "installedDate"
    )
    .textContent =

      formatDate(
        data.cartridge
          .installedDate
      );


  document
    .getElementById(
      "startingCount"
    )
    .textContent =

      formatNumber(
        data.cartridge
          .startingLifetimeCount
      );


  document
    .getElementById(
      "currentCount"
    )
    .textContent =

      formatNumber(
        data.cartridge
          .currentLifetimeCount
      );


  document
    .getElementById(
      "pagesPrinted"
    )
    .textContent =

      formatNumber(
        pagesPrinted
      );


  document
    .getElementById(
      "typicalLife"
    )
    .textContent =

      `~${
        formatNumber(
          data.cartridge
            .typicalLife
        )
      } pages`;



  // -----------------------------
  // Cartridge usage
  // -----------------------------

  document
    .getElementById(
      "usageBadge"
    )
    .textContent =

      `${usagePercent}% used`;


  document
    .getElementById(
      "usageCurrentLabel"
    )
    .textContent =

      `${formatNumber(
        pagesPrinted
      )} pages`;


  document
    .getElementById(
      "usageTypicalLabel"
    )
    .textContent =

      `~${
        formatNumber(
          data.cartridge
            .typicalLife
        )
      } typical`;


  document
    .getElementById(
      "usageBar"
    )
    .style.width =

      `${usagePercent}%`;


  document
    .getElementById(
      "usageCaption"
    )
    .textContent =

      `${usagePercent}% of typical cartridge life used`;



  // -----------------------------
  // Cartridge history
  // -----------------------------

  const historyBody =

    document.getElementById(
      "historyBody"
    );


  historyBody.innerHTML =
    "";


  data.history.forEach(
    item => {

      const row =

        document.createElement(
          "tr"
        );


      row.innerHTML = `

        <td>
          ${item.installed}
        </td>

        <td>
          ${item.status}
        </td>

        <td>

          ${formatNumber(
            item.pages
          )}

          ${
            item.status ===
            "Current"

              ? " so far"

              : ""
          }

        </td>

      `;


      historyBody.appendChild(
        row
      );

    }
  );



  // -----------------------------
  // Last updated time
  // -----------------------------

  document
    .getElementById(
      "lastUpdated"
    )
    .textContent =

      new Intl.DateTimeFormat(
        "en-US",
        {
          hour:
            "numeric",

          minute:
            "2-digit"
        }
      )
      .format(
        new Date()
      );

}



// ==========================================
// START DASHBOARD
// ==========================================

updateDashboard(
  printerData
);
