<template>
  <div>
    <h1 class="title">Resultados por mesa</h1>

    <b-steps animated>
      <b-step-item :step="1" label="Mesa">
        <h2 class="title has-text-centered">Escoge una mesa</h2>

        <div class="mt-6 mb-6">
          <b-field label="Departamento">
            <input-departamento @select="selectDeparamento" />
          </b-field>
          <b-field label="Municipio">
            <input-municipio :iddep="iddep" requireDepto @select="selectMunicipio" />
          </b-field>
          <b-field label="Establecimiento">
            <input-establecimiento :idmunicipio="idmunicipio" requireMuni @select="selectEst" />
          </b-field>
          <b-field label="Mesa">
            <input-mesa :idest="idest" requireEst @select="selectMesa" />
          </b-field>
        </div>
      </b-step-item>

      <b-step-item :step="2" label="Tipo de votación">
        <h2 class="title has-text-centered">Escoge un tipo de votación</h2>

        <div class="mt-6 mb-6">
          <b-field label="Tipo">
            <input-tipo-candidato @select="selectTipo" />
          </b-field>
        </div>
      </b-step-item>

      <b-step-item :step="3" label="Resultados">
        <h2 class="title has-text-centered">Resultados de la votación</h2>

        <table class="table is-fullwidth is-hoverable is-bordered is-striped">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nombre</th>
              <th>Acrónimo</th>
              <th width="210">Votos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, index) in details" :key="index">
              <td>
                <b-image :src="`http://localhost:4000/logos/${detail.logo}`" ratio="1by1" />
              </td>
              <td class="has-text-centered is-vcentered">
                {{ detail.nombre }}
              </td>
              <td class="has-text-centered is-vcentered">
                {{ detail.acronimo }}
              </td>
              <td class="has-text-centered is-vcentered">
                {{ detail.cantidad }}
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

      </b-step-item>

      <template
        #navigation="{previous, next}">
        <b-button
          icon-left="arrow-left"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
          >
            Regresar
        </b-button>
        <b-button
          type="is-success"
          icon-right="arrow-right"
          :disabled="next.disabled"
          @click.prevent="next.action"
          >
            Continuar
        </b-button>
      </template>
    </b-steps>
  </div>
</template>

<script>
export default {
  data: () => ({
    details: [],
    idmesa: null,
    tipo: null,
    blancos: 0,
    nulos: 0,

    // control data
    iddep: null,
    idmunicipio: null,
    idest: null
  }),

  watch: {
    idmesa (idmesa) {
      if (typeof idmesa === 'number' && typeof this.tipo === 'string') {
        this.fetchData();
      } else {
        this.rows = [];
      }
    },
    tipo (tipo) {
      if (typeof this.idmesa === 'number' && typeof tipo === 'string') {
        this.fetchData();
      } else {
        this.rows = [];
      }
    }
  },

  methods: {
    async fetchData () {
      try {
        const api = `reportes/${this.idmesa}/${this.tipo}/mesa_tipo`;
        const response = await this.$axios.$get(api);

        this.details = response.list;
        this.blancos = response.blancos;
        this.nulos = response.nulos;
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
    selectEst (option) {
      this.idest = option.idest;
    },
    selectMesa (option) {
      this.idmesa = option.idmesa;
    },
    selectTipo (option) {
      this.tipo = option.tipo;
    }
  }
}
</script>