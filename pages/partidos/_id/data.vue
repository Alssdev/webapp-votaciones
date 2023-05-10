<template>
  <div>
    <h1 class="title">Datos del partido político
      <span class="has-text-primary">ID{{ idpartido }}</span>
    </h1>

    <b-field grouped>
      <b-field label="Nombre" expanded>
        <b-input :value="partido.nombre" readonly />
      </b-field>
      <b-field label="Acrónimo">
        <b-input :value="partido.acronimo" readonly />
      </b-field>
    </b-field>
    <b-field label="Secretario general">
      <input-ciudadano :idemp="partido.idemp" readonly />
    </b-field>

    <hr />
      <b-field>
        <b-upload disabled v-model="logo" drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Suelte la imágen de logo aquí.</p>
            </div>
          </section>
        </b-upload>
      </b-field>
    <hr />

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button
        icon-left="pencil"
        type="is-warning"
        @click="$menu(`/partidos/${idpartido}/edit`)"
      >
        Editar
      </b-button>
      <b-button icon-left="delete" type="is-danger" @click="confirmDelete">Eliminar</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    idpartido: null,
    partido: {
      nombre: '',
      acronimo: '',
      logo: '',
      idemp: null,
    },

    // control data
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idpartido = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/partidos/${this.idpartido}`);
        this.partido = response.list[0];
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    async delete () {
      try {
        await this.$axios.delete(`/partidos/${this.idpartido}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El partido ha sido borrado con éxito',
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