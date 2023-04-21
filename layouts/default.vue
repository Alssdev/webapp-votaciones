<template>
  <div>
    <TheNavbar />
    <div class="tile is-ancestor">
      <div class="tile is-parent is-2">
        <div class="tile is-child">
          <div class="tile">
            <TheSidebar />
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child">
          <div class="tile">
            <div class="section">
              <Nuxt />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>