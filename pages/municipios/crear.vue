<template>
  <div>
    <h1 class="title mb-6">Crear un municipio</h1>

    <b-field label="Nombre">
      <b-input v-model="nombre" placeholder="Ej. Guatemala" maxlength="30" />
    </b-field>
    <b-field label="Número de habitantes">
      <b-input v-model="numh" type="number" step="1" min="0" placeholder="100000" />
    </b-field>
    <b-field label="Departamento">
      <input-departamento @select="selectDepartamento" />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left">Regresar</b-button>
      <b-button icon-left="pencil" type="is-primary" @click="confirm">Crear</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nombre: '',
    numh: 0,
    dnombre: null
  }),

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.post('/municipios', body);

        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El municipio ha sido creado con éxito',
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
        numh: this.numh,
        dnombre: this.dnombre
      }
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
      if (option.nombre !== null) {
        this.dnombre = option.nombre;
      } else {
        this.dnombre = null;
      }
    }
  }
}
</script>