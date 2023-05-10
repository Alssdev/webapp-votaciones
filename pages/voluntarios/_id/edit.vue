<template>
  <div>
    <h1 class="title">Editar al voluntario de mesa
      <span class="has-text-primary">ID EMP {{ idemp }}</span>
    </h1>

    <b-field label="Ciudadano">
      <input-ciudadano :idemp="voluntario.idemp" readonly />
    </b-field>
    <b-field label="Tipo de voluntario">
      <input-tipo-voluntario :tipo="voluntario.tipo" @select="selectTipo" />
    </b-field>

    <hr />
    <b-field label="Departamento">
      <input-departamento :iddep="iddep" @select="selectDepartamento" />
    </b-field>
    <b-field label="Municipio">
      <input-municipio :idmunicipio="idmunicipio" :iddep="iddep" requireDepto @select="selectMunicipio" />
    </b-field>
    <b-field label="Establecimiento">
      <input-establecimiento :idest="idest" :idmunicipio="idmunicipio" requireMuni @select="selectEstablecimiento" />
    </b-field>
    <b-field label="No. mesa">
      <input-mesa :idmesa="idmesa" :idest="idest" requireEst @select="selectMesa" />
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
    idemp: null,
    // voluntario data
    voluntario: {
      idemp: null,
      idmesa: null,
      tipo: null
    },

    // control data
    iddep: null,
    idmunicipio: null,
    idest: null,
    idmesa: null,
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idemp = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.put(`/voluntarios/${this.idemp}`, body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El voluntario ha sido editado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        idmesa: this.voluntario.idmesa,
        tipo: this.voluntario.tipo
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
        const response = await this.$axios.$get(`/voluntarios/${this.idemp}`);
        this.voluntario = response.list[0];

        this.iddep = this.voluntario.mesa.est.municipio.iddep;
        this.idmunicipio = this.voluntario.mesa.est.idmunicipio;
        this.idest = this.voluntario.mesa.idest;
        this.idmesa = this.voluntario.idmesa;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectDepartamento (option) {
      this.iddep = option.iddep;
    },
    selectMunicipio (option) {
      this.idmunicipio = option.idmunicipio;
    },
    selectEstablecimiento (option) {
      this.idest = option.idest;
    },
    selectMesa (option) {
      this.voluntario.idmesa = option.idmesa;
    },
    selectTipo (option) {
      this.voluntario.tipo = option.tipo;
    }
  }
}
</script>