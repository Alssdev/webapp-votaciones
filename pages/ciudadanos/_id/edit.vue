<template>
  <div>
    <h1 class="title">Editar al ciudadano
      <span class="has-text-dager">ID{{ idemp }}</span>
    </h1>
  
    <b-field label="DPI">
      <b-input v-model="ciudadano.dpi" type="number" placeholder="0463 90050 5110" maxlenght="15" />
    </b-field>

    <hr />
    <b-field grouped>
      <b-field label="Primer nombre" expanded>
        <b-input v-model="ciudadano.nombre1" maxlength="34" />
      </b-field>
      <b-field label="Segundo nombre" expanded>
        <b-input v-model="ciudadano.nombre2" maxlength="33" />
      </b-field>
      <b-field label="Tercer nombre" expanded>
        <b-input v-model="ciudadano.nombre3" maxlength="33" />
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field label="Primer apellido" expanded>
        <b-input v-model="ciudadano.apellido1" maxlength="50" />
      </b-field>
      <b-field label="Segundo apellido" expanded>
        <b-input v-model="ciudadano.apellido2" maxlength="50" />
      </b-field>
    </b-field>

    <hr />
    <b-field label="Dirección">
      <b-input v-model="ciudadano.direccion" type="textarea" maxlength="250" />
    </b-field>
    <b-field label="Departamento">
      <input-departamento :iddep="iddep" @select="selectDepartamento" />
    </b-field>
    <b-field label="Municipio">
      <input-municipio :idmunicipio="ciudadano.idmunicipio" :iddep="iddep" @select="selectMunicipio" requireDepto />
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
    ciudadano: {
      nombre1: '',
      nombre2: '',
      nombre3: '',
      apellido1: '',
      apellido2: '',
      dpi: '',
      idmunicipio: null,
      direccion: '',
    },

    // control data
    iddep: null,
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
        await this.$axios.put(`/ciudadanos/${this.idemp}`, body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El ciudadano ha sido editado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      const nombres = `${this.ciudadano.nombre1},${this.ciudadano.nombre2},${this.ciudadano.nombre3}`;
      const apellidos = `${this.ciudadano.apellido1},${this.ciudadano.apellido2}`;
      return {
        nombres,
        apellidos,
        dpi: this.ciudadano.dpi,
        idmunicipio: this.ciudadano.idmunicipio,
        direccion: this.ciudadano.direccion
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
        const response = await this.$axios.$get(`/ciudadanos/${this.idemp}`);
        const ciudadano = response.list[0];
        const municipio = await this.fetchMunicipio(ciudadano.idmunicipio);

        // process nombres
        let nombres = ciudadano.nombres.split(',');
        ciudadano.nombre1 = nombres[0];
        ciudadano.nombre2 = nombres[1];
        ciudadano.nombre3 = nombres[2];

        // process apellidos
        let apellidos = ciudadano.apellidos.split(',');
        ciudadano.apellido1 = apellidos[0];
        ciudadano.apellido2 = apellidos[1];

        this.iddep = municipio.depto.iddep;
        this.ciudadano = {
          ...ciudadano,
          municipio
        }
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    async fetchMunicipio (idmunicipio) {
      return (await this.$axios.$get(`/municipios/${idmunicipio}`)).list[0];
    },

    selectDepartamento (option) {
      this.iddep = option.iddep;
    },
    selectMunicipio (option) {
      this.ciudadano.idmunicipio = option.idmunicipio;
    }
  }
}
</script>