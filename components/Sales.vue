<template>
  <section style="flex: 1">
    <div>
      <Header />
    </div>
    <div class="container">
        <!-- sales card start here -->
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
                <div class="grid-item-1-end-start">
                  <div class="u-flex u-gap-16 u-flex-wrap">
                    <div class="tag">
                      <span class="icon-duplicate" aria-hidden="true"></span>
                      <span class="text">Interactive</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="card"></div>
          </li>
        </ul>
      </div>
       <!-- sales card ends here -->
    </div>
  </section>
</template>
