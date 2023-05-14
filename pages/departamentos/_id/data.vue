<template>
  <div>
    <h1 class="title mb-6">Datos del departamento
      <span class="has-text-primary">ID{{ this.iddep }}</span>
    </h1>

    <b-field label="Nombre">
      <b-input v-model="departamento.nombre" readonly />
    </b-field>

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/departamentos/${iddep}/edit`)"
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
    iddep: null,
    departamento: {
      nombre: '',
    }
  }),

  created () {
    if (this.$route.params.id.length > 0) {
      this.iddep = this.$route.params.id;
      this.fetchData();
    }
  },

  methods : {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/departamentos/${this.iddep}`);
        this.departamento = response.list[0];
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete () {
      try {
        await this.$axios.$delete(`/departamentos/${this.iddep}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El deparamento ha sido borrado con éxito',
          duration: 5000
        });
        this.$goBack();
      } catch (error) {
        if (this.$isAxiosError(error)) {
          const errorCases = [
            {
              constraint_name: 'municipios_iddep_fkey',
              message: 'Este departamento tiene municipios asociados.'
            }
          ];

          this.$dataErrorHandler(error.response.data, errorCases);
        } else {
          this.$errorHandler(error);
        }
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