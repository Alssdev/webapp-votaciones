<template>
  <div class="pt-5">
    <h2 class="title is-4">Presidente y Vicepresidente</h2>

    <b-field label="Presidente">
      <input-ciudadano :idemp="idempP" @select="selectPresidente" />
    </b-field>

    <b-field label="Vicepresidente">
      <input-ciudadano :idemp="idempV" @select="selectVice" />
    </b-field>
    
    <div class="buttons mt-6 is-right">
      <b-button
        type="is-primary"
        icon-left="content-save"
        @click="confirm"
      >
        Guardar
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    idpartido: {
      type: Number,
      default: null
    }
  },

  data: () => ({
    presidente: null,
    vice: null,

    // control data
    idempP: null,
    idempV: null,
  }),

  watch: {
    idpartido (newValue) {
      if (typeof newValue === 'number') {
        this.fetchData();
      } else {
        this.idempP = null;
        this.idempV = null;
      }
    }
  },

  methods: {
    async pushData () {
      try {
        // delete old data
        if (this.idempP !== null) {
          await this.$axios.delete(`/candidatos/${this.idempP}`);
        }
        if (this.idempV !== null) {
          await this.$axios.delete(`/candidatos/${this.idempV}`);
        }

        // register new data
        if (this.presidente !== null) {
          await this.$axios.post('/candidatos', this.preparePresidentBodyRequest());
        }
        if (this.vice !== null) {
          await this.$axios.post('/candidatos', this.prepareViceBodyRequest());
        }
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'Los datos han sido actualizados con éxito',
          duration: 5000
        });
        this.fetchData();
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        presidente: { idemp: this.presidente },
        vicepresidente: { idemp: this.vice }
      };
    },
    preparePresidentBodyRequest () {
      return {
        idemp: this.presidente,
        idpartido: this.idpartido,
        casilla: null,
        tipo: 'P',
        idmunicipio: null,
        iddep: null
      };
    },
    prepareViceBodyRequest () {
      return {
        idemp: this.vice,
        idpartido: this.idpartido,
        casilla: null,
        tipo: 'V',
        idmunicipio: null,
        iddep: null
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
        const response = await this.$axios.$get(`/candidatos/${this.idpartido}/binomio`);

        this.idempP = response.presidente.idemp;
        this.idempV = response.vicepresidente.idemp;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectPresidente (option) {
      this.presidente = option.idemp;
    },
    selectVice (option) {
      this.vice = option.idemp;
    }
  }
}
</script>