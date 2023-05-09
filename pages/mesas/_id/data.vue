<template>
  <div>
    <h1 class="title">Datos de la mesa
      <span class="has-text-primary">ID{{ idmesa }}</span>
    </h1>

    <b-field label="Número de mesa">
      <b-input :value="mesa.nmesa" readonly />
    </b-field>

    <b-field label="Números de empadronamiento" grouped>
      <b-field label="Desde" expanded>
        <b-input :value="mesa.cotasuperior" readonly />
      </b-field>
      <b-field label="Hasta" expanded>
        <b-input :value="mesa.cotainferior" readonly />
      </b-field>
    </b-field>

    <hr />
    <b-field label="Departamento">
      <b-input :value="mesa.est.municipio.depto.nombre" readonly />
    </b-field>

    <b-field label="Municipio">
      <b-input :value="mesa.est.municipio.nombre" readonly />
    </b-field>

    <b-field label="Establecimiento">
      <b-input :value="mesa.est.nombre" readonly />
    </b-field>
    <hr />

    <div class="buttons mt-6">
      <b-button icon-left="arrow-left" @click="$goBack">Regresar</b-button>
      <b-button
        type="is-warning"
        icon-left="pencil"
        @click="$menu(`/mesas/${idmesa}/edit`)"
      >
        Editar
      </b-button>
      <b-button
        type="is-danger"
        icon-left="delete"
        @click="confirmDelete()"
      >
        Eliminar
      </b-button>
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
      est: { municipio: { depto: {} } }
    },
  }),

  created () {
    if (!isNaN(this.$route.params.id)) {
      this.idmesa = this.$route.params.id;
      this.fetchData();
    } 
  },

  methods: {
    async fetchData () {
      try {
        const response = await this.$axios.$get(`/mesas/${this.idmesa}`);
        const mesa = response.list[0];
        const municipio = await this.fetchMunicipio(mesa.est.idmunicipio);

        this.mesa = {
          ...mesa,
          est: {
            ...mesa.est,
            municipio
          }
        }
      } catch (error) {
        console.error(error);
        this.$errorHandler(error);
      }
    },
    async fetchMunicipio (idmunicipio) {
      return (await this.$axios.$get(`/municipios/${idmunicipio}`)).list[0];
    },

    async delete () {
      try {
        await this.$axios.delete(`/mesas/${this.idmesa}`);
        this.$buefy.notification.open({
          type: 'is-success',
          message: 'La mesa ha sido borrada con éxito',
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