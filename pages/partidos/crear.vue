<template>
  <div>
    <h1 class="title">Crear un partido político</h1>

    <b-field grouped>
      <b-field label="Nombre" expanded>
        <b-input v-model="nombre" maxlenght="50" placeholder="Nombre del partido" />
      </b-field>
      <b-field label="Acrónimo">
        <b-input v-model="acronimo" maxlenght="5" placeholder="ABC" />
      </b-field>
    </b-field>
    <b-field label="Secretario general">
      <input-ciudadano @select="selectCiudadano" />
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
      <b-button icon-left="check-bold" type="is-primary" @click="confirm">Crear</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nombre: '',
    acronimo: '',
    logo: null,
    idemp: null,
  }),

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.post('/partidos', body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El partido ha sido creado con éxito',
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
        acronimo: this.acronimo,
        logo: '',
        idemp: this.idemp
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

    selectCiudadano (option) {
      this.idemp = option.idemp;
    }
  }

}
</script>