<template>
  <div>
    <h1 class="title">Editar el establecimiento
      <span class="has-text-primary">ID{{ this.idest }}</span>
    </h1>

    <b-field label="Nombre">
      <b-input v-model="establecimiento.nombre" placeholder="Nombre del establecimiento" maxlength="50" />
    </b-field>

    <b-field label="Dirección">
      <b-input v-model="establecimiento.direccion" placeholder="Ciudad" type="textarea" maxlength="200" />
    </b-field>

    <b-field label="Departamento">
      <input-departamento :iddep="iddep" @select="selectDepartamento" />
    </b-field>

    <b-field label="Municipio">
      <input-municipio :defaultText="nombreMuni" :iddep="iddep" @select="selectMunicipio" requireDepto />
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
    idest: null,
    establecimiento: {
      nombre: '',
      direccion: '',
      idmunicipio: null
    },
    nombreMuni: '',
    nombreDepto: '',
    iddep: null,
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idest = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods : {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.put(`/establecimientos/${this.idest}`, body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El establecimiento ha sido editado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nombre: this.establecimiento.nombre,
        direccion: this.establecimiento.direccion,
        idmunicipio: this.establecimiento.idmunicipio
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
        const response = await this.$axios.$get(`/establecimientos/${this.idest}`);
        this.establecimiento = response.list[0];

        this.nombreMuni = this.establecimiento.municipio.nombre;
        this.nombreDepto = this.establecimiento.municipio.depto.nombre;
        this.iddep = this.establecimiento.municipio.depto.iddep;
      } catch (error) {
        this.$errorHandler(error);
      }
    },

    selectMunicipio (option) {
      if (option.idmunicipio !== null) {
        this.establecimiento.idmunicipio = option.idmunicipio;
      } else {
        this.establecimiento.idmunicipio = null;
      }
    },
    selectDepartamento (option) {
      if (option.iddep !== null) {
        this.iddep = option.iddep;
      } else {
        this.iddep = null;
      }
    }
  }
}
</script>