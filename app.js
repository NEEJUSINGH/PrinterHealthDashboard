const printers = [

  {
    id: 1,

    name: "Printer 01",

    location: "CS Lab",

    status: "online",

    cartridgeUsage: 44,

    tray: {
      status: "ready",
      message: "Tray Ready"
    },

    installedDate: "Sep 1, 2026",

    cartridgeHistory: [

      {
        date: "Jun 5",
        pages: 2904
      },

      {
        date: "Jul 20",
        pages: 2811
      },

      {
        date: "Sep 1",
        pages: 1235,
        current: true
      }

    ],

    paperHistory: [

      {
        date: "Jun 5–Jul 19",
        pages: 2904
      },

      {
        date: "Jul 20–Aug 31",
        pages: 2811
      },

      {
        date: "Sep 1–Now",
        pages: 1235
      }

    ]

  },



  {
    id: 2,

    name: "Printer 02",

    location: "CS Lab",

    status: "online",

    cartridgeUsage: 68,

    tray: {
      status: "warning",
      message: "Reload Tray 1"
    },

    installedDate: "Aug 14, 2026",

    cartridgeHistory: [

      {
        date: "May 8",
        pages: 2750
      },

      {
        date: "Jun 29",
        pages: 3010
      },

      {
        date: "Aug 14",
        pages: 1904,
        current: true
      }

    ],

    paperHistory: [

      {
        date: "May–Jun",
        pages: 2750
      },

      {
        date: "Jun–Aug",
        pages: 3010
      },

      {
        date: "Aug–Now",
        pages: 1904
      }

    ]

  },



  {
    id: 3,

    name: "Printer 03",

    location: "CS Lab",

    status: "sleep",

    cartridgeUsage: 31,

    tray: {
      status: "ready",
      message: "Tray Ready"
    },

    installedDate: "Aug 29, 2026",

    cartridgeHistory: [

      {
        date: "Jun 2",
        pages: 2602
      },

      {
        date: "Jul 16",
        pages: 2875
      },

      {
        date: "Aug 29",
        pages: 870,
        current: true
      }

    ],

    paperHistory: [

      {
        date: "Jun–Jul",
        pages: 2602
      },

      {
        date: "Jul–Aug",
        pages: 2875
      },

      {
        date: "Aug–Now",
        pages: 870
      }

    ]

  },



  {
    id: 4,

    name: "Printer 04",

    location: "CS Lab",

    status: "online",

    cartridgeUsage: 82,

    tray: {
      status: "ready",
      message: "Tray Ready"
    },

    installedDate: "Jul 30, 2026",

    cartridgeHistory: [

      {
        date: "Apr 20",
        pages: 2960
      },

      {
        date: "Jun 4",
        pages: 2780
      },

      {
        date: "Jul 30",
        pages: 2295,
        current: true
      }

    ],

    paperHistory: [

      {
        date: "Apr–Jun",
        pages: 2960
      },

      {
        date: "Jun–Jul",
        pages: 2780
      },

      {
        date: "Jul–Now",
        pages: 2295
      }

    ]

  },



  {
    id: 5,

    name: "Printer 05",

    location: "CS Lab",

    status: "offline",

    cartridgeUsage: 55,

    tray: {
      status: "error",
      message: "Printer Offline"
    },

    installedDate: "Aug 10, 2026",

    cartridgeHistory: [

      {
        date: "May 14",
        pages: 2830
      },

      {
        date: "Jun 28",
        pages: 2715
      },

      {
        date: "Aug 10",
        pages: 1540,
        current: true
      }

    ],

    paperHistory: [

      {
        date: "May–Jun",
        pages: 2830
      },

      {
        date: "Jun–Aug",
        pages: 2715
      },

      {
        date: "Aug–Now",
        pages: 1540
      }

    ]

  }

];



function formatNumber(number) {

  return new Intl.NumberFormat(
    "en-US"
  ).format(number);

}



function statusLabel(status) {

  if (status === "online") {
    return "Online";
  }

  if (status === "sleep") {
    return "Sleep";
  }

  return "Offline";

}



function trayIcon(status) {

  if (status === "ready") {
    return "✓";
  }

  if (status === "warning") {
    return "!";
  }

  return "×";

}



function createCartridgeChart(history) {

  const maxPages =
    Math.max(
      ...history.map(
        item => item.pages
      ),
      3000
    );


  return history.map(item => {

    const height =
      Math.max(
        5,
        (
          item.pages /
          maxPages
        ) * 100
      );


    return `

      <div class="chart-column">

        <span class="chart-value">
          ${formatNumber(item.pages)}
        </span>


        <div class="chart-bar-wrap">

          <div
            class="chart-bar ${
              item.current
                ? "current"
                : ""
            }"
            style="
              height: ${height}%;
            "
          ></div>

        </div>


        <span class="chart-date">
          ${item.date}
        </span>

      </div>

    `;

  }).join("");

}



