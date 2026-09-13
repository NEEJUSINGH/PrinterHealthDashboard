const printers = [

  {
    id: 1,

    name: "123 Building Copier Room",

    status: "online",

    paperTray: "full",

    cartridgeRemaining: 56,

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

    name: "123 Building Women Computer Lab",

    status: "online",

    paperTray: "low",

    cartridgeRemaining: 32,

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

    name: "123 Building Men Computer Lab",

    status: "sleep",

    paperTray: "full",

    cartridgeRemaining: 78,

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

    name: "C-Dorm Computer Lab",

    status: "online",

    paperTray: "full",

    cartridgeRemaining: 41,

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

    name: "Sudhana Center Computer Lab",

    status: "offline",

    paperTray: "empty",

    cartridgeRemaining: 12,

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

  return new Intl.NumberFormat(
    "en-US"
  ).format(number);
}


/* =========================================================
   PRINTER STATUS
========================================================= */

function getStatusLabel(status) {

  if (status === "online") {
    return "Online";
  }

  if (status === "sleep") {
    return "Sleep";
  }

  return "Offline";
}


/* =========================================================
   PAPER TRAY
========================================================= */

function getPaperLabel(status) {

  if (status === "full") {
    return "Paper Tray: Full";
  }

  if (status === "low") {
    return "Paper Tray: Low";
  }

  return "Paper Tray: Empty";
}


/* =========================================================
   CARTRIDGE COLOR

   Under 20% = red
   20% and above = green
========================================================= */

function getCartridgeColor(percentage) {

  if (percentage < 20) {
    return "#e93434";
  }

  return "#12b981";
}


/* =========================================================
   PRINTER GRAPHIC
========================================================= */

function createPrinterGraphic(status) {

  return `

    <div class="printer-graphic ${status}">

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

  const largestValue = Math.max(
    3000,
    ...history.map(
      item => item.pages
    )
  );


  return history.map(item => {

    const height =
      Math.max(
        4,
        (
          item.pages /
          largestValue
        ) * 100
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


  const estimatedReams =
    (
      currentCartridge.pages /
      500
    ).toFixed(1);


  const cartridgeColor =
    getCartridgeColor(
      printer.cartridgeRemaining
    );


  return `

    <article
      class="printer-card"
      id="printer-${printer.id}"
    >


      <div class="printer-overview">


        <!-- STATUS -->

        <div class="status-column">

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

        </div>



        <!-- PRINTER GRAPHIC -->

        <div class="graphic-column">

          ${createPrinterGraphic(
            printer.status
          )}

        </div>



        <!-- PRINTER NAME -->

        <div class="printer-text">

          <h2>
            ${printer.name}
          </h2>

        </div>



        <!-- TRAY GRAPHIC -->

        <div class="tray-icon-column">

          <span
            class="
              paper-icon
              ${printer.paperTray}
            "
          ></span>

        </div>



        <!-- TRAY STATUS -->

        <div class="paper-column">

          <div
            class="
              paper-status
              ${printer.paperTray}
            "
          >

            ${getPaperLabel(
              printer.paperTray
            )}

          </div>

        </div>



        <!-- CARTRIDGE -->

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



        <!-- EXPAND -->

        <button
          class="expand-button"
          id="button-${printer.id}"
          onclick="togglePrinter(${printer.id})"

          aria-label="
            Show ${printer.name} analytics
          "

          aria-expanded="false"
        >

          <span class="chevron"></span>

        </button>

      </div>



      <!-- ANALYTICS -->

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


                  <span class="graph-y-label y-3000">
                    3,000
                  </span>


                  <span class="graph-y-label y-2000">
                    2,000
                  </span>


                  <span class="graph-y-label y-1000">
                    1,000
                  </span>


                  <span class="graph-y-label y-0">
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
                      ${formatNumber(
                        currentCartridge.pages
                      )}
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
   UPDATED TIME
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
      `${date}  ${time}`;
}


/* =========================================================
   REFRESH
========================================================= */

function refreshDashboard() {

  updateTime();

}


/* =========================================================
   START
========================================================= */

renderPrinters();

updateTime();
