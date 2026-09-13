/* =========================================================
   MOCK PRINTER DATA

   Later we will replace this with real printer data
   and Google Sheet history.
========================================================= */

const printers = [

  {
    id: 1,

    name: "Printer 01",
    location: "CS Lab - West",

    status: "online",

    cartridgeRemaining: 56,

    tray: {
      status: "ready",
      title: "Tray Ready",
      description: "Paper level normal"
    },

    installedDate: "Sep 1, 2026",

    history: [
      {
        start: "Jun 5",
        end: "Jul 20",
        pages: 2904,
        label: "Cartridge 1"
      },

      {
        start: "Jul 20",
        end: "Sep 1",
        pages: 2811,
        label: "Cartridge 2"
      },

      {
        start: "Sep 1",
        end: "Today",
        pages: 1235,
        label: "Current",
        current: true
      }
    ]
  },


  {
    id: 2,

    name: "Printer 02",
    location: "CS Lab - East",

    status: "online",

    cartridgeRemaining: 32,

    tray: {
      status: "warning",
      title: "Reload Tray 1",
      description: "Paper level low"
    },

    installedDate: "Aug 14, 2026",

    history: [
      {
        start: "May 8",
        end: "Jun 29",
        pages: 2750,
        label: "Cartridge 1"
      },

      {
        start: "Jun 29",
        end: "Aug 14",
        pages: 3010,
        label: "Cartridge 2"
      },

      {
        start: "Aug 14",
        end: "Today",
        pages: 1904,
        label: "Current",
        current: true
      }
    ]
  },


  {
    id: 3,

    name: "Printer 03",
    location: "CS Lab",

    status: "sleep",

    cartridgeRemaining: 78,

    tray: {
      status: "ready",
      title: "Tray Ready",
      description: "Paper level normal"
    },

    installedDate: "Aug 29, 2026",

    history: [
      {
        start: "Jun 2",
        end: "Jul 16",
        pages: 2602,
        label: "Cartridge 1"
      },

      {
        start: "Jul 16",
        end: "Aug 29",
        pages: 2875,
        label: "Cartridge 2"
      },

      {
        start: "Aug 29",
        end: "Today",
        pages: 870,
        label: "Current",
        current: true
      }
    ]
  },


  {
    id: 4,

    name: "Printer 04",
    location: "CS Lab",

    status: "online",

    cartridgeRemaining: 41,

    tray: {
      status: "ready",
      title: "Tray Ready",
      description: "Paper level normal"
    },

    installedDate: "Jul 30, 2026",

    history: [
      {
        start: "Apr 20",
        end: "Jun 4",
        pages: 2960,
        label: "Cartridge 1"
      },

      {
        start: "Jun 4",
        end: "Jul 30",
        pages: 2780,
        label: "Cartridge 2"
      },

      {
        start: "Jul 30",
        end: "Today",
        pages: 2295,
        label: "Current",
        current: true
      }
    ]
  },


  {
    id: 5,

    name: "Printer 05",
    location: "CS Lab",

    status: "offline",

    cartridgeRemaining: 12,

    tray: {
      status: "error",
      title: "Printer Offline",
      description: "Check connection"
    },

    installedDate: "Aug 10, 2026",

    history: [
      {
        start: "May 14",
        end: "Jun 28",
        pages: 2830,
        label: "Cartridge 1"
      },

      {
        start: "Jun 28",
        end: "Aug 10",
        pages: 2715,
        label: "Cartridge 2"
      },

      {
        start: "Aug 10",
        end: "Today",
        pages: 1540,
        label: "Current",
        current: true
      }
    ]
  }

];


/* =========================================================
   HELPERS
========================================================= */

function formatNumber(number) {
  return new Intl.NumberFormat("en-US").format(number);
}


function getStatusLabel(status) {

  if (status === "online") {
    return "Online";
  }

  if (status === "sleep") {
    return "Sleep";
  }

  return "Offline";
}


function getTrayIcon(status) {

  if (status === "ready") {
    return "✓";
  }

  if (status === "warning") {
    return "!";
  }

  return "!";
}


/* =========================================================
   CARTRIDGE COLOR
========================================================= */

