<template>
  <div>
    <h1 class="title">Registrar un voluntario de mesa</h1>

    <b-field label="Ciudadano">
      <input-ciudadano @select="selectCiudadano" />
    </b-field>
    <b-field label="Tipo de voluntario">
      <input-tipo-voluntario @select="selectTipo" />
    </b-field>

    <hr />
    <b-field label="Departamento">
      <input-departamento @select="selectDepartamento" />
    </b-field>
    <b-field label="Municipio">
      <input-municipio :iddep="iddep" requireDepto @select="selectMunicipio" />
    </b-field>
    <b-field label="Establecimiento">
      <input-establecimiento :idmunicipio="idmunicipio" requireMuni @select="selectEstablecimiento" />
    </b-field>
    <b-field label="No. mesa">
      <input-mesa :idest="idest" requireEst @select="selectMesa" />
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
    // voluntario data
    idemp: null,
    idmesa: null,
    tipo: null,

    // control data
    iddep: null,
    idmunicipio: null,
    idest: null,
  }),

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.post('/voluntarios', body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El ciudadano ha sido registrado como voluntario con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        idemp: this.idemp,
        idmesa: this.idmesa,
        tipo: this.tipo
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
    },
    selectMesa (option) {
      this.idmesa = option.idmesa;
    },
    selectTipo (option) {
      this.tipo = option.tipo;
    },
    selectCiudadano (option) {
      this.idemp = option.idemp;
    }
  }
}
</script>