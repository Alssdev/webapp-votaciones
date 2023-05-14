<template>
  <div>
    <h1 class="title">Editar partido político
      <span class="has-text-primary">ID{{ idpartido }}</span>
    </h1>

    <b-field grouped>
      <b-field label="Nombre" expanded>
        <b-input v-model="partido.nombre" maxlenght="50" placeholder="Nombre del partido" />
      </b-field>
      <b-field label="Acrónimo">
        <b-input v-model="partido.acronimo" maxlenght="5" placeholder="ABC" />
      </b-field>
    </b-field>
    <b-field label="Secretario general">
      <input-ciudadano :idemp="partido.idemp" @select="selectCiudadano" />
    </b-field>

    <hr />
      <b-field>
        <b-upload v-model="logo" drag-drop expanded>
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
      <b-button icon-left="content-save" type="is-primary" @click="confirm">Guardar</b-button>
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
      idemp: null,
    },
    logo: null

    // control data
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idpartido = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.put(`/partidos/${this.idpartido}`, body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El partido ha sido editado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nombre: this.partido.nombre,
        acronimo: this.partido.acronimo,
        logo: this.partido.logo,
        idemp: this.partido.idemp
      };
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
        const response = await this.$axios.$get(`/partidos/${this.idpartido}`);
        this.partido = response.list[0];
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectCiudadano (option) {
      this.partido.idemp = option.idemp;
    }
  }

}
</script>