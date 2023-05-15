<template>
  <div>
    <h1 class="title">Resultados de elección de presidente</h1>

    <table class="table is-fullwidth is-hoverable is-bordered is-striped">
      <thead>
        <tr>
          <th class="has-text-centered">Logo</th>
          <th class="has-text-centered">Partido</th>
          <th class="has-text-centered">Acrónimo</th>
          <th class="has-text-centered">Nombre completo</th>
          <th class="has-text-centered" width="210">Votos</th>
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
            {{ detail.acronimo }}
          </td>
          <td class="has-text-centered is-vcentered">
            <nuxt-link :to="{ path: `/ciudadanos/${detail.idemp}/data` }">
              {{ `${detail.nombres}${detail.apellidos}` }}
            </nuxt-link>
          </td>
          <td class="has-text-centered is-vcentered">
            {{ detail.conteo }}
          </td>
        </tr>
      </tbody>
    </table>

    <hr />
    <div class="columns">
      <div class="column">
        <b-field label="Votos en blanco">
          <b-input :value="blancos" type="number" readonly />
        </b-field>
        <b-field label="Votos nulos">
          <b-input :value="nulos" type="number" readonly />
        </b-field>
      </div>
      <div class="column"></div>
    </div>
    <hr />

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
    nulos: 0
  }),

  created () {
    this.fetchData();
  },

  methods: {
    async fetchData () {
      try {
        const api = `/reportes/votos_presidente`;
        const response = await this.$axios.$get(api);
        this.details = response.list;
        this.blancos = response.blancos.sum;
        this.nulos = response.nulos.sum;
      } catch (error) {
        this.$errorHandler(error);
      }
    }
  }
}
</script>