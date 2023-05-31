<template>
  <section style="flex: 1">
    <div>
      <Header />
    </div>
    <div class="container">
      <div>
        <ul
          class="grid-box"
          style="
            --grid-gap: 2rem;
            --grid-item-size: 18rem;
            --grid-item-size-small-screens: 16rem;
          "
        >
          <li>
            <div class="card">
              <div class="grid-item-1">
                <div class="grid-item-1-start-start">
                  <div class="eyebrow-heading-3">Balance</div>
                  <h2 class="heading-level-6 u-margin-block-start-8">
                    <span>$</span> 5,000
                  </h2>
                </div>
                <div class="grid-item-1-end-start">
                  <div class="u-flex u-gap-16 u-flex-wrap">
                    <div class="tag">
                      <span class="icon-duplicate" aria-hidden="true"></span>
                      <span class="text">Copy account</span>
                    </div>
                  </div>
                </div>
                <div class="grid-item-1-end-end">
                  <ul class="icons u-flex u-gap-8">
                    <li>
                      <span
                        class="icon-lock-closed"
                        aria-hidden="true"
                        aria-label="Secure [OR] unsecure"
                      ></span>
                    </li>
                    <li>
                      <span
                        class="icon-shield-check"
                        aria-hidden="true"
                        aria-label="Safe [OR] unsafe"
                      ></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card">
              <div class="grid-item-1">
                <div class="grid-item-1-start-start">
                  <div class="eyebrow-heading-3">Sales</div>
                  <h2 class="heading-level-6 u-margin-block-start-8">
                    <span>$</span>10,000
                  </h2>
                </div>
                <div class="grid-item-1-start-end">
                  <div class="status">
                    <button class="tag">
                      <span class="text">+60%</span>
                    </button>
                  </div>
                </div>
                <!-- <div class="grid-item-1-end-start">
              <div class="u-flex u-gap-16 u-flex-wrap">
                <div class="tag">
                  <span class="icon-duplicate" aria-hidden="true"></span>
                  <span class="text">Interactive</span>
                </div>
              </div>
            </div> -->
                <div class="grid-item-1-end-end">
                  <ul class="icons u-flex u-gap-8">
                    <li>
                      <span
                        class="icon-lock-closed u-opacity-20"
                        aria-hidden="true"
                        aria-label="Secure [OR] unsecure"
                      ></span>
                    </li>
                    <li>
                      <span
                        class="icon-shield-check u-opacity-20"
                        aria-hidden="true"
                        aria-label="Safe [OR] unsafe"
                      ></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card">
              <div class="grid-item-1">
                <div class="grid-item-1-start-start">
                  <div class="eyebrow-heading-3">Balance</div>
                  <h2 class="heading-level-6 u-margin-block-start-8">
                    <span>$</span> 5,000
                  </h2>
                </div>
                <div class="grid-item-1-end-start">
                  <div class="u-flex u-gap-16 u-flex-wrap">
                    <div class="tag">
                      <span class="icon-duplicate" aria-hidden="true"></span>
                      <span class="text">Copy account</span>
                    </div>
                  </div>
                </div>
                <div class="grid-item-1-end-end">
                  <ul class="icons u-flex u-gap-8">
                    <li>
                      <span
                        class="icon-lock-closed"
                        aria-hidden="true"
                        aria-label="Secure [OR] unsecure"
                      ></span>
                    </li>
                    <li>
                      <span
                        class="icon-shield-check"
                        aria-hidden="true"
                        aria-label="Safe [OR] unsafe"
                      ></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- recent transactions starts here -->
      <div class="u-padding-block-end-56">
        <div class="container">
          <div class="recent-transactions" style="padding-top: 25px">
            <h1>Recent Transactions</h1>
          </div>
          <div class="u-padding-block-12">
            <table class="table is-selected-columns-mobile">
              <thead class="table-thead">
                <tr class="table-row">
                  <th class="table-thead-col">
                    <span class="eyebrow-heading-3">Filename</span>
                  </th>
                  <th
                    class="table-thead-col is-only-desktop"
                    style="--p-col-width: 140"
                  >
                    <span class="eyebrow-heading-3">Type</span>
                  </th>
                  <th
                    class="table-thead-col is-only-desktop"
                    style="--p-col-width: 100"
                  >
                    <span class="eyebrow-heading-3">Size</span>
                  </th>
                  <th
                    class="table-thead-col is-only-desktop"
                    style="--p-col-width: 120"
                  >
                    <span class="eyebrow-heading-3">Created</span>
                  </th>
                  <th class="table-thead-col" style="--p-col-width: 40"></th>
                </tr>
              </thead>
              <tbody class="table-tbody">
                <tr class="table-row">
                  <td class="table-col" data-title="Name">
                    <div class="u-inline-flex u-cross-center u-gap-12">
                      <span class="image">
                        <img
                          class="avatar"
                          width="32"
                          height="32"
                          src="https://unsplash.it/41"
                          alt=""
                        />
                      </span>
                      <span class="text u-break-word u-line-height-1-5"
                        >airport.jpg</span
                      >
                    </div>
                  </td>
                  <td class="table-col is-only-desktop" data-title="Type">
                    <div class="tag"><span class="text">image/jpeg</span></div>
                  </td>
                  <td class="table-col is-only-desktop" data-title="Size">
                    <span class="text">336.6 kB</span>
                  </td>
                  <td class="table-col is-only-desktop" data-title="Created">
                    <time class="text">11 Mar 2022</time>
                  </td>
                  <td class="table-col u-overflow-visible">
                    <button
                      class="button is-text is-only-icon"
                      aria-label="more options"
                    >
                      <span
                        class="icon-dots-horizontal"
                        aria-hidden="true"
                      ></span>
                    </button>
                  </td>
                </tr>
                <tr class="table-row">
                  <td class="table-col" data-title="Name">
                    <div class="u-inline-flex u-cross-center u-gap-12">
                      <span class="image">
                        <img
                          class="avatar"
                          width="32"
                          height="32"
                          src="https://unsplash.it/40"
                          alt=""
                        />
                      </span>
                      <span class="text u-break-word u-line-height-1-5"
                        >Mobile illustration - dark.png</span
                      >
                    </div>
                  </td>
                  <td class="table-col is-only-desktop" data-title="Type">
                    <div class="tag"><span class="text">image/jpeg</span></div>
                  </td>
                  <td class="table-col is-only-desktop" data-title="Size">
                    <span class="text">336.6 kB</span>
                  </td>
                  <td class="table-col is-only-desktop" data-title="Created">
                    <time class="text">11 Mar 2022</time>
                  </td>
                  <td class="table-col">
                    <div class="u-flex">
                      <button
                        class="button is-text is-only-icon u-hide"
                        aria-label="refresh"
                      >
                        <span class="icon-refresh" aria-hidden="true"></span>
                      </button>
                      <button
                        class="button is-text is-only-icon u-hide"
                        aria-label="delete item"
                      >
                        <span class="icon-trash" aria-hidden="true"></span>
                      </button>
                      <button
                        class="button is-text is-only-icon"
                        aria-label="more options"
                      >
                        <span
                          class="icon-dots-horizontal"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- recent transactions ends here -->
    </div>
  </section>
</template>
