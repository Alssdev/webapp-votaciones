<template>
  <div>
    <h1 class="title">Resultados de representates del listado nacional</h1>

    <table class="table is-fullwidth is-hoverable is-bordered is-striped">
      <thead>
        <tr>
          <th class="has-text-centered">Logo</th>
          <th class="has-text-centered">Partido</th>
          <th class="has-text-centered">Acrónimo</th>
          <th class="has-text-centered" width="210">Nombre completo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detail, index) in details" :key="index">
          <td>
            <b-image :src="`http://localhost:4000/logos/${detail.logo}`" ratio="1by1" />
          </td>
          <td class="has-text-centered is-vcentered">
            <nuxt-link :to="{ path: `/partidos/${detail.idpartido}/data` }">
              {{ detail.nombre }}
            </nuxt-link>
          </td>
          <td class="has-text-centered is-vcentered">
            <nuxt-link :to="{ path: `/partidos/${detail.idpartido}/data` }">
              {{ detail.acronimo }}
            </nuxt-link>
          </td>
          <td class="has-text-centered is-vcentered">
            <nuxt-link :to="{ path: `/ciudadanos/${detail.idemp}/data` }">
              {{ `${detail.nombres}${detail.apellidos}` }}
            </nuxt-link>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    details: [],
    blancos: 0,
    nulos: 0,
    iddep: null
  }),

  created () {
    this.fetchData();
  },

  methods: {
    async fetchData () {
      try {
        const api = `/reportes/minorias_diputado_nacional`;
        const response = await this.$axios.$get(api);
        this.details = response.list;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectDeparamento (option) {
      this.iddep = option.iddep;
    }
  }
}
</script>