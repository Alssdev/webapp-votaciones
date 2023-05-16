<template>
  <div>
    <h1 class="title">Empadronamiento de un ciudadano</h1>
  
    <b-field label="DPI">
      <b-input v-model="dpi" type="number" placeholder="0463 90050 5110" maxlenght="15" />
    </b-field>

    <hr />
    <b-field grouped>
      <b-field label="Primer nombre" expanded>
        <b-input v-model="nombre1" maxlength="34" />
      </b-field>
      <b-field label="Segundo nombre" expanded>
        <b-input v-model="nombre2" maxlength="33" />
      </b-field>
    </b-field>

    <b-field grouped>
      <b-field label="Primer apellido" expanded>
        <b-input v-model="apellido1" maxlength="50" />
      </b-field>
      <b-field label="Segundo apellido" expanded>
        <b-input v-model="apellido2" maxlength="50" />
      </b-field>
    </b-field>

    <hr />
    <b-field label="Dirección">
      <b-input v-model="direccion" type="textarea" maxlength="250" />
    </b-field>
    <b-field label="Departamento">
      <input-departamento @select="selectDepartamento" />
    </b-field>
    <b-field label="Municipio">
      <input-municipio :iddep="iddep" @select="selectMunicipio" requireDepto />
    </b-field>
    <hr />

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button icon-left="pencil" type="is-primary" @click="confirm">Crear</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    nombre1: '',
    nombre2: '',
    nombre3: '',
    apellido1: '',
    apellido2: '',
    dpi: '',
    idmunicipio: null,
    direccion: '',

    // control data
    iddep: null,
  }),

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.post('/ciudadanos', body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'El ciudadano ha sido creado con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      const nombres = `${this.nombre1},${this.nombre2},${this.nombre3}`;
      const apellidos = `${this.apellido1},${this.apellido2}`;
      return {
        nombres,
        apellidos,
        dpi: this.dpi,
        idmunicipio: this.idmunicipio,
        direccion: this.direccion
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

    selectDepartamento (option) {
      this.iddep = option.iddep;
    },
    selectMunicipio (option) {
      this.idmunicipio = option.idmunicipio;
    }
  }
}
</script>