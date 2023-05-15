<template>
  <div>
    <h1 class="title">Resultados de elección de alcalde</h1>

    <b-field label="Departamento">
      <input-departamento @select="selectDeparamento" />
    </b-field>
    <b-field label="Municipio">
      <input-municipio :iddep="iddep" requireDepto @select="selectMunicipio" />
    </b-field>
    <hr />

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
    idmunicipio: null,
    blancos: null,
    nulos: null,
    
    // control data
    iddep: null,
  }),

  watch: {
    idmunicipio (idmunicipio) {
      if (typeof idmunicipio === 'number') {
        this.fetchData();
      } else {
        this.details = [];
      }
    }
  },

  methods: {
    async fetchData () {
      try {
        const api = `/reportes/${this.idmunicipio}/votos_alcalde`;
        const response = await this.$axios.$get(api);
        this.details = response.list;

        this.blancos = response.blancos.conteo;
        this.nulos = response.nulos.conteo;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectDeparamento (option) {
      this.iddep = option.iddep;
    },
    selectMunicipio (option) {
      this.idmunicipio = option.idmunicipio;
    },
  }
}
</script>