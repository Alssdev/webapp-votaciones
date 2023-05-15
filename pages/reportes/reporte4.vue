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
          <th class="has-text-centered">Nombre completo</th>
          <th class="has-text-centered" width="210">Votos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(detail, index) in details" :key="index">
          <td>
            <b-image src="https://picsum.photos/600/400" ratio="1by1" />
          </td>
          <td class="has-text-centered is-vcentered">
            
          </td>
          <td class="has-text-centered is-vcentered">
            {{ `${detail.nombres}${detail.apellidos}` }}
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
          <b-input v-model.number="blancos" type="number" />
        </b-field>
        <b-field label="Votos nulos">
          <b-input v-model.number="nulos" type="number" />
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