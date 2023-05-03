<template>
  <div>
    <h1 class="title mb-6">Crear un departamento</h1>

    <b-field label="Nombre">
      <b-input v-model="nombre" placeholder="Ej. Guatemala" maxlength="30" />
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
  }),

  methods : {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.post('/departamentos', body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El deparamento ha sido creado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nombre: this.nombre
      };
    },
    confirm () {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: this.pushData,
        hasIcon: true,
        type: 'is-success',
      });
    }
  }
}
</script>