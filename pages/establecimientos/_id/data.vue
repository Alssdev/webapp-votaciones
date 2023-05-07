<template>
  <div>
    <h1 class="title">Datos del establecimiento
      <span class="has-text-primary">ID{{ this.idest }}</span>
    </h1>

    <b-field label="Nombre">
      <b-input :value="establecimiento.nombre" readonly />
    </b-field>

    <b-field label="Dirección">
      <b-input :value="establecimiento.direccion" type="textarea" readonly />
    </b-field>

    <b-field label="Departamento">
      <b-input :value="establecimiento.municipio.depto.nombre" readonly />
    </b-field>

    <b-field label="Municipio">
      <b-input :value="establecimiento.municipio.nombre" readonly />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/establecimientos/${idest}/edit`)"
      >
        Editar
      </b-button>
      <b-button
        type="is-danger"
        icon-left="delete"
        @click="confirmDelete()"
      >
        Eliminar
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    idest: null,
    establecimiento: {
      nombre: '',
      direccion: '',
      idmunicipio: null,
      municipio: { depto: {} }
    },
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idest = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods : {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/establecimientos/${this.idest}`);
        this.establecimiento = response.list[0];
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete () {
      try {
        await this.$axios.delete(`/establecimientos/${this.idest}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El establecimiento ha sido borrado con éxito',
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