<template>
  <div>
    <h1 class="title">Registro de votos para 
      <span class="has-text-primary">{{ nombreTipo }}</span>
    </h1>

    <b-steps animated>
      <b-step-item :step="1" label="Mesa">
        <h2 class="title has-text-centered">Mesa</h2>
        <p>Escoge la mesa donde tuvieron lugar los votos.</p>

        <div class="mt-6 mb-6">
          <b-field label="Departamento">
            <input-departamento @select="selectDep" />
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

      <b-step-item :step="2" label="Votos">
        <h2 class="title has-text-centered">Formulario de votos</h2>

        <registro-votos :idmesa="idmesa" :tipo="tipo" />
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
    idmesa: null,
    tipo: null,
    idmesa: null,

    // control data
    activeStep: 0,
    iddep: null,
    idmunicipio: null,
    idest: null,
  }),

  computed: {
    nombreTipo () {
      switch (this.tipo) {
        case 'P':
          return 'Presidencia';
        case 'A':
          return 'Alcaldía';
        case 'D':
          return 'Diputados de distrito';
        case 'N':
          return 'Listado nacional';
      }
    }
  },

  created () {
    if (typeof this.$route.query.tipo === 'string') {
      this.tipo = this.$route.query.tipo;
    }
  },

  watch: {
    '$route.query.tipo': function () {
      this.tipo = this.$route.query.tipo;
    }
  },

  methods: {
    selectDep (option) {
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
    }
  }
}
</script>