<template>
  <div>
    <h1 class="title mb-6">Datos del municipio
      <span class="has-text-primary">ID{{ idmunicipio }}</span>
    </h1>

    <b-field label="Nombre">
      <b-input :value="municipio.nombre" readonly />
    </b-field>
    <b-field label="Número de habitantes">
      <b-input :value="municipio.numh" readonly />
    </b-field>
    <b-field label="Departamento">
      <b-input :value="municipio.dnombre"></b-input>
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/municipios/${idmunicipio}/edit`)"
      >
        Editar
      </b-button>
      <b-button
        type="is-danger"
        icon-left="delete"
        @click="confirmDelete"
      >
        Eliminar
      </b-button>
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
      dnombre: null
    },
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idmunicipio = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/municipios/${this.idmunicipio}`);
        this.municipio = response.list[0];
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete () {
      try {
        await this.$axios.$delete(`/municipios/${this.idmunicipio}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El municipio ha sido borrado con éxito',
          duration: 5000
        });
        this.$goBack();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    confirmDelete () {
      this.$buefy.dialog.confirm({
        title: 'Confirmación',
        message: `Antes de completar el proceso debe 
        confirmar que está seguro ¿Desea continuar?`,
        onConfirm: () => { this.delete() },
        hasIcon: true,
        type: 'is-danger',
      });
    }
  }
}
</script>