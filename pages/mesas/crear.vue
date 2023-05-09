<template>
  <div>
    <h1 class="title">Crear una mesa</h1>

    <b-field label="Número de mesa">
      <b-input v-model="nmesa" type="number" placeholder="Ej. 5" max="10" min="0" />
    </b-field>

    <hr />
    <b-field label="Departamento">
      <input-departamento @select="selectDepartamento" />
    </b-field>

    <b-field label="Municipio">
      <input-municipio :iddep="iddep" @select="selectMunicipio" requireDepto />
    </b-field>

    <b-field label="Establecimiento">
      <input-establecimiento :idmunicipio="idmunicipio" @select="selectEstablecimiento" requireMuni />
    </b-field>
    <hr />

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button icon-left="check-bold" type="is-primary" @click="confirm">Crear</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    // mesa data
    nmesa: null,
    idest: null,

    // control data
    iddep: null,
    idmunicipio: null
  }),

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.post('/mesas', body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'La mesa ha sido creada con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nmesa: this.nmesa,
        idest: this.idest,
        cotasuperior: 1,
        cotainferior: 0,
      };
    },
    confirm () {
      if (this.validateData()) {
        this.$buefy.dialog.confirm({
          title: 'Confirmación',
          message: `Antes de completar el proceso debe 
          confirmar que está seguro ¿Desea continuar?`,
          onConfirm: this.pushData,
          hasIcon: true,
          type: 'is-success',
        });
      }
    },
    validateData () {
      return true;
    },

    selectDepartamento (option) {
      this.iddep = option.iddep;
    },
    selectMunicipio (option) {
      this.idmunicipio = option.idmunicipio;
    },
    selectEstablecimiento (option) {
      this.idest = option.idest;
    }
  }
}
</script>