<template>
  <div class="pt-5">
    <h2 class="title is-4">Presidente y Vicepresidente</h2>

    <b-field label="Presidente">
      <input-ciudadano @select="selectPresidente" />
    </b-field>

    <b-field label="Vicepresidente">
      <input-ciudadano @select="selectVice" />
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
    vice: null
  }),

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        console.log(body);
        await this.$axios.post('/candidatos/presidencia', body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'Los datos han sido actualizados con éxito',
          duration: 5000
        });
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

    selectPresidente (option) {
      this.presidente = option.idemp;
    },
    selectVice (option) {
      this.vice = option.idemp;
    }
  }
}
</script>