function getCartridgeColor(percentage) {

  if (percentage <= 15) {
    return "#e93434";
  }

  if (percentage <= 30) {
    return "#f5b51b";
  }

  return "#6d63ff";
}


/* =========================================================
   CARD BACKGROUND STATUS
========================================================= */

function getCardClass(printer) {

  if (printer.status === "offline") {
    return "offline-card";
  }

  if (printer.tray.status === "warning") {
    return "warning-card";
  }

  if (printer.status === "sleep") {
    return "sleep-card";
  }

  return "";
}


/* =========================================================
   PRINTER GRAPHIC
========================================================= */

function createPrinterGraphic() {

  return `
    <div class="printer-graphic">

      <div class="printer-paper"></div>

      <div class="printer-body">

        <div class="printer-display"></div>

        <div class="printer-slot"></div>

      </div>

      <div class="printer-output"></div>

    </div>
  `;
}


/* =========================================================
   GRAPH
========================================================= */

function createGraph(history) {

  /*
    Graph maximum is at least 3000 pages.

    If one cartridge exceeds 3000,
    the graph automatically adjusts.
  */

  const largestValue = Math.max(
    3000,
    ...history.map(item => item.pages)
  );


  return history.map(item => {

    const height =
      Math.max(
        4,
        (item.pages / largestValue) * 100
      );


    return `

      <div class="graph-column">

        <span class="graph-value">
          ${formatNumber(item.pages)}
        </span>

        <div
          class="
            graph-bar
            ${item.current ? "current" : ""}
          "
          style="
            height: ${height}%;
          "
        ></div>

        <div class="graph-label">

          ${item.start} – ${item.end}

          <strong>
            ${item.label}
          </strong>

        </div>

      </div>

    `;

  }).join("");
}


/* =========================================================
   CREATE PRINTER CARD
========================================================= */

function createPrinterCard(printer) {

  const currentCartridge =
    printer.history.find(
      item => item.current
    );


  /*
    Estimated paper usage:

    500 pages = approximately one ream.

    This is only an estimate because duplex printing
    can use fewer physical sheets than printed pages.
  */

  const estimatedReams =
    (
      currentCartridge.pages / 500
    ).toFixed(1);


  const cartridgeColor =
    getCartridgeColor(
      printer.cartridgeRemaining
    );


  return `

    <article
      class="
        printer-card
        ${getCardClass(printer)}
      "
      id="printer-${printer.id}"
    >


      <!-- =========================
           COLLAPSED VIEW
      ========================== -->

      <div class="printer-overview">


        <!-- LEFT -->

        <div class="printer-identity">

          <h2>
            ${printer.name}
          </h2>

          <span class="printer-location">
            ${printer.location}
          </span>

          ${createPrinterGraphic()}

        </div>



        <!-- MIDDLE -->

        <div class="printer-condition">


          <div
            class="
              connection-status
              ${printer.status}
            "
          >

            <span class="status-dot"></span>

            ${getStatusLabel(
              printer.status
            )}

          </div>



          <div
            class="
              tray-condition
              ${printer.tray.status}
            "
          >

            <div class="tray-icon">

              ${getTrayIcon(
                printer.tray.status
              )}

            </div>


            <div class="tray-text">

              <strong>
                ${printer.tray.title}
              </strong>

              <span>
                ${printer.tray.description}
              </span>

            </div>

          </div>

        </div>



        <!-- RIGHT -->

        <div class="cartridge-area">

          <div
            class="cartridge-ring"
            style="
              --percentage:
                ${printer.cartridgeRemaining};

              --ring-color:
                ${cartridgeColor};
            "
          >

            <div class="cartridge-content">

              <strong>
                ${printer.cartridgeRemaining}%
              </strong>

              <span>
                Cartridge remaining
              </span>

            </div>

          </div>

        </div>



        <!-- ARROW -->

        <button
          class="expand-button"
          id="button-${printer.id}"
          onclick="togglePrinter(${printer.id})"
          aria-label="Show ${printer.name} analytics"
          aria-expanded="false"
        >

          <span class="chevron"></span>

        </button>

      </div>



      <!-- =========================
           EXPANDED VIEW
      ========================== -->

      <div
        class="analytics-wrapper"
        id="analytics-${printer.id}"
      >

        <div class="analytics-overflow">

          <section class="analytics">

            <h3>
              Usage Analytics
            </h3>

            <p class="analytics-subtitle">
              Pages printed by cartridge
            </p>


            <div class="analytics-content">


              <!-- GRAPH -->

              <div class="graph-area">

                <div class="graph">

                  <span
                    class="graph-y-label y-3000"
                  >
                    3,000
                  </span>

                  <span
                    class="graph-y-label y-2000"
                  >
                    2,000
                  </span>

                  <span
                    class="graph-y-label y-1000"
                  >
                    1,000
                  </span>

                  <span
                    class="graph-y-label y-0"
                  >
                    0
                  </span>


                  <div
                    class="graph-line line-3000"
                  ></div>

                  <div
                    class="graph-line line-2000"
                  ></div>

                  <div
                    class="graph-line line-1000"
                  ></div>


                  ${createGraph(
                    printer.history
                  )}

                </div>

              </div>



              <!-- SUMMARY -->

              <div class="analytics-summary">


                <div class="summary-item">

                  <div class="summary-icon">
                    ◫
                  </div>

                  <div class="summary-text">

                    <span>
                      Last replaced
                    </span>

                    <strong>
                      ${printer.installedDate}
                    </strong>

                  </div>

                </div>



                <div class="summary-item">

                  <div class="summary-icon">
                    ▤
                  </div>

                  <div class="summary-text">

                    <span>
                      Current pages
                    </span>

                    <strong>
                      ${
                        formatNumber(
                          currentCartridge.pages
                        )
                      }
                      pages
                    </strong>

                  </div>

                </div>



                <div class="summary-item">

                  <div class="summary-icon">
                    ▱
                  </div>

                  <div class="summary-text">

                    <span>
                      Estimated paper usage
                    </span>

                    <strong>
                      ~${estimatedReams} reams
                    </strong>

                    <small>
                      based on 500 pages per ream
                    </small>

                  </div>

                </div>


              </div>

            </div>

          </section>

        </div>

      </div>

    </article>

  `;
}