function createPaperChart(history) {

  const maxPages =
    Math.max(
      ...history.map(
        item => item.pages
      ),
      3000
    );


  return history.map(item => {

    const height =
      Math.max(
        5,
        (
          item.pages /
          maxPages
        ) * 100
      );


    return `

      <div class="paper-period">

        <span class="paper-value">
          ${formatNumber(item.pages)}
        </span>


        <div class="paper-bar-wrap">

          <div
            class="paper-bar"
            style="
              height: ${height}%;
            "
          ></div>

        </div>


        <span class="paper-date">
          ${item.date}
        </span>

      </div>

    `;

  }).join("");

}



function createPrinterCard(printer) {

  const currentCartridge =
    printer.cartridgeHistory.find(
      item => item.current
    );


  const estimatedReams =
    (
      currentCartridge.pages /
      500
    ).toFixed(1);


  return `

    <article
      class="printer-card"
      id="printer-${printer.id}"
    >


      <!-- COLLAPSED SUMMARY -->

      <div class="printer-summary">


        <div class="printer-name">

          <h2>
            ${printer.name}
          </h2>

          <div
            class="status ${printer.status}"
          >

            <span
              class="status-dot"
            ></span>

            ${statusLabel(
              printer.status
            )}

          </div>

        </div>



        <!-- CARTRIDGE -->

        <div class="cartridge-area">

          <div class="cartridge-top">

            <span>
              Cartridge
            </span>

            <strong>
              ${printer.cartridgeUsage}%
            </strong>

          </div>


          <div class="cartridge-track">

            <div
              class="cartridge-fill"
              style="
                width:
                ${printer.cartridgeUsage}%;
              "
            ></div>

          </div>

        </div>



        <!-- TRAY -->

        <div class="tray-area">

          <div
            class="
              tray-message
              ${printer.tray.status}
            "
          >

            <span>
              ${trayIcon(
                printer.tray.status
              )}
            </span>

            ${printer.tray.message}

          </div>

        </div>

      </div>



      <!-- EXPAND BUTTON -->

      <div class="expand-row">

        <button
          class="expand-button"
          aria-label="
            Expand ${printer.name}
          "
          onclick="
            togglePrinter(${printer.id})
          "
        >

          ↓

        </button>

      </div>



      <!-- ANALYTICS -->

      <div
        class="analytics"
        id="analytics-${printer.id}"
      >

        <div class="analytics-header">

          <h3>
            Usage Analytics
          </h3>

          <span>
            ${printer.name}
          </span>

        </div>



        <div class="analytics-grid">


          <!-- CARTRIDGE ANALYTICS -->

          <section class="analytics-panel">

            <div
              class="analytics-panel-header"
            >

              <span>
                CARTRIDGE
              </span>

              <h4>
                Usage by cartridge
              </h4>

            </div>


            <div class="cartridge-chart">

              ${createCartridgeChart(
                printer.cartridgeHistory
              )}

            </div>


            <div class="replacement-note">

              <div>

                <span>
                  Last replaced
                </span>

                <strong>
                  ${printer.installedDate}
                </strong>

              </div>


              <div>

                <span>
                  Current usage
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

          </section>



          <!-- PAPER ANALYTICS -->

          <section class="analytics-panel">

            <div
              class="analytics-panel-header"
            >

              <span>
                ESTIMATED PAPER
              </span>

              <h4>
                Usage by date
              </h4>

            </div>


            <div class="paper-chart">

              ${createPaperChart(
                printer.paperHistory
              )}

            </div>


            <div class="paper-summary">

              <div
                class="paper-summary-item"
              >

                <span>
                  Current period
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


              <div
                class="paper-summary-item"
              >

                <span>
                  Estimated reams
                </span>

                <strong>
                  ~${estimatedReams}
                </strong>

              </div>

            </div>

          </section>


        </div>

      </div>

    </article>

  `;

}



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



function togglePrinter(id) {

  const analytics =
    document.getElementById(
      `analytics-${id}`
    );


  const card =
    document.getElementById(
      `printer-${id}`
    );


  const button =
    card.querySelector(
      ".expand-button"
    );


  const isOpen =
    analytics.classList.contains(
      "open"
    );


  /* CLOSE ALL OTHER PRINTERS */

  document
    .querySelectorAll(
      ".analytics"
    )
    .forEach(panel => {

      panel.classList.remove(
        "open"
      );

    });


  document
    .querySelectorAll(
      ".expand-button"
    )
    .forEach(btn => {

      btn.classList.remove(
        "open"
      );

    });


  /* OPEN SELECTED PRINTER */

  if (!isOpen) {

    analytics.classList.add(
      "open"
    );


    button.classList.add(
      "open"
    );

  }

}



function updateTime() {

  document
    .getElementById(
      "lastUpdated"
    )
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



renderPrinters();

updateTime();
