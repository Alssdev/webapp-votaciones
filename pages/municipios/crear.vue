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
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button icon-left="pencil" type="is-primary" @click="confirm">Crear</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nombre: '',
    numh: 0,
    iddep: null
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
        if (this.$isAxiosError(error)) {
          const errorCases = [
            {
              type: 'column',
              column_name: 'iddep',
              message: 'Debe seleccionar un departamento.'
            },
            {
              type: 'constraint',
              constraint_name: 'muni_numh_positive',
              message: 'El número de habitantes no puede ser negativo.'
            },
            {
              type: 'constraint',
              constraint_name: 'muni_no_void_name',
              message: 'El nombre no puede ser vacío.'
            }
          ];

          this.$dataErrorHandler(error, errorCases);
        } else {
          this.$errorHandler(error);
        }
      }
    },
    prepareBodyRequest () {
      return {
        nombre: this.nombre,
        numh: this.numh,
        iddep: this.iddep
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
        this.iddep = option.iddep;
      } else {
        this.iddep = null;
      }
    }
  }
}
</script>