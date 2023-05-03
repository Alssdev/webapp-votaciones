<template>
  <div>
    <h1 class="title mb-6">Datos del departamento
      <span class="has-text-primary">ID{{ this.id }}</span>
    </h1>

    <b-field label="Nombre">
      <b-input v-model="departamento.nombre" readonly />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button
        type="is-info"
        icon-left="pencil"
        @click="$menu(`/departamentos/${id}`)"
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
    id: null,
    departamento: {
      nombre: '',
    }
  }),

  created () {
    /* if (!isNaN(this.$route.params.id)) {
      this.idest = this.$route.params.id;
      this.fetchData();
    }  */

    if (this.$route.params.id.length > 0) {
      this.id = this.$route.params.id;
      this.fetchData();
    }
  },

  methods : {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/departamentos/${this.id}`);
        this.departamento = response.list[0];
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete () {
      try {
        await this.$axios.$delete(`/departamentos/${this.id}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El deparamento ha sido borrado con éxito',
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