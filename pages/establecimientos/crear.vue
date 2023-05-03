<template>
  <div>
    <h1 class="title">Crear un establecimiento</h1>

    <b-field label="Nombre">
      <b-input placeholder="Nombre del establecimiento" maxlength="50" />
    </b-field>

    <b-field label="Dirección">
      <b-input placeholder="Ciudad" type="textarea" maxlength="200" />
    </b-field>

    <b-field label="Municipio">
      <input-municipio @select="selectMunicipio" />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button icon-left="check-bold" type="is-primary" @click="confirm">Crear</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nombre: '',
    direccion: '',
    idmunicipio: null
  }),

  methods : {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.post('/establecimientos', body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El establecimiento ha sido creado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nombre: this.nombre,
        direccion: this.direccion,
        idmunicipio: this.idmunicipio
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

    selectMunicipio (option) {
      if (option.idmunicipio !== null) {
        this.idmunicipio = option.idmunicipio;
      } else {
        this.idmunicipio = null;
      }
    }
  }
}
</script>