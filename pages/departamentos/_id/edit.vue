<template>
  <div>
    <h1 class="title mb-6">Editar el departamento
      <span class="has-text-primary">ID{{ this.iddep }}</span>
    </h1>

    <b-field label="Nombre">
      <b-input v-model="departamento.nombre" placeholder="Ej. Guatemala" maxlength="30" />
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
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.put(`/departamentos/${this.iddep}`, body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El deparamento ha sido editado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nombre: this.departamento.nombre
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
    },

    async fetchData () {
      try {
        const response = await this.$axios.$get(`/departamentos/${this.iddep}`);
        this.departamento = response.list[0];
      } catch (error) {
        this.$errorHandler(error);
      }
    },
  }
}
</script>