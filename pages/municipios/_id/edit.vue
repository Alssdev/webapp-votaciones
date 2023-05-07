<template>
  <div>
    <h1 class="title mb-6">Editar el municipio
      <span class="has-text-primary">ID{{ idmunicipio }}</span>
    </h1>

    <b-field label="Nombre">
      <b-input v-model="municipio.nombre" placeholder="Ej. Guatemala" maxlength="30" />
    </b-field>
    <b-field label="Número de habitantes">
      <b-input v-model="municipio.numh" type="number" step="1" min="0" placeholder="100000" />
    </b-field>
    <b-field label="Departamento">
      <input-departamento :defaultText="dnombre" @select="selectDepartamento" />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button icon-left="content-save" type="is-primary" @click="confirm">Guardar</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    idmunicipio: null,
    municipio: {
      nombre: '',
      numh: 0,
      iddep: null
    },

    dnombre: null,
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idmunicipio = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.put(`/municipios/${this.idmunicipio}`, body);

        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El municipio ha sido editado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nombre: this.municipio.nombre,
        numh: this.municipio.numh,
        iddep: this.municipio.iddep
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

    async fetchData () {
      try {
        const response = await this.$axios.$get(`/municipios/${this.idmunicipio}`);
        this.municipio = response.list[0];
        this.dnombre = this.municipio.depto.nombre;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectDepartamento (option) {
      if (option.iddep !== null) {
        this.municipio.iddep = option.iddep;
      } else {
        this.municipio.iddep = null;
      }
    }
  }
}
</script>