/* =========================================================
   RENDER
========================================================= */

function renderPrinters() {

  const printerList =
    document.getElementById(
      "printerList"
    );


  printerList.innerHTML =
    printers
      .map(createPrinterCard)
      .join("");
}


/* =========================================================
   EXPAND / COLLAPSE
========================================================= */

function togglePrinter(id) {

  const selectedAnalytics =
    document.getElementById(
      `analytics-${id}`
    );


  const selectedButton =
    document.getElementById(
      `button-${id}`
    );


  const alreadyOpen =
    selectedAnalytics
      .classList
      .contains("open");


  /*
    Close every printer first.
    This keeps the page compact.
  */

  document
    .querySelectorAll(
      ".analytics-wrapper"
    )
    .forEach(panel => {

      panel.classList.remove("open");

    });


  document
    .querySelectorAll(
      ".expand-button"
    )
    .forEach(button => {

      button.classList.remove("open");

      button.setAttribute(
        "aria-expanded",
        "false"
      );

    });


  /*
    If selected printer was closed,
    open it.
  */

  if (!alreadyOpen) {

    selectedAnalytics
      .classList
      .add("open");


    selectedButton
      .classList
      .add("open");


    selectedButton.setAttribute(
      "aria-expanded",
      "true"
    );

  }
}


/* =========================================================
   LAST UPDATED TIME
========================================================= */

function updateTime() {

  const now = new Date();


  const date =
    new Intl.DateTimeFormat(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    ).format(now);


  const time =
    new Intl.DateTimeFormat(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit"
      }
    ).format(now);


  document
    .getElementById(
      "lastUpdated"
    )
    .textContent =
      `${date}   ${time}`;
}


/* =========================================================
   REFRESH BUTTON
========================================================= */

function refreshDashboard() {

  /*
    Later this function can request fresh
    information from the real printer API.

    For now it simply updates the timestamp.
  */

  updateTime();
}


/* =========================================================
   START DASHBOARD
========================================================= */

renderPrinters();

updateTime();
