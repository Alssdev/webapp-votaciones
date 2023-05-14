<template>
  <div>
    <h1 class="title">Editar mesa
      <span class="has-text-primary">ID{{ idmesa }}</span>
    </h1>

    <b-field label="Número de mesa">
      <b-input v-model="mesa.nmesa" type="number" placeholder="Ej. 5" max="10" min="0" />
    </b-field>

    <b-field label="Números de empadronamiento" grouped>
      <b-field label="Desde" expanded>
        <b-input v-model.number="mesa.cotainferior" type="number" min="0" />
      </b-field>
      <b-field label="Hasta" expanded>
        <b-input v-model.number="mesa.cotasuperior" type="number" min="0" />
      </b-field>
    </b-field>

    <hr />
    <b-field label="Departamento">
      <input-departamento :iddep="iddep" @select="selectDepartamento" />
    </b-field>

    <b-field label="Municipio">
      <input-municipio
        :idmunicipio="idmunicipio"
        :iddep="iddep"
        @select="selectMunicipio"
        requireDepto
      />
    </b-field>

    <b-field label="Establecimiento">
      <input-establecimiento
        :idest="mesa.idest"
        :idmunicipio="idmunicipio"
        @select="selectEstablecimiento"
        requireMuni
      />
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
    idmesa: null,
    mesa: {
      nmesa: null,
      idest: null,
      cotainferior: 0,
      cotasuperior: 0
    },

    // control data
    iddep: null,
    idmunicipio: null
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idmesa = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async pushData () {
      try {
        const body = this.prepareBodyRequest();
        await this.$axios.put(`/mesas/${this.idmesa}`, body);
        
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'La mesa ha sido editada con éxito',
          duration: 5000
        });
        this.$router.go(-1);
      } catch (error) {
        this.$errorHandler(error);
      }
    },
    prepareBodyRequest () {
      return {
        nmesa: this.mesa.nmesa,
        idest: this.mesa.idest,
        cotasuperior: this.mesa.cotasuperior,
        cotainferior: this.mesa.cotainferior,
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
        const response = await this.$axios.$get(`/mesas/${this.idmesa}`);
        const mesa = response.list[0];
        const municipio = await this.fetchMunicipio(mesa.est.idmunicipio);

        this.mesa = {
          nmesa: mesa.nmesa,
          idest: null,
          cotainferior: mesa.cotainferior,
          cotasuperior: mesa.cotasuperior
        }

        this.iddep = municipio.depto.iddep;
        this.idmunicipio = municipio.idmunicipio;
        this.mesa.idest = mesa.est.idest;
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
      console.log(option);
      this.idmunicipio = option.idmunicipio;
    },
    selectEstablecimiento (option) {
      this.mesa.idest = option.idest;
    }
  }
}
</script>